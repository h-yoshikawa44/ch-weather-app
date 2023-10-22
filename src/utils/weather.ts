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
