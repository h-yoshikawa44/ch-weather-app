import ky, { Options } from 'ky-universal';
import { ApiType, getDefaultApiOptions } from '@/config/ky';
import { isLocations } from '@/models/Location';

export type QueryParams = {
  query?: string;
  lattlong?: string;
};

const isQueryParams = (params: unknown): params is QueryParams => {
  const q = params as QueryParams;
  let isLattlongFormat: boolean;

  // lattlong がある場合、「小数,小数」の形式であるか確認
  if (q.lattlong) {
    const ll = q.lattlong.split(',');
    isLattlongFormat = ll.every((l) => !isNaN(parseFloat(l)));
  } else {
    isLattlongFormat = true;
  }

  // query と lattlong いずれかのみあること
  return (
    (typeof q.query === 'string' && typeof q.lattlong === 'undefined') ||
    (typeof q.query === 'undefined' &&
      typeof q.lattlong === 'string' &&
      isLattlongFormat)
  );
};

const getLocations = async (
  apiType: ApiType,
  options?: Options & { searchParams?: QueryParams }
) => {
  const mergedOptions = {
    ...getDefaultApiOptions(apiType),
    ...options,
  };
  const response = await ky.get('location/search', mergedOptions);
  const locations = (await response.json()) as unknown[];

  if (!isLocations(locations)) {
    throw Error('API type error');
  }

  return locations;
};

export default getLocations;
export { isQueryParams };
