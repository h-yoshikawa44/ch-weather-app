import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPError } from 'ky-universal';
import {
  getLocationsFromExternal,
  LocationsQuery,
  isLocationsQuery,
  createLocationsViewModel,
} from '@/server/location';

/**
 * ロケーション検索 API
 *
 * クエリパラメータ（q は必須）
 * - q: string - 都市名、州コード (米国のみ)、および国コードをカンマで区切ったもの。 ISO 3166 国コード
 * - limit: number - 取得する都市の数（最大5つ）
 * @param {NextApiRequest} req リクエストミドルウェア
 * @param {NextApiResponse} res レスポンスヘルパー
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      // 不正なクエリパラメータの時は403を返す
      const queryParams = req.query as unknown;
      if (!isLocationsQuery(queryParams)) {
        res.status(403).send('Invalid query parameter.');
      }

      await getLocationsFromExternal({
        searchParams: queryParams as LocationsQuery,
      })
        .then((data) => {
          res.status(200).json(createLocationsViewModel(data));
        })
        .catch((err) => {
          if (err instanceof HTTPError) {
            res.status(err.response.status).send(err.response.statusText);
          } else if (err instanceof Error) {
            res.status(500).send(err.message);
          }
        });
      break;
    default:
      res.status(405).end();
  }
}
