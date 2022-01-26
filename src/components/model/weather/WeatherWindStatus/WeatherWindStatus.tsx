import { VFC } from 'react';
import { css } from '@emotion/react';
import { Navigation } from '@emotion-icons/material-rounded/Navigation';
import Card from '@/components/common/Card';
import { WindDirectionCompass } from '@/models/Weather';
import { windAngles } from '@/constants/weather';
import { fonts, colors } from '@/styles/constants';

type Props = {
  speed?: number;
  compass?: WindDirectionCompass;
};

const WeatherWindStatus: VFC<Props> = ({ speed, compass }) => {
  return (
    <Card>
      <div css={weatherWindStatusLayout}>
        <h4 css={weatherWindStatusTitle}>Wind status</h4>
        <p css={weatherWindStatusSpeed}>
          <em>{speed ? Math.round(speed) : '-'}</em>mph
        </p>
        <p css={weatherWindStatusCompassBlock}>
          <span css={compassBlockIconBg}>
            <Navigation
              css={compass ? compassBlockIcon(compass) : 'N'}
              size={14}
            />
          </span>
          <i css={compassBlockValue}>{compass}</i>
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
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray6};
`;

const weatherWindStatusSpeed = css`
  margin-top: 4px;
  font-family: ${fonts.raleway};
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

const compassBlockIcon = (compass: WindDirectionCompass) => {
  return css`
    color: ${colors.gray6};
    transform: rotate(${windAngles[compass]}deg);
  `;
};

const compassBlockValue = css`
  margin-left: 8px;
  font-family: ${fonts.raleway};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${colors.gray6};
`;

export default WeatherWindStatus;
