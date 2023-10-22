import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { isCurrentWeather } from '@/models/Weather';

const units = ['standard', 'metric', 'imperial'] as const;

export type CurrentWeatherQuery = {
  /** 緯度 */
  lat: number;
  /** 経度 */
  lon: number;
  /** 測定単位 デフォルトは standard */
  units?: (typeof units)[number];
};

export const getCurrentWeather = async (
  options: Options & { searchParams: CurrentWeatherQuery },
) => {
  const response = await getExtendKy('inner', options).get('weather');
  const currentWeather = (await response.json()) as unknown[];

  if (!isCurrentWeather(currentWeather)) {
    throw Error('API type error');
  }

  return currentWeather;
};
