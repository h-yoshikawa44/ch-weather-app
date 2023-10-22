const weatherIcons = {
  snow: '/weather/Snow.png',
  sleet: '/weather/Sleet.png',
  hail: '/weather/Hail.png',
  thunderStorm: '/weather/Thunderstorm.png',
  heavyRain: '/weather/HeavyRain.png',
  lightRain: '/weather/LightRain.png',
  shower: '/weather/Shower.png',
  heavyCloud: '/weather/HeavyCloud.png',
  lightCloud: '/weather/LightCloud.png',
  clear: '/weather/Clear.png',
};

const weatherNames = {
  sn: 'Snow',
  sl: 'Sleet',
  h: 'Hail',
  t: 'Thunderstorm',
  hr: 'HeavyRain',
  lr: 'LightRain',
  s: 'Shower',
  hc: 'HeavyCloud',
  lc: 'LightCloud',
  c: 'Clear',
};

export const weatherIconsMap = {
  // 200系: Thunderstorm
  200: weatherIcons.thunderStorm,
  201: weatherIcons.thunderStorm,
  202: weatherIcons.thunderStorm,
  210: weatherIcons.thunderStorm,
  211: weatherIcons.thunderStorm,
  212: weatherIcons.thunderStorm,
  221: weatherIcons.thunderStorm,
  230: weatherIcons.thunderStorm,
  231: weatherIcons.thunderStorm,
  232: weatherIcons.thunderStorm,
  // 300系: Drizzle
  300: weatherIcons.lightRain,
  301: weatherIcons.lightRain,
  302: weatherIcons.lightRain,
  310: weatherIcons.lightRain,
  311: weatherIcons.lightRain,
  312: weatherIcons.lightRain,
  313: weatherIcons.lightRain,
  314: weatherIcons.lightRain,
  321: weatherIcons.lightRain,
  // 500系: Rain
  500: weatherIcons.lightRain,
  501: weatherIcons.lightRain,
  502: weatherIcons.heavyRain,
  503: weatherIcons.heavyRain,
  504: weatherIcons.heavyRain,
  511: weatherIcons.sleet,
  520: weatherIcons.shower,
  521: weatherIcons.shower,
  522: weatherIcons.shower,
  531: weatherIcons.shower,
  // 600系: Snow
  600: weatherIcons.snow,
  601: weatherIcons.snow,
  602: weatherIcons.snow,
  611: weatherIcons.sleet,
  612: weatherIcons.sleet,
  613: weatherIcons.sleet,
  615: weatherIcons.sleet,
  616: weatherIcons.sleet,
  620: weatherIcons.sleet,
  621: weatherIcons.hail,
  622: weatherIcons.hail,
  // 700系: Atmosphere（霧のアイコンがないので雲のアイコンにする）
  701: weatherIcons.heavyCloud,
  711: weatherIcons.heavyCloud,
  721: weatherIcons.heavyCloud,
  731: weatherIcons.heavyCloud,
  741: weatherIcons.heavyCloud,
  751: weatherIcons.heavyCloud,
  761: weatherIcons.heavyCloud,
  762: weatherIcons.heavyCloud,
  771: weatherIcons.heavyCloud,
  781: weatherIcons.heavyCloud,
  // 800: Clear
  800: weatherIcons.clear,
  // 800系: Clouds
  801: weatherIcons.lightCloud,
  802: weatherIcons.lightCloud,
  803: weatherIcons.heavyCloud,
  804: weatherIcons.heavyCloud,
};

const temperatureUnits = {
  celsius: '℃',
  fahrenheit: '℉',
};

const windAngles = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

export { weatherIcons, weatherNames, temperatureUnits, windAngles };
