import { Locations } from '@/models/Location';
import { LocationsResponse } from './Location';

export const createLocationsViewModel = (
  locations: LocationsResponse,
): Locations => {
  return locations.map((location) => {
    return {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
    };
  });
};
