export type Location = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export type Locations = Location[];

export const isLocation = (arg: unknown): arg is Location => {
  const l = arg as Location;

  return (
    typeof l.name === 'string' &&
    typeof l.lat === 'number' &&
    typeof l.lon === 'number' &&
    typeof l.country === 'string'
  );
};

export const isLocations = (args: unknown): args is Locations => {
  const ls = args as Locations;

  return ls.every((l) => isLocation(l));
};
