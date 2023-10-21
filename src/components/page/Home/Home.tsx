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
    errorMessage: errorMessageSetting,
    currentLocation,
    temperatureMode,
    handleInitialCurrentLocation,
    handleSelectLocation,
    handleSwitchTemperatureMode,
  } = useWeatherSetting();

  const { isLoading, errorMessage, weather } = useWeather(
    currentLocation?.woeId
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

  if (errorMessageSetting || errorMessage) {
    return (
      <main css={darkBgColor}>
        <p css={guideMessageBlock}>
          <small css={guideMessageText}>
            {errorMessageSetting ? errorMessageSetting : errorMessage}
          </small>
        </p>
      </main>
    );
  }

  const today = weather?.consolidated_weather[0];
  const week = weather?.consolidated_weather.slice(1);

  return (
    <Fragment>
      <div css={mainLayout}>
        <div
          ref={(node) =>
            node &&
            (open
              ? node.setAttribute('inert', '')
              : node.removeAttribute('inert'))
          }
        >
          <WeatherTop
            today={today?.applicable_date}
            weatherCode={today?.weather_state_abbr}
            temperature={today?.the_temp}
            location={weather?.title}
            mode={temperatureMode}
            handleLocationMenuOpen={handleLocationMenuOpen}
            handleInitialCurrentLocation={handleInitialCurrentLocation}
          />
        </div>
        <div
          css={[darkBgColor, rightAreaLayout]}
          ref={(node) =>
            node &&
            (inertFlg
              ? node.setAttribute('inert', '')
              : node.removeAttribute('inert'))
          }
        >
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
                  {week?.map((day, index) => (
                    <WeatherDay
                      key={day.applicable_date}
                      date={day.applicable_date}
                      isTomorrow={index === 0}
                      weatherCode={day.weather_state_abbr}
                      minTemp={day.min_temp}
                      maxTemp={day.max_temp}
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
                      speed={today?.wind_speed}
                      compass={today?.wind_direction_compass}
                    />
                    <WeatherHumidity humidity={today?.humidity} />
                    <WeatherHighlightCommon
                      type="visibility"
                      value={today?.visibility}
                    />
                    <WeatherHighlightCommon
                      type="airPressure"
                      value={today?.air_pressure}
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

  @media (max-width: ${breakPoint.md - 1}px) {
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

  @media (max-width: ${breakPoint.md - 1}px) {
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

  @media (max-width: ${breakPoint.md - 1}px) {
    margin-top: 32px;
  }
`;

const rightAreaWeekSectionLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
  row-gap: 16px;
  column-gap: 3%;

  @media (max-width: ${breakPoint.md - 1}px) {
    row-gap: 32px;
    column-gap: 8%;
  }
`;

const rightAreaHighlightSection = css`
  margin-top: 72px;

  @media (max-width: ${breakPoint.md - 1}px) {
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

  @media (max-width: ${breakPoint.md - 1}px) {
    margin-bottom: 32px;
  }
`;

const highlightSectionCardBlockLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 48px;

  @media (max-width: ${breakPoint.md - 1}px) {
    grid-template-columns: 100%;
    gap: 32px;
  }
`;

export default Home;
