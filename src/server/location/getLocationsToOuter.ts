import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isLocationsResponse } from './Location';

export type LocationsQuery = {
  /**
   * 都市名、州コード (米国のみ)、および国コードをカンマで区切ったもの。 ISO 3166 国コード
   * - {city name}
   * - {city name},{state code},{country code}
   */
  q: string;
  /**
   * 取得する都市の数（最大5つ）
   * （値は number であるが、クエリなので string）
   *
   * 外部 API としては任意パラメータであるが、指定を強制したいので必須にしている
   */
  limit: string;
};

export const isLocationsQuery = (query: unknown): query is LocationsQuery => {
  const q = query as LocationsQuery;
  const qRegex = new RegExp(/^[a-zA-Z]+$/);

  return (
    typeof q.q === 'string' && qRegex.test(q.q) && typeof q.limit === 'string'
  );
};

export const getLocationsToOuter = async (
  options: Options & { searchParams: LocationsQuery },
) => {
  const response = await getExtendKy('outer', options).get('geo/1.0/direct');
  const locations = (await response.json()) as unknown[];

  if (!isLocationsResponse(locations)) {
    throw Error('API type error');
  }

  return locations;
};
