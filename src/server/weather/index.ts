import {
  CurrentWeatherQuery,
  isCurrentWeatherQuery,
  getCurrentWeatherFromExternal,
} from './getCurrentWeatherFromExternal';
import {
  ForecastWeatherQuery,
  isForecastWeatherQuery,
  getForecastWeatherFromExternal,
} from './getForecastWeatherFromExternal';
import { createCurrentWeatherViewModel } from './createCurrentWeatherViewModel';
import { creatForecastWeatherViewModel } from './createForecastWeatherViewmodel';

export type { CurrentWeatherQuery, ForecastWeatherQuery };
export {
  isCurrentWeatherQuery,
  getCurrentWeatherFromExternal,
  createCurrentWeatherViewModel,
  isForecastWeatherQuery,
  getForecastWeatherFromExternal,
  creatForecastWeatherViewModel,
};
