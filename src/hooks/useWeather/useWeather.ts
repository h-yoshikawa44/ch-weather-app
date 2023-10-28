import { useState, useEffect } from 'react';
import { HTTPError } from 'ky-universal';
import { CurrentWeather, ForecastWeather } from '@/models/Weather';
import { getCurrentWeather } from '@/domains/getCurrentWeather';
import { getForecastWeather } from '@/domains/getForecastWeather';

const httpErrorMessageText =
  'Sorry, Failed to retrieve weather forecast information. Please take some time and try again.';
const errorMessageText = 'Unexpected data was retrieved.';

const useWeather = (lat?: number, lon?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [weather, setWeather] = useState<CurrentWeather>();

  const [isLoadingForecast, setIsLoadingForecast] = useState<boolean>(false);
  const [errorMessageForecast, setErrorMessageForecast] = useState<string>('');
  const [forecastWeather, setForecastWeather] = useState<ForecastWeather>();

  useEffect(() => {
    if (!lat || !lon) {
      return;
    }
    setIsLoading(true);

    getCurrentWeather({ searchParams: { lat, lon, units: 'metric' } })
      .then((data) => {
        setWeather(data);
        setErrorMessage('');
      })
      .catch((err) => {
        if (err instanceof HTTPError) {
          setErrorMessage(httpErrorMessageText);
        } else if (err instanceof Error) {
          setErrorMessage(errorMessageText);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lat, lon]);

  useEffect(() => {
    if (!lat || !lon) {
      return;
    }
    setIsLoadingForecast(true);

    getForecastWeather({ searchParams: { lat, lon, units: 'metric' } })
      .then((data) => {
        setForecastWeather(data);
        setErrorMessageForecast('');
      })
      .catch((err) => {
        if (err instanceof HTTPError) {
          setErrorMessageForecast(httpErrorMessageText);
        } else if (err instanceof Error) {
          setErrorMessageForecast(errorMessageText);
        }
      })
      .finally(() => {
        setIsLoadingForecast(false);
      });
  }, [lat, lon]);

  return {
    isLoading: isLoading || isLoadingForecast,
    errorMessage: errorMessage ? errorMessage : errorMessageForecast,
    weather,
    forecastWeather,
  };
};

export default useWeather;
