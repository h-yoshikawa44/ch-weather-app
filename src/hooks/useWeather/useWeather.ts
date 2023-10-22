import { useState, useEffect } from 'react';
import { HTTPError } from 'ky-universal';
import { CurrentWeather } from '@/models/Weather';
import { getCurrentWeather } from '@/domains/getCurrentWeather';

const httpErrorMessageText =
  'Sorry, Failed to retrieve weather forecast information. Please take some time and try again.';
const errorMessageText = 'Unexpected data was retrieved.';

const useWeather = (lat?: number, lon?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [weather, setWeather] = useState<CurrentWeather>();

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

  return { isLoading, errorMessage, weather };
};

export default useWeather;
