import { FC, ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import { fonts, colors } from '@/styles/constants';
import { createDarkenColor } from '@/libs/csx';

type Color = 'gray' | 'blue';

type Props = Omit<ComponentPropsWithRef<'button'>, 'color'> & {
  color: Color;
};

const Button: FC<Props> = ({ color, children, ...props }) => {
  return (
    <button css={[button, buttonColor(color)]} {...props}>
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
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  transition: background-color 0.3s;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus:not(.focus-visible) {
    outline-color: transparent;
  }
`;

const buttonColor = (color: Color) => {
  if (color === 'gray') {
    return css`
      color: ${colors.gray6};
      background-color: ${colors.gray3};

      &:hover,
      &:focus {
        /* stylelint-disable-next-line function-name-case */
        background-color: ${createDarkenColor(colors.gray3, 0.15)};
      }
    `;
  } else if (color === 'blue') {
    return css`
      color: ${colors.gray6};
      background-color: ${colors.blue};

      &:hover,
      &:focus {
        /* stylelint-disable-next-line function-name-case */
        background-color: ${createDarkenColor(colors.blue, 0.15)};
      }
    `;
  }
};

export default Button;
