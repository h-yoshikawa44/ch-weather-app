import { VFC, ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import { Search } from '@emotion-icons/material-rounded/Search';
import { fonts, colors } from '@/styles/constants';

type Props = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  fullWidth?: boolean;
};

const SearchInput: VFC<Props> = ({ fullWidth = false, ...props }) => {
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
  border: 1px solid ${colors.gray5};
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
  font-family: ${fonts.raleway};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray5};
  background-color: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${colors.placeHolder};
  }
`;

export default SearchInput;
