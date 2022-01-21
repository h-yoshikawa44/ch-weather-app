// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
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
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const pathParams = req.query as unknown;

      const response = await getWeather(
        'outer',
        (pathParams as PathParams).woeId
      );
      res.status(200).json(response);
      break;
    default:
      res.status(405).end();
  }
}
