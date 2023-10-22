/**
 * 摂氏気温を華氏気温に変換
 * @param celsius 摂氏気温
 * @returns 華氏気温
 */
export const convertCelsiusToFahrenheit = (celsius: number) => {
  // 小数点第1位で四捨五入
  const c = Math.round(celsius * 10) / 10;

  return Math.round((c * 9) / 5 + 32);
};

/**
 * メートル/秒をマイル/時に変換
 * @param mps メートル/秒
 * @returns マイル/時
 */
export const convertMpsToMph = (mps: number) => {
  return mps * 2.237;
};

/**
 * 角度から方角に変換
 * @param deg 角度
 * @returns 方角
 */
export const convertDegToDirection = (deg: number) => {
  const directionArea = deg / 11.25;

  switch (true) {
    // 0 <= x < 11.25, 348.75 <= x <= 360
    case directionArea < 1 || directionArea > 31:
      return 'N';
    // 11.25 <= x < 33.75
    case directionArea < 3:
      return 'NNE';
    // 33.75 <= x < 56.25
    case directionArea < 5:
      return 'NE';
    // 56.25 <= x < 78.75
    case directionArea < 7:
      return 'ENE';
    // 78.75 <= x < 101.25
    case directionArea < 9:
      return 'E';
    // 101.25 <= x < 123.75
    case directionArea < 11:
      return 'ESE';
    // 123.75 <= x < 146.25
    case directionArea < 13:
      return 'SE';
    // 146.25 <= x < 168.75
    case directionArea < 15:
      return 'SSE';
    // 168.75 <= x < 191.25
    case directionArea < 17:
      return 'S';
    // 191.25 <= x < 213.75
    case directionArea < 19:
      return 'SSW';
    // 213.75 <= x < 236.25
    case directionArea < 21:
      return 'SW';
    // 236.25 <= x < 258.75
    case directionArea < 23:
      return 'WSW';
    // 258.75 <= x < 281.25
    case directionArea < 25:
      return 'W';
    // 281.25 <= x < 303.75
    case directionArea < 27:
      return 'WNW';
    // 303.75 <= x < 326.25
    case directionArea < 29:
      return 'NW';
    // 326.25 <= x < 348.75
    case directionArea < 31:
      return 'NNW';
  }
};
