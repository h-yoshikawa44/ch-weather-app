import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPError } from 'ky-universal';
import {
  getCurrentWeatherToOuter,
  CurrentWeatherQuery,
  isCurrentWeatherQuery,
} from '@/server/weather';

/**
 * 現在の天気情報取得 API
 *
 * クエリパラメータ（lat と lon は必須）
 * - lat: number - 緯度
 * - lon: number - 経度
 * - units: "standard" | "metric" | "imperial" - 測定単位
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
      if (!isCurrentWeatherQuery(queryParams)) {
        res.status(403).send('Invalid query parameter.');
      }

      await getCurrentWeatherToOuter({
        searchParams: queryParams as CurrentWeatherQuery,
      })
        .then((data) => {
          res.status(200).json(data);
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
