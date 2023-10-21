import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import { colors } from '@/styles/constants';

type Props = {
  children: ReactNode;
};

const Card: FC<Props> = ({ children }) => {
  return <div css={card}>{children}</div>;
};

const card = css`
  padding: 24px 48px;
  background-color: ${colors.bgLighten};
`;

export default Card;
