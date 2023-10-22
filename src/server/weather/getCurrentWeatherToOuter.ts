import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isCurrentWeatherResponse } from './Weather';

const units = ['standard', 'metric', 'imperial'] as const;

export type QueryParams = {
  /** 緯度 （値は number であるが、クエリなので string） */
  lat: string;
  /** 経度 （値は number であるが、クエリなので string）*/
  lon: string;
  /** 測定単位 デフォルトは standard */
  units?: (typeof units)[number];
};

export const isQueryParams = (query: unknown): query is QueryParams => {
  const q = query as QueryParams;

  return (
    typeof q.lat === 'string' &&
    typeof q.lon === 'string' &&
    (typeof q.units === 'undefined' || units.includes(q.units))
  );
};

export const getCurrentWeatherToOuter = async (
  options: Options & { searchParams: QueryParams },
) => {
  const response = await getExtendKy('outer', options).get('data/2.5/weather');
  const locations = (await response.json()) as unknown[];

  if (!isCurrentWeatherResponse(locations)) {
    throw Error('API type error');
  }

  return locations;
};
