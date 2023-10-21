import { FC } from 'react';
import { css } from '@emotion/react';
import Card from '@/components/common/Card';
import { colors } from '@/styles/constants';
import { raleway } from '@/styles/fonts';

const title = {
  visibility: 'Visibility',
  airPressure: 'Air Pressure',
};

const units = {
  visibility: 'miles',
  airPressure: 'mb',
};

type Props = {
  type: 'visibility' | 'airPressure';
  value?: number;
};

const WeatherHighlightCommon: FC<Props> = ({ type, value }) => {
  let roundValue;
  if (value) {
    if (type === 'visibility') {
      roundValue = Math.round(value * 10) / 10;
    } else if (type === 'airPressure') {
      roundValue = Math.round(value);
    }
  }

  return (
    <Card>
      <div css={weatherHighlightCommonLayout}>
        <h4 css={weatherHighlightCommonTitle}>{title[type]}</h4>
        <p css={weatherHighlightCommonValue}>
          <em>{roundValue ?? '-'}</em>
          <span>{units[type]}</span>
        </p>
      </div>
    </Card>
  );
};

const weatherHighlightCommonLayout = css`
  display: grid;
  place-items: center;
`;

const weatherHighlightCommonTitle = css`
  font-family: ${raleway.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray6};
`;

const weatherHighlightCommonValue = css`
  margin-top: 4px;
  font-family: ${raleway.style.fontFamily};
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  color: ${colors.gray6};

  em {
    font-size: 64px;
    font-weight: bold;
    line-height: 75px;
  }

  span {
    margin-left: 8px;
  }
`;

export default WeatherHighlightCommon;
