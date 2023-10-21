// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPError } from 'ky-universal';
import getWeather, { PathParams } from '@/domains/getWeather';

/**
 * 天気予報取得 API
 * パスパラメータ
 * - woeid: number - Where On Earth ID
 * @param {NextApiRequest} req リクエストミドルウェア
 * @param {NextApiResponse} res レスポンスヘルパー
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      const pathParams = req.query as unknown;

      getWeather('outer', (pathParams as PathParams).woeId)
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
