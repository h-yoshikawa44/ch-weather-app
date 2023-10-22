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
  /** 気温 （単位はクエリで指定したもの） */
  temp: number;
  /** 体感気温 （単位はクエリで指定したもの） */
  feels_like: number;
  /** 現時点の最低気温 （単位はクエリで指定したもの） */
  temp_min: number;
  /** 現時点の最高気温 （単位はクエリで指定したもの）*/
  temp_max: number;
  /** 海面上の大気圧 hPa */
  pressure: number;
  /** 湿度 % */
  humidity: number;
};

type Clouds = {
  /** 曇り度 % */
  all: number;
};

type Wind = {
  /** 風速 （単位はクエリで指定したもの） */
  speed: number;
  /** 風向 角度 */
  deg: number;
  /** 突風 （単位はクエリで指定したもの） */
  gust?: number;
};

type Rain = {
  /** 過去1時間の雨量 mm */
  '1h'?: number;
  /** 過去3時間の雨量 mm */
  '3h'?: number;
};

/**
 * Current weather data API（外部 API） のレスポンスモデル
 * ref: https://openweathermap.org/current
 */
export type CurrentWeatherResponse = {
  coord: {
    /** 経度 */
    lon: number;
    /** 緯度 */
    lat: number;
  };
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
