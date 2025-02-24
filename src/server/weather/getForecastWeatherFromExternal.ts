import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isForecastWeatherListExternal } from './WeatherExternal';

const units = ['standard', 'metric', 'imperial'] as const;

export type ForecastWeatherQuery = {
  /** 緯度 （値は number であるが、クエリなので string） */
  lat: string;
  /** 経度 （値は number であるが、クエリなので string）*/
  lon: string;
  /** 測定単位 デフォルトは standard */
  units?: (typeof units)[number];
};

export const isForecastWeatherQuery = (
  query: unknown,
): query is ForecastWeatherQuery => {
  const q = query as ForecastWeatherQuery;

  return (
    typeof q.lat === 'string' &&
    typeof q.lon === 'string' &&
    (typeof q.units === 'undefined' || units.includes(q.units))
  );
};

export const getForecastWeatherFromExternal = async (
  options: Options & { searchParams: ForecastWeatherQuery },
) => {
  const response = await getExtendKy('outer', options).get('data/2.5/forecast');
  const locations = (await response.json()) as unknown[];

  if (!isForecastWeatherListExternal(locations)) {
    throw Error('API type error');
  }

  return locations;
};
