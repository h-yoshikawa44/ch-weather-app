import { VFC } from 'react';
import { css } from '@emotion/react';
import Card from '@/components/common/Card';
import { fonts, colors } from '@/styles/constants';

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

const WeatherHighlightCommon: VFC<Props> = ({ type, value }) => {
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
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray5};
`;

const weatherHighlightCommonValue = css`
  margin-top: 4px;
  font-family: ${fonts.raleway};
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  color: ${colors.gray5};

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
