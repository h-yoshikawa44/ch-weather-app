type Coord = {
  /** 経度 */
  lon: number;
  /** 緯度 */
  lat: number;
};

type WeatherIdThunderstorm =
  | 200
  | 201
  | 202
  | 210
  | 211
  | 212
  | 221
  | 230
  | 231
  | 232;
type WeatherIdDrizzle = 300 | 301 | 302 | 310 | 311 | 312 | 313 | 314 | 321;
type WeatherIdRain = 500 | 501 | 502 | 503 | 504 | 511 | 520 | 521 | 522 | 531;
type WeatherIdSnow =
  | 600
  | 601
  | 602
  | 611
  | 612
  | 613
  | 615
  | 616
  | 620
  | 621
  | 622;
type WeatherIdAtmosphere =
  | 701
  | 711
  | 721
  | 731
  | 741
  | 751
  | 761
  | 762
  | 771
  | 781;
type WeatherIdClear = 800;
type WeatherIdClouds = 801 | 802 | 803 | 804;
export type WeatherId =
  | WeatherIdThunderstorm
  | WeatherIdDrizzle
  | WeatherIdRain
  | WeatherIdSnow
  | WeatherIdAtmosphere
  | WeatherIdClear
  | WeatherIdClouds;

const weatherType = [
  'Thunderstorm',
  'Drizzle',
  'Rain',
  'Snow',
  'Mist',
  'Smoke',
  'Haze',
  'Dust',
  'Fog',
  'Sand',
  'Dust',
  'Ash',
  'Squall',
  'Tomado',
  'Clear',
  'Clouds',
] as const;
type WeatherType = (typeof weatherType)[number];

type WeatherIcon =
  | '01d'
  | '02d'
  | '03d'
  | '04d'
  | '09d'
  | '10d'
  | '11d'
  | '13d'
  | '50d'
  | '01n'
  | '02n'
  | '03n'
  | '04n'
  | '09n'
  | '10n'
  | '11n'
  | '13n'
  | '50n';

type Weather = {
  /**
   * 気象条件 ID
   * ref: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
   */
  id: WeatherId;
  /** 気象のグループ */
  main: WeatherType;
  /** 気象グループ内の気象詳細説明 */
  description: string;
  /**
   * 天気アイコン ID
   * ref: https://openweathermap.org/weather-conditions#Icon-list
   */
  icon: WeatherIcon;
};

type Main = {
  /**
   * 気温（単位はクエリで指定したもの）
   * - default: kelvin
   * - metric: celsius
   * - inperial: fahrenheit
   */
  temp: number;
  /**
   * 体感気温 （単位はクエリで指定したもの）
   * - default: kelvin
   * - metric: celsius
   * - inperial: fahrenheit
   */
  feels_like: number;
  /**
   * 現時点の最低気温 （単位はクエリで指定したもの）
   * - default: kelvin
   * - metric: celsius
   * - inperial: fahrenheit
   * */
  temp_min: number;
  /**
   * 現時点の最高気温 （単位はクエリで指定したもの）
   * - default: kelvin
   * - metric: celsius
   * - inperial: fahrenheit
   */
  temp_max: number;
  /** 海面上の大気圧 hPa（旧 mb） */
  pressure: number;
  /** 海面上の大気圧、hPa */
  sea_level?: number;
  /** 地上の大気圧、hPa */
  grnd_level?: number;
  /** 湿度 % */
  humidity: number;
};

type Clouds = {
  /** 曇り度 % */
  all: number;
};

type Wind = {
  /**
   * 風速 （単位はクエリで指定したもの）
   * - default: meter/sec
   * - metric: meter/sec
   * - inperial: miles/hour
   * */
  speed: number;
  /** 風向 角度 */
  deg: number;
  /**
   * 突風 （単位はクエリで指定したもの）
   * - default: meter/sec
   * - metric: meter/sec
   * - inperial: miles/hour
   * */
  gust?: number;
};

type Rain = {
  /** 過去1時間の雨量 mm */
  '1h'?: number;
  /** 過去3時間の雨量 mm */
  '3h'?: number;
};

