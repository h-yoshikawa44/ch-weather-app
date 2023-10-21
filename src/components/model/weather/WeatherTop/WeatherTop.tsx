import { FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { MyLocation } from '@emotion-icons/material-rounded/MyLocation';
import { Place } from '@emotion-icons/material-rounded/Place';
import Button from '@/components/common/Button';
import CircleButton from '@/components/common/CircleButton';
import { WeatherCode, TemperatureType } from '@/models/Weather';
import {
  weatherIcons,
  weatherNames,
  temperatureUnits,
} from '@/constants/weather';
import { breakPoint, colors } from '@/styles/constants';
import { raleway } from '@/styles/fonts';
import { dateFormat } from '@/utils/date';
import { convertCelsiusToFahrenheit } from '@/utils/weather';

type Props = {
  today?: string;
  weatherCode?: WeatherCode;
  temperature?: number;
  location?: string;
  mode: TemperatureType;
  handleLocationMenuOpen: VoidFunction;
  handleInitialCurrentLocation: VoidFunction;
};

const WeatherTop: FC<Props> = ({
  today,
  weatherCode,
  temperature,
  location,
  mode,
  handleLocationMenuOpen,
  handleInitialCurrentLocation,
}) => {
  let roundTemp;
  if (temperature) {
    if (mode === 'celsius') {
      roundTemp = Math.round(temperature);
    } else if (mode === 'fahrenheit') {
      roundTemp = convertCelsiusToFahrenheit(temperature);
    }
  }

  return (
    <div css={watherTop}>
      <header>
        <div css={[watherTopContainer, watherTopHeaderLayout]}>
          <Button color="gray" onClick={handleLocationMenuOpen}>
            Seach for places
          </Button>
          <CircleButton color="dark" onClick={handleInitialCurrentLocation}>
            <MyLocation size={24} />
          </CircleButton>
        </div>
      </header>
      <div css={[watherTopContents, watherTopContentLayout]}>
        <div css={contentsBgImgBlock}>
          <p css={contentsImgBlock}>
            {weatherCode && (
              <Image
                css={contentsImg}
                src={weatherIcons[weatherCode]}
                alt={weatherNames[weatherCode]}
                fill
              />
            )}
          </p>
        </div>
        <p css={contentsTemperature}>
          <em>{roundTemp}</em>
          {temperatureUnits[mode]}
        </p>
        <p css={contentsWeather}>
          {weatherCode ? weatherNames[weatherCode] : '-'}
        </p>
        <div css={contentsSubTextBlock}>
          <small css={contentsDate}>
            Today -{' '}
            <time dateTime={today}>{today ? dateFormat(today) : '-, - -'}</time>
          </small>
          <small css={contentsLocation}>
            <Place size={24} />
            <span css={contentsLocationText}>{location}</span>
          </small>
        </div>
      </div>
    </div>
  );
};

const watherTop = css`
  height: 100%;
  padding: 40px 0;
  background-color: ${colors.bgLighten};

  @media (max-width: ${breakPoint.md - 1}px) {
    padding: 20px 0 104px;
  }
`;

const watherTopContainer = css`
  padding: 0 8%;
  margin: 0 auto;
`;

const watherTopHeaderLayout = css`
  display: flex;
  justify-content: space-between;
`;

const watherTopContents = css`
  margin-top: 40px;

  @media (max-width: ${breakPoint.md - 1}px) {
    margin-top: 8px;
  }
`;

const watherTopContentLayout = css`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
`;

const contentsBgImgBlock = css`
  width: 100%;
  height: 360px;
  background-color: ${colors.bgLighten};
  background-image: url('/weather/Cloud-background.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-blend-mode: overlay;
`;

const contentsImgBlock = css`
  position: relative;
  width: 60%;
  height: 240px;
  margin: 80px auto 0;
`;

const contentsImg = css`
  object-fit: contain;
`;

const contentsTemperature = css`
  margin-top: 40px;
  font-family: ${raleway.style.fontFamily};
  font-size: 48px;
  font-style: normal;
  font-weight: 100;
  line-height: 56px;
  color: ${colors.gray5};

  em {
    font-size: 144px;
    font-weight: 500;
    line-height: 169px;
    color: ${colors.gray6};
  }

  @media (max-width: ${breakPoint.md - 1}px) {
    margin-top: -30px;
  }
`;

const contentsWeather = css`
  margin-top: 80px;
  font-family: ${raleway.style.fontFamily};
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
  color: ${colors.gray5};

  @media (max-width: ${breakPoint.md - 1}px) {
    margin-top: 24px;
  }
`;

const contentsSubTextBlock = css`
  display: grid;
  row-gap: 32px;
  place-items: center;
  margin-top: 88px;

  @media (max-width: ${breakPoint.md - 1}px) {
    row-gap: 32px;
    margin-top: 48px;
  }
`;

const contentsDate = css`
  display: block;
  font-family: ${raleway.style.fontFamily};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  color: ${colors.gray4};
`;

const contentsLocation = css`
  display: flex;
  align-items: center;
  font-family: ${raleway.style.fontFamily};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  color: ${colors.gray4};
`;

const contentsLocationText = css`
  margin-left: 4px;
`;

export default WeatherTop;
