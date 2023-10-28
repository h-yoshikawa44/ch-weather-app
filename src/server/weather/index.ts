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
import { creatForecastWeatherViewModel } from './createForecastWeatherViewmodel';

export type { CurrentWeatherQuery, ForecastWeatherQuery };
export {
  isCurrentWeatherQuery,
  getCurrentWeatherToOuter,
  createCurrentWeatherViewModel,
  isForecastWeatherQuery,
  getForecastWeatherToOuter,
  creatForecastWeatherViewModel,
};
