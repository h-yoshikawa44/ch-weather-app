const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const dayOfWeekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * 日付文字列をフォーマットする（例：Sun, 16 Jan）
 * @param dateStr 日付文字列
 * @returns フォーマットした日付
 */
export const dateFormat = (dateStr: string) => {
  const date = new Date(dateStr);

  const month = monthList[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = dayOfWeekList[date.getDay()];

  return `${dayOfWeek}, ${day} ${month}`;
};

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
