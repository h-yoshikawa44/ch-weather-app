import { FC, Fragment } from 'react';
import { css } from '@emotion/react';
import WeatherTop from '@/components/model/weather/WeatherTop';
import WeatherDay from '@/components/model/weather/WeatherDay';
import WeatherWindStatus from '@/components/model/weather/WeatherWindStatus';
import WeatherHumidity from '@/components/model/weather/WeatherHumidity';
import WeatherHighlightCommon from '@/components/model/weather/WeatherHighlightCommon';
import WeatherLocationMenu from '@/components/model/weather/WeatherLocationMenu';
import CircleButton from '@/components/common/CircleButton';
import Footer from '@/components/common/Footer';
import { breakPoint, colors } from '@/styles/constants';
import { raleway } from '@/styles/fonts';
import useWeatherSetting from '@/hooks/useWeatherSetting';
import useWeather from '@/hooks/useWeather';
import useLocationMenu from '@/hooks/useLocationMenu';

const Home: FC = () => {
  const {
    isLoading: isLoadingSetting,
    currentGeoLocation,
    temperatureMode,
    handleInitialCurrentLocation,
    handleSelectLocation,
    handleSwitchTemperatureMode,
  } = useWeatherSetting();

  const { isLoading, errorMessage, weather, forecastWeather } = useWeather(
    currentGeoLocation?.lat,
    currentGeoLocation?.lon,
  );

  const {
    open,
    inertFlg,
    query,
    isLoading: isLoadingLocation,
    errorMessage: errorMessageLocation,
    locations,
    handleLocationMenuOpen,
    handleLocationMenuClose,
    handleChangeSearchQuery,
    handleSearchLocation,
  } = useLocationMenu();

  if (isLoadingSetting || isLoading) {
    return (
      <main css={darkBgColor}>
        <p css={guideMessageBlock}>
          <small css={guideMessageText}>Loading...</small>
        </p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main css={darkBgColor}>
        <p css={guideMessageBlock}>
          <small css={guideMessageText}>{errorMessage}</small>
        </p>
      </main>
    );
  }

  const today = new Date(Date.now()).toLocaleDateString();

  return (
    <Fragment>
      <div css={mainLayout}>
        <div inert={open}>
          <WeatherTop
            today={today}
            weatherIconSrc={weather?.weatherIcon}
            weatherName={weather?.weatherName}
            temperature={weather?.temp}
            location={weather?.city}
            mode={temperatureMode}
            handleLocationMenuOpen={handleLocationMenuOpen}
            handleInitialCurrentLocation={handleInitialCurrentLocation}
          />
        </div>
        <div css={[darkBgColor, rightAreaLayout]} inert={inertFlg}>
          <main>
            <div css={rightAreaContainer}>
              <header css={rightAreaHeader}>
                <div css={rightAreaHeaderLayout}>
                  <CircleButton
                    color="light"
                    onClick={() => {
                      handleSwitchTemperatureMode('celsius');
                    }}
                  >
                    ℃
                  </CircleButton>
                  <CircleButton
                    color="dark"
                    onClick={() => {
                      handleSwitchTemperatureMode('fahrenheit');
                    }}
                  >
                    ℉
                  </CircleButton>
                </div>
              </header>
              <section css={rightAreaWeekSection}>
                <div css={rightAreaWeekSectionLayout}>
                  {forecastWeather?.map((day, index) => (
                    <WeatherDay
                      key={day.date}
                      date={day.date}
                      isTomorrow={index === 0}
                      weatherIconSrc={day.weatherIcon}
                      weatherName={day.weatherName}
                      minTemp={day.minTemp}
                      maxTemp={day.maxTemp}
                      mode={temperatureMode}
                    />
                  ))}
                </div>
              </section>
              <section css={rightAreaHighlightSection}>
                <h2 css={rightAreaHighlightSectionTitle}>
                  Today&rsquo;s Hightlights
                </h2>
                <div css={highlightSectionCardBlock}>
                  <div css={highlightSectionCardBlockLayout}>
                    <WeatherWindStatus
                      speed={weather?.windSpeed}
                      deg={weather?.windDeg}
                    />
                    <WeatherHumidity humidity={weather?.humidity} />
                    <WeatherHighlightCommon
                      type="visibility"
                      value={weather?.visibility}
                    />
                    <WeatherHighlightCommon
                      type="airPressure"
                      value={weather?.airPressure}
                    />
                  </div>
                </div>
              </section>
            </div>
          </main>
          <Footer />
        </div>
      </div>
      <WeatherLocationMenu
        open={open}
        query={query}
        isLoading={isLoadingLocation}
        errorMessage={errorMessageLocation}
        locations={locations}
        handleLocationMenuClose={handleLocationMenuClose}
        handleChangeSearchQuery={handleChangeSearchQuery}
        handleSearchLocation={handleSearchLocation}
        handleSelectLocation={handleSelectLocation}
      />
    </Fragment>
  );
};

const darkBgColor = css`
  background-color: ${colors.bg};
`;

const guideMessageBlock = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const guideMessageText = css`
  font-family: ${raleway.style.fontFamily};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: ${colors.gray5};
`;

const mainLayout = css`
  display: grid;

  /* WeatherLocationMenu の right と合わせる
    例 right が70%：30% 70%、right が0：100% */
  grid-template-columns: 30% 70%;

  @media (width < ${breakPoint.md}px) {
    grid-template-columns: 100%;
  }
`;

const rightAreaLayout = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1 0 auto;
  }
`;

const rightAreaContainer = css`
  max-width: ${breakPoint.lg}px;
  padding: 0 12%;
  margin: 0 auto;
`;

const rightAreaHeader = css`
  margin-top: 42px;

  @media (width < ${breakPoint.md}px) {
    margin-top: 24px;
  }
`;

const rightAreaHeaderLayout = css`
  text-align: right;

  & *:last-child {
    margin-left: 12px;
  }
`;

const rightAreaWeekSection = css`
  margin-top: 64px;

  @media (width < ${breakPoint.md}px) {
    margin-top: 32px;
  }
`;

const rightAreaWeekSectionLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
  gap: 16px 3%;

  @media (width < ${breakPoint.md}px) {
    gap: 32px 8%;
  }
`;

const rightAreaHighlightSection = css`
  margin-top: 72px;

  @media (width < ${breakPoint.md}px) {
    margin-top: 48px;
  }
`;

const rightAreaHighlightSectionTitle = css`
  font-family: ${raleway.style.fontFamily};
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  color: ${colors.gray6};
`;

const highlightSectionCardBlock = css`
  margin-top: 32px;

  @media (width < ${breakPoint.md}px) {
    margin-bottom: 32px;
  }
`;

const highlightSectionCardBlockLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 48px;

  @media (width < ${breakPoint.md}px) {
    grid-template-columns: 100%;
    gap: 32px;
  }
`;

export default Home;
