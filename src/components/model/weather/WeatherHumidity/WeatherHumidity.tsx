import { VFC } from 'react';
import { css } from '@emotion/react';
import Card from '@/components/common/Card';
import { fonts, colors } from '@/styles/constants';

type Props = {
  humidity: number;
};

const WeatherHumidity: VFC<Props> = ({ humidity }) => {
  return (
    <Card>
      <div css={weatherHumidityLayout}>
        <h4 css={weatherHumidityTitle}>Humidity</h4>
        <p css={weatherHumidityValue}>
          <em>{humidity}</em>%
        </p>
        <div css={weatherHumidityMeterBlock}>
          <label css={meterBlockLabel} htmlFor="weather-humidity-meter">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </label>
          <meter
            id="weather-humidity-meter"
            css={meterBlockMeter}
            min={0}
            max={100}
            value={humidity}
          >
            {humidity}
          </meter>
          <label css={meterBlockLabelPer} htmlFor="weather-humidity-meter">
            %
          </label>
        </div>
      </div>
    </Card>
  );
};

const weatherHumidityLayout = css`
  display: grid;
  place-items: center; ;
`;

const weatherHumidityTitle = css`
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray5};
`;

const weatherHumidityValue = css`
  margin-top: 4px;
  font-family: ${fonts.raleway};
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 42px;
  color: ${colors.gray5};

  em {
    font-size: 64px;
    font-weight: bold;
    line-height: 75px;
  }
`;

const weatherHumidityMeterBlock = css`
  margin-top: 16px;
`;

const meterBlockLabel = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: -8px;
  font-family: ${fonts.raleway};
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 14px;
  color: ${colors.gray4};
`;

const meterBlockMeter = css`
  &::-webkit-meter-bar {
    background-color: ${colors.bar};
  }

  &::-webkit-meter-optimum-value {
    background-color: ${colors.barActive};
  }
`;

const meterBlockLabelPer = css`
  display: block;
  margin-top: -4px;
  font-family: ${fonts.raleway};
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 14px;
  color: ${colors.gray4};
  text-align: right;
`;

export default WeatherHumidity;
