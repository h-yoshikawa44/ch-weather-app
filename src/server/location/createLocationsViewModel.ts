import { Locations } from '@/models/Location';
import { LocationsExternal } from './LocationExternal';

export const createLocationsViewModel = (
  locations: LocationsExternal,
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
