import { FC, ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import { darken } from 'polished';
import { colorRatios, colors } from '@/styles/constants';
import { raleway } from '@/styles/fonts';

type Color = 'light' | 'dark';
type Props = Omit<ComponentPropsWithRef<'button'>, 'color'> & {
  color: Color;
};

const CircleButton: FC<Props> = ({ color, children, ...props }) => {
  return (
    <button css={[circleButton, circleButtonColor(color)]} {...props}>
      {children}
    </button>
  );
};

const circleButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-family: ${raleway.style.fontFamily};
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: 21px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  transition: background-color 0.3s;
`;

const circleButtonColor = (color: Color) => {
  if (color === 'light') {
    return css`
      color: ${colors.black2};
      background-color: ${colors.gray6};

      &:hover,
      &:focus {
        background-color: ${darken(colorRatios.buttonDarken, colors.gray6)};
      }

      &:focus:not(:focus-visible) {
        outline-color: transparent;
      }
    `;
  } else if (color === 'dark') {
    return css`
      color: ${colors.gray6};
      background-color: ${colors.gray1};

      &:hover,
      &:focus {
        background-color: ${darken(colorRatios.buttonDarken, colors.gray1)};
      }

      &:focus:not(:focus-visible) {
        outline-color: transparent;
      }
    `;
  }
};

export default CircleButton;
