import { weatherIconsMap } from '@/constants/weather';
import { ForecastWeatherDataExternal } from './WeatherExternal';
import { DayWeather, ForecastWeather } from '@/models/Weather';

type DayWeatherWithDate = Omit<DayWeather, 'date'> & {
  date: Date;
};

export const creatForecastWeatherViewModel = (
  forecastWeather: ForecastWeatherDataExternal,
): ForecastWeather => {
  const today = new Date(Date.now());
  const dayList: number[] = [];

  const forecastWeatherGroupByDay = forecastWeather.list.reduce(
    (group, dayWeather) => {
      // このタイミングでタイムゾーンを加味した Date にしておく
      // 以降のこの date からの日時取得は、getUTC○○にして、さらにタイムゾーン分の加算減算がされないようにする
      const date = new Date(
        (dayWeather.dt + forecastWeather.city.timezone) * 1000,
      );
      const day = date.getUTCDate();

      // 当日の天気予報情報は含めない
      if (today.getDate() === day) return group;

      dayList.push(day);
      group[day] = [
        ...(group[day] ?? []),
        {
          date: date,
          weatherIcon: weatherIconsMap[dayWeather.weather[0].id],
          weatherName: dayWeather.weather[0].main,
          maxTemp: dayWeather.main.temp_max,
          minTemp: dayWeather.main.temp_min,
        },
      ];

      return group;
    },
    {} as { [key in number]: DayWeatherWithDate[] },
  );
  const dayDistinctList = Array.from(new Set(dayList));

  return dayDistinctList.map((day) => {
    return forecastWeatherGroupByDay[day].reduce(
      (dayForecast, hourlyWeather) => {
        const weatherDayHour = hourlyWeather.date.getUTCHours();

        // 天候については、12時の天気ベースにする
        // 5日目はアクセスする時間によって12時の天気予報情報がないことがあるので
        // 5日目の12時前の一番最後の天気予報情報を使う
        return {
          date:
            weatherDayHour <= 12
              ? hourlyWeather.date.toUTCString()
              : dayForecast.date,
          weatherIcon:
            weatherDayHour <= 12
              ? hourlyWeather.weatherIcon
              : dayForecast.weatherIcon,
          weatherName:
            weatherDayHour <= 12
              ? hourlyWeather.weatherName
              : dayForecast.weatherName,
          maxTemp:
            dayForecast.maxTemp < hourlyWeather.maxTemp
              ? hourlyWeather.maxTemp
              : dayForecast.maxTemp,
          minTemp:
            dayForecast.minTemp > hourlyWeather.minTemp
              ? hourlyWeather.minTemp
              : dayForecast.minTemp,
        };
      },
      { maxTemp: 0, minTemp: 100 } as DayWeather,
    );
  });
};
