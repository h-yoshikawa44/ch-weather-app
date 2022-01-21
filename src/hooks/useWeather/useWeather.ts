import { HTTPError } from 'ky-universal';
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { Weather } from '@/models/Weather';
import getWeather from '@/domains/getWeather';

const useWeather = (
  woeId?: number,
  queryOption?: Omit<
    UseQueryOptions<Weather, HTTPError, Weather, (string | number)[]>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<Weather, HTTPError> => {
  // woeId がない時は、東京の ID で取得をデフォルトとする
  return useQuery(
    ['weather', woeId ?? 1118370],
    () => getWeather('inner', woeId ?? 1118370),
    queryOption
  );
};

export default useWeather;
