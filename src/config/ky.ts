import { Options } from 'ky-universal';

export const DEFAULT_API_OPTIONS: Options = {
  prefixUrl: 'https://www.metaweather.com/api',
  retry: 0,
};
