import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isCurrentWeatherExternal } from './WeatherExternal';

const units = ['standard', 'metric', 'imperial'] as const;

export type CurrentWeatherQuery = {
  /** 緯度 （値は number であるが、クエリなので string） */
  lat: string;
  /** 経度 （値は number であるが、クエリなので string）*/
  lon: string;
  /** 測定単位 デフォルトは standard */
  units?: (typeof units)[number];
};

export const isCurrentWeatherQuery = (
  query: unknown,
): query is CurrentWeatherQuery => {
  const q = query as CurrentWeatherQuery;

  return (
    typeof q.lat === 'string' &&
    typeof q.lon === 'string' &&
    (typeof q.units === 'undefined' || units.includes(q.units))
  );
};

export const getCurrentWeatherFromExternal = async (
  options: Options & { searchParams: CurrentWeatherQuery },
) => {
  const response = await getExtendKy('outer', options).get('data/2.5/weather');
  const locations = (await response.json()) as unknown[];

  if (!isCurrentWeatherExternal(locations)) {
    throw Error('API type error');
  }

  return locations;
};
