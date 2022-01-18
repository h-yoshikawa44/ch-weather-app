import ky, { Options } from 'ky-universal';
import { DEFAULT_API_OPTIONS } from '@/config/ky';
import { isWeather } from '@/models/Weather';

export type PathParams = {
  woeId: number;
};

const getWeather = async (woeId: number, options?: Options) => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.get(`location/${woeId}`, mergedOptions);
  const weather = (await response.json()) as unknown[];

  if (!isWeather(weather)) {
    throw Error('API type error');
  }

  return weather;
};

export default getWeather;
