const locationTypes = [
  'City',
  'Region / State / Province',
  'Country',
  'Continent',
] as const;

export type LocationType = typeof locationTypes[number];

export type Location = {
  title: string;
  location_type: LocationType;
  latt_long: string;
  woeid: number;
  distance?: number;
};

export type Locations = Location[];

const isLocation = (arg: unknown): arg is Location => {
  const l = arg as Location;

  return (
    typeof l.title === 'string' &&
    locationTypes.includes(l.location_type) &&
    typeof l.latt_long === 'string' &&
    typeof l.woeid === 'number' &&
    (typeof l.distance === 'undefined' || typeof l.distance === 'number')
  );
};

const isLocations = (args: unknown): args is Locations => {
  const ls = args as Locations;

  return ls.every((l) => isLocation(l));
};

export { isLocation, isLocations };
