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

export const dateFormat = (dateStr: string) => {
  const date = new Date(dateStr);

  const month = monthList[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = dayOfWeekList[date.getDay()];

  return `${dayOfWeek}, ${day} ${month}`;
};
