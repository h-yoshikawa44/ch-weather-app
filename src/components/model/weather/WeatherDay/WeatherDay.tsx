import { VFC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import Card from '@/components/common/Card';
import { WeatherName, WeatherCode, TemperatureType } from '@/models/Weather';
import { weatherIcons, temperatureUnits } from '@/constants/weather';
import { fonts, colors } from '@/styles/constants';
import { dateFormat } from '@/utils/date';
import { convertCelsiusToFahrenheit } from '@/utils/weather';

type Props = {
  date: string;
  isTomorrow?: boolean;
  weather: WeatherName;
  weatherCode: WeatherCode;
  minTemp: number;
  maxTemp: number;
  mode: TemperatureType;
};

const WeatherDayCard: VFC<Props> = ({
  date,
  isTomorrow = false,
  weather,
  weatherCode,
  minTemp,
  maxTemp,
  mode,
}) => {
  let min, max;
  if (mode === 'celsius') {
    min = Math.round(minTemp) + temperatureUnits[mode];
    max = Math.round(maxTemp) + temperatureUnits[mode];
  } else if (mode === 'fahrenheit') {
    min = convertCelsiusToFahrenheit(minTemp) + temperatureUnits[mode];
    max = convertCelsiusToFahrenheit(maxTemp) + temperatureUnits[mode];
  }

  return (
    <Card>
      <h4 css={weatherDayDate}>
        <time dateTime={date}>
          {isTomorrow ? 'Tomorrow' : dateFormat(date)}
        </time>
      </h4>
      <p css={weatherDayImgBlock}>
        <Image src={weatherIcons[weatherCode]} alt={weather} layout="fill" />
      </p>
      <p css={weatherDayTempBlock}>
        <span css={tempBlockMax}>{max}</span>
        <span css={tempBlockMin}>{min}</span>
      </p>
    </Card>
  );
};

const weatherDayDate = css`
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray5};
  text-align: center;
`;

const weatherDayImgBlock = css`
  position: relative;
  max-width: 100%;
  height: 80px;
  margin-top: 8px;
`;

const weatherDayTempBlock = css`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`;

const tempBlockMax = css`
  display: block;
  color: ${colors.gray5};
`;

const tempBlockMin = css`
  display: block;
  color: ${colors.gray4};
`;

export default WeatherDayCard;
