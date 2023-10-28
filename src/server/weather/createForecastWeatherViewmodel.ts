import { weatherIconsMap } from '@/constants/weather';
import { ForecastWeatherResponse } from './Weather';
import { ForecastWeather } from '@/models/Weather';

export const creatForecastWeatherViewModel = (
  forecastWeather: ForecastWeatherResponse,
): ForecastWeather => {
  const today = new Date(Date.now());

  return forecastWeather.list
    .map((dayWeather) => {
      return {
        // このタイミングでタイムゾーンを加味した Date にしておく
        date: new Date((dayWeather.dt + forecastWeather.city.timezone) * 1000),
        weatherIcon: weatherIconsMap[dayWeather.weather[0].id],
        weatherName: dayWeather.weather[0].main,
        maxTemp: dayWeather.main.temp_max,
        minTemp: dayWeather.main.temp_min,
      };
    })
    .filter((dayWeather, index, list) => {
      // 前段の map の時点ですでにタイムゾーンを加味しているため、getUTC○○を使用して、さらにタイムゾーン分の加算減算がされないようにする

      // 当日の天気予報情報は含めない
      if (today.getDate() === dayWeather.date.getUTCDate()) return false;

      const weatherDayHour = dayWeather.date.getUTCHours();
      // 12時の天気ベースで表示するようにする
      // 5日目はアクセスする時間によって12時の天気予報情報がないことがあるので
      // 5日目の一番最後の天気予報情報を使う
      return weatherDayHour === 12
        ? true
        : weatherDayHour < 12 && typeof list[index + 1] === undefined
        ? true
        : false;
    })
    .map((dayWeather) => {
      return {
        ...dayWeather,
        date: dayWeather.date.toUTCString(),
      };
    });
};
