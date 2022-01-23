import { useState, useEffect, useCallback } from 'react';
import { HTTPError } from 'ky-universal';
import { Location } from '@/models/Location';
import { TemperatureType } from '@/models/Weather';
import getLocations, { QueryParams } from '@/domains/getLocations';

type CurrentLocation = {
  name: string;
  woeId: number;
};

const httpErrorMessageText =
  'Sorry, Failed to obtain location information. Please take some time and try again.';
const errorMessageText = 'Unexpected data was retrieved.';

const useWeatherSetting = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>();
  const [temperatureMode, setTemperatureMode] =
    useState<TemperatureType>('celsius');

  useEffect(() => {
    setIsLoading(true);
    const onSuccess = (position: GeolocationPosition) => {
      // 位置情報が取得できた時は、最寄りの場所をデフォルトロケーションとする
      const searchParams: QueryParams = {
        lattlong: `${position?.coords?.latitude},${position?.coords?.longitude}`,
      };
      getLocations('inner', { searchParams })
        .then((data) => {
          setCurrentLocation({
            name: data[0].title,
            woeId: data[0].woeid,
          });
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
    };
    const onError = (err: GeolocationPositionError) => {
      // 位置情報取得ができないときは、東京の緯度経度で取得
      const searchParams: QueryParams = {
        lattlong: '35.670479, 139.740921',
      };
      getLocations('inner', { searchParams })
        .then((data) => {
          setCurrentLocation({
            name: data[0].title,
            woeId: data[0].woeid,
          });
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
    };
    const options: PositionOptions = {
      maximumAge: 30000,
      timeout: 60000,
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  const handleSelectLocation = useCallback((location: Location) => {
    setCurrentLocation({ name: location.title, woeId: location.woeid });
  }, []);

  const handleSwitchTemperatureMode = useCallback((mode: TemperatureType) => {
    setTemperatureMode(mode);
  }, []);

  return {
    isLoading,
    errorMessage,
    currentLocation,
    temperatureMode,
    handleSelectLocation,
    handleSwitchTemperatureMode,
  };
};

export default useWeatherSetting;
