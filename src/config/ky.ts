import { Options } from 'ky-universal';

export type ApiType = 'inner' | 'outer';

const prefixUrls = {
  inner: 'api',
  outer: 'https://www.metaweather.com/api',
};

export const getDefaultApiOptions = (apiType: ApiType) => {
  return {
    prefixUrl: prefixUrls[apiType],
    retry: 0,
  } as Options;
};
