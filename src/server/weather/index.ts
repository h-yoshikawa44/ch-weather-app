import {
  CurrentWeatherQuery,
  isCurrentWeatherQuery,
  getCurrentWeatherToOuter,
} from './getCurrentWeatherToOuter';
import {
  ForecastWeatherQuery,
  isForecastWeatherQuery,
  getForecastWeatherToOuter,
} from './getForecastWeatherToOuter';
import { createCurrentWeatherViewModel } from './createCurrentWeatherViewModel';

export type { CurrentWeatherQuery, ForecastWeatherQuery };
export {
  isCurrentWeatherQuery,
  getCurrentWeatherToOuter,
  createCurrentWeatherViewModel,
  isForecastWeatherQuery,
  getForecastWeatherToOuter,
};
