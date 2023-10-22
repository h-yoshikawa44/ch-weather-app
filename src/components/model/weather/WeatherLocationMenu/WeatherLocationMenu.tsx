import { FC, ChangeEvent, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import { Close } from '@emotion-icons/material-rounded/Close';
import { NavigateNext } from '@emotion-icons/material-rounded/NavigateNext';
import SearchInput from '@/components/common/SearchInput';
import Button from '@/components/common/Button';
import { Location, Locations } from '@/models/Location';
import { zIndex, colors, breakPoint } from '@/styles/constants';
import { raleway } from '@/styles/fonts';

type Props = {
  open: boolean;
  query: string;
  isLoading: boolean;
  errorMessage: string;
  locations?: Locations;
  handleLocationMenuClose: VoidFunction;
  handleChangeSearchQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchLocation: (e: FormEvent<HTMLFormElement>) => void;
  handleSelectLocation: (location: Location) => void;
};

const WeatherLocationMenu: FC<Props> = ({
  open,
  query,
  isLoading,
  errorMessage,
  locations,
  handleLocationMenuClose,
  handleChangeSearchQuery,
  handleSearchLocation,
  handleSelectLocation,
}) => {
  const dom = (
    <div css={[weatherLocationMenu, open && weatherLocationMenuOpen]}>
      <div css={weatherLocationMenuConteiner}>
        <header>
          <button
            css={weatherLocationMenuCloseButton}
            onClick={handleLocationMenuClose}
          >
            <Close size={24} />
          </button>
          <form css={weatherLocationMenuForm} onSubmit={handleSearchLocation}>
            <div css={weatherLocationMenuFormLayout}>
              <SearchInput
                fullWidth
                value={query}
                placeholder="search location"
                pattern="^[a-zA-Z]+$"
                title="Please enter at least one alphabetic character."
                required
                onChange={handleChangeSearchQuery}
              />
              <Button color="blue" type="submit" disabled={isLoading}>
                Search
              </Button>
            </div>
          </form>
        </header>
        {errorMessage && (
          <div css={weatherLocationMenuGuide}>
            <small css={weatherLocationMenuGuideMessage}>{errorMessage}</small>
          </div>
        )}
        <ul css={weatherLocationMenuLocationList}>
          {locations?.map((location) => (
            <li key={`${location.country} - ${location.name}`}>
              <button
                css={locationListItemButton}
                onClick={() => {
                  handleSelectLocation(location);
                  handleLocationMenuClose();
                }}
              >
                <span
                  css={locationListItemButtonText}
                >{`${location.country} - ${location.name}`}</span>
                <NavigateNext size={24} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // クライアント側の処理になるので、Next.js でのサーバ側ではポータルを使わないようにする
  if (!process.browser) {
    return dom;
  }
  return createPortal(dom, document.body);
};

const weatherLocationMenu = css`
  position: fixed;
  inset: 0 70% 0 0;
  z-index: ${zIndex.menu};
  padding: 12px 0;
  overflow-y: scroll;
  visibility: hidden;
  background-color: ${colors.blackLighten};
  opacity: 0;
  transition:
    opacity 0.3s,
    visibility 0.3s ease 0.3s,
    transform 0.3s;
  transform: translateX(-100%);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colors.blackLighten};
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray4};
    border-radius: 100px;
  }

  @media (width < ${breakPoint.md}px) {
    right: 0;
  }
`;

const weatherLocationMenuOpen = css`
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
  transform: translateX(0);
`;

const weatherLocationMenuConteiner = css`
  padding: 0 8%;
  margin: 0 auto;
`;

const weatherLocationMenuCloseButton = css`
  display: block;
  margin-left: auto;
  color: ${colors.gray6};
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:focus:not(:focus-visible) {
    border-color: transparent;
  }
`;

const weatherLocationMenuForm = css`
  margin-top: 40px;
`;

const weatherLocationMenuFormLayout = css`
  display: flex;

  & * {
    margin-right: 12px;
  }

  & *:last-child {
    margin-right: 0;
  }
`;

const weatherLocationMenuGuide = css`
  padding-left: 12px;
  margin-top: 24px;
`;

const weatherLocationMenuGuideMessage = css`
  font-family: ${raleway.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.gray6};
`;

const weatherLocationMenuLocationList = css`
  padding: 0;
  margin-top: 56px;
  list-style: none;

  li {
    margin-bottom: 8px;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

const locationListItemButton = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px 12px;
  font-family: ${raleway.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.bgLighten};
  text-align: left;
  background-color: transparent;
  border: 1px solid ${colors.blackLighten};

  &:hover,
  &:focus {
    color: ${colors.border};
    border: 1px solid ${colors.border};
  }

  &:focus:not(:focus-visible) {
    outline-color: transparent;
  }
`;

const locationListItemButtonText = css`
  color: ${colors.gray6};
`;

export default WeatherLocationMenu;
