import {
  CurrentWeatherQuery,
  isCurrentWeatherQuery,
  getCurrentWeatherToOuter,
} from './getCurrentWeatherToOuter';
import { createCurrentWeatherViewModel } from './createCurrentWeatherViewModel';
import { WeatherType } from './Weather';

export type { CurrentWeatherQuery, WeatherType };
export {
  isCurrentWeatherQuery,
  getCurrentWeatherToOuter,
  createCurrentWeatherViewModel,
};
