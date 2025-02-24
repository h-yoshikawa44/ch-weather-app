import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isForecastWeather } from '@/models/Weather';

type Units = Array<'standard' | 'metric' | 'imperial'>;

export type ForecastWeatherQuery = {
  /** 緯度 */
  lat: number;
  /** 経度 */
  lon: number;
  /** 測定単位 デフォルトは standard */
  units?: Units[number];
};

export const getForecastWeather = async (
  options: Options & { searchParams: ForecastWeatherQuery },
) => {
  const response = await getExtendKy('inner', options).get('weather/forecast');
  const forecastWeather = (await response.json()) as unknown[];

  if (!isForecastWeather(forecastWeather)) {
    throw Error('API type error');
  }

  return forecastWeather;
};
