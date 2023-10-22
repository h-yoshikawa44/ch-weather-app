import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isLocations } from '@/models/Location';

export type LocationsQuery = {
  /**
   * 都市名、州コード (米国のみ)、および国コードをカンマで区切ったもの。 ISO 3166 国コード
   * - {city name}
   * - {city name},{state code},{country code}
   */
  q: string;
  /**
   * 取得する都市の数（最大5つ）
   *
   * 外部 API としては任意パラメータであるが、指定を強制したいので必須にしている
   */
  limit: number;
};

const getLocations = async (
  options?: Options & { searchParams?: LocationsQuery },
) => {
  const response = await getExtendKy('inner', options).get('location/search');
  const locations = (await response.json()) as unknown[];

  if (!isLocations(locations)) {
    throw Error('API type error');
  }

  return locations;
};

export default getLocations;
