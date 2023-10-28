import ky, { Options } from 'ky-universal';

export type ApiType = 'inner' | 'outer';

const prefixUrls: { [key in ApiType]: string } = {
  inner: 'api',
  outer: 'https://api.openweathermap.org',
};

const api = ky.create({
  retry: 0,
  searchParams: {
    appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY ?? '',
  },
});

export const getExtendKy = (apiType: ApiType, options?: Options) => {
  return api.extend({
    prefixUrl: prefixUrls[apiType],
    ...options,
  });
};
