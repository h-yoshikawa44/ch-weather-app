import { FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { WeatherCode, TemperatureType } from '@/models/Weather';
import {
  weatherIcons,
  weatherNames,
  temperatureUnits,
} from '@/constants/weather';
import { fonts, colors } from '@/styles/constants';
import { dateFormat } from '@/utils/date';
import { convertCelsiusToFahrenheit } from '@/utils/weather';

type Props = {
  date: string;
  isTomorrow?: boolean;
  weatherCode: WeatherCode;
  minTemp: number;
  maxTemp: number;
  mode: TemperatureType;
};

const WeatherDayCard: FC<Props> = ({
  date,
  isTomorrow = false,
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
    <div css={weatherDay}>
      <h4 css={weatherDayDate}>
        <time dateTime={date}>
          {isTomorrow ? 'Tomorrow' : dateFormat(date)}
        </time>
      </h4>
      <p css={weatherDayImgBlock}>
        <Image
          src={weatherIcons[weatherCode]}
          alt={weatherNames[weatherCode]}
          layout="fill"
          objectFit="contain"
        />
      </p>
      <p css={weatherDayTempBlock}>
        <span css={tempBlockMax}>{max}</span>
        <span css={tempBlockMin}>{min}</span>
      </p>
    </div>
  );
};

const weatherDay = css`
  padding: 20px 24px;
  background-color: ${colors.bgLighten};
`;

const weatherDayDate = css`
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray6};
  text-align: center;
  white-space: nowrap;
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
  color: ${colors.gray6};
`;

const tempBlockMin = css`
  display: block;
  color: ${colors.gray5};
`;

export default WeatherDayCard;