type Snow = {
  /** 過去1時間の雪量 mm */
  '1h'?: number;
  /** 過去3時間の雪量 mm */
  '3h'?: number;
};

/**
 * Current weather data API（外部 API） のレスポンスモデル
 * ref: https://openweathermap.org/current
 */
export type CurrentWeatherResponse = {
  /** 地理情報 */
  coord: Coord;
  /** 気象情報（配列の最初のものがプライマリ） */
  weather: Weather[];
  /** 気象の数値情報 */
  main: Main;
  /** 視野距離 m（最大10km） */
  visibility: number;
  /** 風情報 */
  wind: Wind;
  /** 降雨量情報 */
  rain?: Rain;
  /** 降雪量情報 */
  snow?: Snow;
  /** 雲情報 */
  clouds: Clouds;
  /** データ計算時刻 UNIX UTC */
  dt: number;
  /**  */
  sys: {
    /** 国コード */
    country: string;
    /** 日の出時間 UNIX UTC */
    sunrise: number;
    /** 日没時間 UNIX UTC */
    sunset: number;
  };
  /** UTC からの秒単位のシフト */
  timezone: number;
  /** 都市 ID */
  id: number;
  /** 都市名 */
  name: string;
};

export const isCurrentWeatherResponse = (
  arg: unknown,
): arg is CurrentWeatherResponse => {
  const w = arg as CurrentWeatherResponse;

  // 最低限のチェック
  return (
    typeof w.weather[0].id === 'number' &&
    weatherType.includes(w.weather[0].main) &&
    typeof w.main.temp === 'number' &&
    typeof w.main.pressure === 'number' &&
    typeof w.main.humidity === 'number' &&
    typeof w.visibility === 'number' &&
    typeof w.wind.speed === 'number' &&
    typeof w.wind.deg === 'number'
  );
};

type City = {
  /** 都市 ID */
  id: number;
  /** 都市名 */
  name: string;
  /** 地理情報 */
  coord: Coord;
  /** 国コード */
  country: string;
  /** 都市人口 */
  population: number;
  /** UTC からの秒単位のシフト */
  timezone: number;
  /** 日の出時間、Unix、UTC */
  sunrise: number;
  /** 日没時間、Unix、UTC */
  sunset: number;
};

type ForecastWeather = {
  /** データの予測時刻、UNIX、UTC */
  dt: number;
  /** 気象の数値情報 */
  main: Main;
  /** 気象情報（配列の最初のものがプライマリ） */
  weather: Weather[];
  /** 雲情報 */
  clouds: Clouds;
  /** 風情報 */
  wind: Wind;
  /** 視野距離 m（最大10km） */
  visibility: number;
  /** 降水確率（0～1） */
  pop: number;
  /** 降雨量情報 */
  rain?: Pick<Rain, '3h'>;
  /** 降雪量情報 */
  snow?: Pick<Snow, '3h'>;
  sys: {
    /** 一日の一部 (n - 夜、d - 日) */
    pod: 'n' | 'd';
  };
  /**
   * データの予測時刻、ISO、UTC
   * 例：2023-10-28 06:00:00
   */
  dt_txt: string;
};

export type ForecastWeatherResponse = {
  /** API 応答で返されたタイムスタンプの数 */
  cnt: number;
  list: ForecastWeather[];
  city: City;
};

const isForecastWeatherList = (args: unknown): args is ForecastWeather => {
  const fwl = args as ForecastWeather;

  // 最低限のチェック
  return (
    typeof fwl.dt === 'number' &&
    typeof fwl.weather[0].id === 'number' &&
    weatherType.includes(fwl.weather[0].main) &&
    typeof fwl.main.temp_min === 'number' &&
    typeof fwl.main.temp_max === 'number'
  );
};

export const isForecastWeatherResponse = (
  arg: unknown,
): arg is ForecastWeatherResponse => {
  const fw = arg as ForecastWeatherResponse;

  // 最低限のチェック
  return fw.list.every((li) => isForecastWeatherList(li));
};
