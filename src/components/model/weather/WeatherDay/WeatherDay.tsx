import { VFC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import Card from '@/components/common/Card';
import { WeatherName, WeatherCode, TemperatureType } from '@/models/Weather';
import { weatherIcon } from '@/constants/weather';
import { fonts, colors } from '@/styles/constants';
import { dateFormat, convertCelsiusToFahrenheit } from '@/util/date';

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
    min = Math.round(minTemp) + '℃';
    max = Math.round(maxTemp) + '℃';
  } else if (mode === 'fahrenheit') {
    min = convertCelsiusToFahrenheit(minTemp) + '℉';
    max = convertCelsiusToFahrenheit(maxTemp) + '℉';
  }

  return (
    <Card>
      <h4 css={weatherDayCardDate}>
        <time dateTime={date}>
          {isTomorrow ? 'Tomorrow' : dateFormat(date)}
        </time>
      </h4>
      <p css={weatherDayCardImgBlock}>
        <Image src={weatherIcon[weatherCode]} alt={weather} layout="fill" />
      </p>
      <p css={weatherDayCardTempBlock}>
        <span css={tempBlockMax}>{max}</span>
        <span css={tempBlockMin}>{min}</span>
      </p>
    </Card>
  );
};

const weatherDayCardDate = css`
  margin: 0 auto;
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray5};
`;

const weatherDayCardImgBlock = css`
  position: relative;
  max-width: 100%;
  height: 80px;
  margin-top: 8px;
`;

const weatherDayCardTempBlock = css`
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
