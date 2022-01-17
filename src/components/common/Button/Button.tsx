import { FC, ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import { fonts, colors } from '@/styles/constants';
import { createDarkenColor } from '@/libs/csx';

type Props = ComponentPropsWithRef<'button'>;

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button css={button} {...props}>
      {children}
    </button>
  );
};

const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray5};
  cursor: pointer;
  background-color: ${colors.gray2};
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    /* stylelint-disable-next-line function-name-case */
    background-color: ${createDarkenColor(colors.gray2, 0.15)};
  }

  &:focus:not(.focus-visible) {
    outline-color: transparent;
  }
`;

export default Button;
