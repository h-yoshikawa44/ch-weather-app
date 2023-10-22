import { Options } from 'ky-universal';
import { getExtendKy } from '@/config/ky';
import { QueryParams } from '@/server/location';
import { isLocations } from '@/models/Location';

const getLocations = async (
  options?: Options & { searchParams?: QueryParams },
) => {
  const response = await getExtendKy('inner', options).get('location/search');
  const locations = (await response.json()) as unknown[];

  if (!isLocations(locations)) {
    throw Error('API type error');
  }

  return locations;
};

export default getLocations;
