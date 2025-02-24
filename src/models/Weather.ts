export type TemperatureType = 'celsius' | 'fahrenheit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
