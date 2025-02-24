export type LocationExternal = {
  /** 都市名 */
  name: string;
  /**
   * 言語ごとの都市名
   * 都市によってどの言語が入るか不定
   * （数が多いので定義は最低限だけ）
   */
  local_names?: {
    ja?: string;
    en?: string;
  };
  /** 緯度 */
  lat: number;
  /** 経度 */
  lon: number;
  /** 都市が属する国 */
  country: string;
  /** 都市の状態 */
  state?: string;
};

/**
 * Geocoding API（外部 API） のレスポンスモデル
 * ref: https://openweathermap.org/api/geocoding-api
 */
export type LocationsExternal = LocationExternal[];

export const isLocationExternal = (arg: unknown): arg is LocationExternal => {
  const l = arg as LocationExternal;

  return (
    typeof l.name === 'string' &&
    (typeof l.local_names?.en === 'undefined' ||
      typeof l.local_names.en === 'string') &&
    (typeof l.local_names?.ja === 'undefined' ||
      typeof l.local_names.ja === 'string') &&
    typeof l.lat === 'number' &&
    typeof l.lon === 'number' &&
    typeof l.country === 'string' &&
    (typeof l.state === 'undefined' || typeof l.state === 'string')
  );
};

export const isLocationsExternal = (
  args: unknown,
): args is LocationsExternal => {
  const ls = args as LocationsExternal;

  return ls.every((l) => isLocationExternal(l));
};
