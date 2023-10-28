import { FC } from 'react';
import { css } from '@emotion/react';
import { Navigation } from '@emotion-icons/material-rounded/Navigation';
import Card from '@/components/common/Card';
import { colors } from '@/styles/constants';
import { raleway } from '@/styles/fonts';
import { convertDegToDirection, convertMpsToMph } from '@/utils/weather';

type Props = {
  speed?: number;
  deg?: number;
};

const WeatherWindStatus: FC<Props> = ({ speed, deg }) => {
  return (
    <Card>
      <div css={weatherWindStatusLayout}>
        <h4 css={weatherWindStatusTitle}>Wind status</h4>
        <p css={weatherWindStatusSpeed}>
          <em>{speed ? Math.round(convertMpsToMph(speed)) : '-'}</em>mph
        </p>
        <p css={weatherWindStatusCompassBlock}>
          <span css={compassBlockIconBg}>
            <Navigation css={compassBlockIcon(deg ?? 0)} size={14} />
          </span>
          <i css={compassBlockValue}>{convertDegToDirection(deg ?? 0)}</i>
        </p>
      </div>
    </Card>
  );
};

const weatherWindStatusLayout = css`
  display: grid;
  place-items: center;
`;

const weatherWindStatusTitle = css`
  font-family: ${raleway.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray6};
`;

const weatherWindStatusSpeed = css`
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
`;

const weatherWindStatusCompassBlock = css`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const compassBlockIconBg = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: ${colors.gray3};
  border-radius: 50%;
`;

const compassBlockIcon = (windDeg: number) => {
  return css`
    color: ${colors.gray6};
    transform: rotate(${windDeg}deg);
  `;
};

const compassBlockValue = css`
  margin-left: 8px;
  font-family: ${raleway.style.fontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${colors.gray6};
`;

export default WeatherWindStatus;
