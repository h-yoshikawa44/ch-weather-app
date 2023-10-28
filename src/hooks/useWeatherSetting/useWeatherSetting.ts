import { useState, useEffect, useCallback } from 'react';
import { Location } from '@/models/Location';
import { TemperatureType } from '@/models/Weather';

type GeoLocation = {
  lat: number;
  lon: number;
};

const useWeatherSetting = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentGeoLocation, setCurrentGeoLocation] = useState<GeoLocation>();
  const [temperatureMode, setTemperatureMode] =
    useState<TemperatureType>('celsius');

  const handleInitialCurrentLocation = useCallback(() => {
    setIsLoading(true);
    const onSuccess = (position: GeolocationPosition) => {
      // 位置情報が取得できた時は、最寄りの場所をデフォルトロケーションとする
      setCurrentGeoLocation({
        lat: position?.coords?.latitude,
        lon: position?.coords?.longitude,
      });
      setIsLoading(false);
    };
    const onError = (_err: GeolocationPositionError) => {
      // 位置情報取得ができないときは、東京の緯度経度で取得
      setCurrentGeoLocation({ lat: 35.670479, lon: 139.740921 });
      setIsLoading(false);
    };
    const options: PositionOptions = {
      maximumAge: 30000,
      timeout: 60000,
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  useEffect(() => {
    if (currentGeoLocation) {
      return;
    }
    handleInitialCurrentLocation();
  }, [currentGeoLocation, handleInitialCurrentLocation]);

  const handleSelectLocation = useCallback((location: Location) => {
    setCurrentGeoLocation({ lat: location.lat, lon: location.lon });
  }, []);

  const handleSwitchTemperatureMode = useCallback((mode: TemperatureType) => {
    setTemperatureMode(mode);
  }, []);

  return {
    isLoading,
    currentGeoLocation,
    temperatureMode,
    handleInitialCurrentLocation,
    handleSelectLocation,
    handleSwitchTemperatureMode,
  };
};

export default useWeatherSetting;
