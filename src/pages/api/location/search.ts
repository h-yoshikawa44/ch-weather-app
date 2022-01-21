// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPError } from 'ky-universal';
import getLocations, {
  QueryParams,
  isQueryParams,
} from '@/domains/getLocations';

/**
 * ロケーション検索 API
 * クエリパラメータ（どちらかは必須）
 * - query: string - 検索ワード
 * - lattlong: string（書式：小数,小数）- 緯度経度
 * @param {NextApiRequest} req リクエストミドルウェア
 * @param {NextApiResponse} res レスポンスヘルパー
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // 不正なクエリパラメータの時は403を返す
      const queryParams = req.query as unknown;
      if (!isQueryParams(queryParams)) {
        res.status(403).end();
      }

      getLocations('outer', {
        searchParams: queryParams as QueryParams,
      })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          if (err instanceof HTTPError) {
            res.status(err.response.status).send(err.response.statusText);
          } else if (err instanceof Error) {
            res.status(409).send(err.message);
          }
        });
      break;
    default:
      res.status(405).end();
  }
}
