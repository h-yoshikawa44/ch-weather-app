import { FC } from 'react';
import { css } from '@emotion/react';
import { colors } from '@/styles/constants';

const Card: FC = ({ children }) => {
  return <div css={card}>{children}</div>;
};

const card = css`
  padding: 20px 24px;
  background-color: ${colors.bgLighten};
`;

export default Card;
