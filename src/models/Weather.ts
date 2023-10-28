import { Dayjs } from 'dayjs';

const weatherNames = [
  'Snow',
  'Sleet',
  'Hail',
  'Thunderstorm',
  'Heavy Rain',
  'Light Rain',
  'Showers',
  'Heavy Cloud',
  'Light Cloud',
  'Clear',
] as const;
export type WeatherName = (typeof weatherNames)[number];

const weatherCodes = [
  'sn',
  'sl',
  'h',
  't',
  'hr',
  'lr',
  's',
  'hc',
  'lc',
  'c',
] as const;
export type WeatherCode = (typeof weatherCodes)[number];

export type TemperatureType = 'celsius' | 'fahrenheit';

const windDirectionCompasses = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;
export type WindDirectionCompass = (typeof windDirectionCompasses)[number];

export type ConsolidatedWeather = {
  id: number;
  applicable_date: string;
  weather_state_name: WeatherName;
  weather_state_abbr: WeatherCode;
  wind_speed: number;
  wind_direction: number;
  wind_direction_compass: WindDirectionCompass;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
};

export type Source = {
  title: string;
  url: string;
};

export type Weather = {
  title: string;
  location_type: LocationType;
  latt_long: string;
  time: string;
  sun_rise?: string;
  sun_set?: string;
  timezone_name: string;
  parent: {
    title: string;
    location_type: LocationType;
    latt_long: string;
    woeid: number;
  };
  consolidated_weather: ConsolidatedWeather[];
  sources: Source[];
};

const isConsolidatedWeather = (arg: unknown): arg is ConsolidatedWeather => {
  const cw = arg as ConsolidatedWeather;

  return (
    typeof cw.id === 'number' &&
    typeof cw.applicable_date === 'string' &&
    weatherNames.includes(cw.weather_state_name) &&
    weatherCodes.includes(cw.weather_state_abbr) &&
    typeof cw.wind_speed === 'number' &&
    typeof cw.wind_direction === 'number' &&
    windDirectionCompasses.includes(cw.wind_direction_compass) &&
    typeof cw.min_temp === 'number' &&
    typeof cw.max_temp === 'number' &&
    typeof cw.the_temp === 'number' &&
    typeof cw.air_pressure === 'number' &&
    typeof cw.humidity === 'number' &&
    typeof cw.visibility === 'number' &&
    typeof cw.predictability === 'number'
  );
};

const isSource = (arg: unknown): arg is Source => {
  const s = arg as Source;

  return typeof s.title === 'string' && typeof s.url === 'string';
};

const isWeather = (args: unknown): args is Weather => {
  const w = args as Weather;

  const isLattlongFormat = w.latt_long
    .split(',')
    .every((l) => !isNaN(parseFloat(l)));
  const isParentLattlongFormat = w.parent.latt_long
    .split(',')
    .every((l) => !isNaN(parseFloat(l)));

  return (
    typeof w.title === 'string' &&
    locationTypes.includes(w.location_type) &&
    typeof w.latt_long === 'string' &&
    isLattlongFormat &&
    typeof w.time === 'string' &&
    (typeof w.sun_rise === 'undefined' || typeof w.sun_rise === 'string') &&
    (typeof w.sun_set === 'undefined' || typeof w.sun_set === 'string') &&
    typeof w.timezone_name === 'string' &&
    typeof w.parent.title === 'string' &&
    locationTypes.includes(w.parent.location_type) &&
    typeof w.parent.latt_long === 'string' &&
    isParentLattlongFormat &&
    typeof w.parent.woeid === 'number' &&
    w.consolidated_weather.every((c) => isConsolidatedWeather(c)) &&
    w.sources.every((s) => isSource(s))
  );
};

export { isConsolidatedWeather, isSource, isWeather };

const direction = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;
export type Direction = (typeof direction)[number];

export type CurrentWeather = {
  city: string;
  weatherIcon: string;
  weatherName: string;
  temp: number;
  windSpeed: number;
  windDeg: number;
  humidity: number;
  visibility: number;
  airPressure: number;
};

export const isCurrentWeather = (arg: unknown): arg is CurrentWeather => {
  const cw = arg as CurrentWeather;

  return (
    typeof cw.city === 'string' &&
    typeof cw.weatherIcon === 'string' &&
    typeof cw.weatherName === 'string' &&
    typeof cw.temp === 'number' &&
    typeof cw.windSpeed === 'number' &&
    typeof cw.windDeg === 'number' &&
    typeof cw.humidity === 'number' &&
    typeof cw.visibility === 'number' &&
    typeof cw.airPressure === 'number'
  );
};

export type DayWeather = {
  date: string;
  weatherIcon: string;
  weatherName: string;
  maxTemp: number;
  minTemp: number;
};

export type ForecastWeather = DayWeather[];

const isDayWeather = (args: unknown): args is DayWeather => {
  const dw = args as DayWeather;

  return (
    typeof dw.date === 'string' &&
    typeof dw.weatherIcon === 'string' &&
    typeof dw.weatherName === 'string' &&
    typeof dw.maxTemp === 'number' &&
    typeof dw.minTemp === 'number'
  );
};

export const isForecastWeather = (arg: unknown): arg is ForecastWeather => {
  const fw = arg as ForecastWeather;

  return fw.every((dw) => isDayWeather(dw));
};
