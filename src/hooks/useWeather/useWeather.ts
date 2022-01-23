import { useState, useEffect } from 'react';
import { HTTPError } from 'ky-universal';
import { Weather } from '@/models/Weather';
import getWeather from '@/domains/getWeather';

const httpErrorMessageText =
  'Sorry, Failed to retrieve weather forecast information. Please take some time and try again.';
const errorMessageText = 'Unexpected data was retrieved.';

const useWeather = (woeId?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    if (!woeId) {
      return;
    }
    setIsLoading(true);
    getWeather('inner', woeId)
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
  }, [woeId]);

  return { isLoading, errorMessage, weather };
};

export default useWeather;
