import { FC, ComponentPropsWithRef } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { breakPoint, colors } from '@/styles/constants';
import { montserrat } from '@/styles/fonts';

type Props = ComponentPropsWithRef<'footer'>;

const Footer: FC<Props> = ({ ...props }) => {
  return (
    <footer css={[footer, footerText]} {...props}>
      <span>
        created by <span css={name}>h-yoshikawa44</span> - devChallenges.io
        |&nbsp;
      </span>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span css={logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
};

const footer = css`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const footerText = css`
  font-family: ${montserrat.style.fontFamily};
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  color: ${colors.gray5};

  @media (width < ${breakPoint.sm}px) {
    flex-direction: column;
    justify-content: space-around;
    height: 70px;
  }
`;

const name = css`
  font-weight: 700;
`;

const logo = css`
  height: 1em;
  margin-left: 0.5rem;
`;

export default Footer;
