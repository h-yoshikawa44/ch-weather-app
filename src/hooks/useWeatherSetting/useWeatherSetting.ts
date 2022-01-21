import { useState, useEffect, useCallback } from 'react';
import { Location } from '@/models/Location';
import { TemperatureType } from '@/models/Weather';
import getLocations, { QueryParams } from '@/domains/getLocations';

type CurrentLocation = {
  name: string;
  woeId: number;
};

const useWeatherSetting = () => {
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>();
  const [temperatureMode, setTemperatureMode] =
    useState<TemperatureType>('celsius');

  useEffect(() => {
    const onSuccess = async (position: GeolocationPosition) => {
      // 位置情報が取得できた時は、最寄りの場所をデフォルトロケーションとする
      const searchParams: QueryParams = {
        lattlong: `${position?.coords?.latitude},${position?.coords?.longitude}`,
      };
      const locations = await getLocations('inner', { searchParams });
      setCurrentLocation({
        name: locations[0].title,
        woeId: locations[0].woeid,
      });
    };
    const onError = async (err: GeolocationPositionError) => {
      // 位置情報取得ができないときは、東京の緯度経度で取得
      const searchParams: QueryParams = {
        lattlong: '35.670479, 139.740921',
      };
      const locations = await getLocations('inner', { searchParams });
      setCurrentLocation({
        name: locations[0].title,
        woeId: locations[0].woeid,
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
    currentLocation,
    temperatureMode,
    handleSelectLocation,
    handleSwitchTemperatureMode,
  };
};

export default useWeatherSetting;
