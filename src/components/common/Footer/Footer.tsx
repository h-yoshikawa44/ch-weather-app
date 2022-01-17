import { VFC, ComponentPropsWithRef } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { breakPoint, fonts, colors } from '@/styles/constants';

type Props = ComponentPropsWithRef<'footer'>;

const Footer: VFC<Props> = ({ ...props }) => {
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
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const footerText = css`
  font-family: ${fonts.montserrat};
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  color: ${colors.gray4};

  @media (max-width: ${breakPoint.sm - 1}px) {
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
