import { weatherIconsMap } from '@/constants/weather';
import { CurrentWeatherExternal } from './WeatherExternal';
import { CurrentWeather } from '@/models/Weather';

export const createCurrentWeatherViewModel = (
  currentWeather: CurrentWeatherExternal,
): CurrentWeather => {
  return {
    city: `${currentWeather.sys.country} - ${currentWeather.name}`,
    weatherIcon: weatherIconsMap[currentWeather.weather[0].id],
    weatherName: currentWeather.weather[0].main,
    temp: currentWeather.main.temp,
    windSpeed: currentWeather.wind.speed,
    windDeg: currentWeather.wind.deg,
    humidity: currentWeather.main.humidity,
    visibility: currentWeather.visibility,
    airPressure: currentWeather.main.pressure,
  };
};
