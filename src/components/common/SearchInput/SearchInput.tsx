import { FC, ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import { Search } from '@emotion-icons/material-rounded/Search';
import { colors } from '@/styles/constants';
import { raleway } from '@/styles/fonts';

type Props = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  fullWidth?: boolean;
};

const SearchInput: FC<Props> = ({ fullWidth = false, ...props }) => {
  return (
    <div css={[searchInput, fullWidth && searchInputFullWidth]}>
      <Search css={searchInputIcon} size={20} />
      <input
        css={[searchInputBase, fullWidth && searchInputFullWidth]}
        type="search"
        {...props}
      />
    </div>
  );
};

const searchInput = css`
  display: inline-flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${colors.gray6};
  transition: border 0.3s;

  &:focus-within {
    border: 1px solid ${colors.yellow};
  }
`;

const searchInputFullWidth = css`
  width: 100%;
`;

const searchInputIcon = css`
  color: ${colors.placeHolder};
`;

const searchInputBase = css`
  font-family: ${raleway.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray6};
  outline: none;
  background-color: transparent;
  border: none;

  &::placeholder {
    color: ${colors.placeHolder};
  }
`;

export default SearchInput;
