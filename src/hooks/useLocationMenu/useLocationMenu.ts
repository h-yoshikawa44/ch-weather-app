import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { HTTPError } from 'ky-universal';
import { Locations } from '@/models/Location';
import { breakPoint } from '@/styles/constants';
import getLocations from '@/domains/getLocations';

const emptyQueryMessageText = 'Please enter at least one alphabetic character.';
const httpErrorMessageText =
  'Sorry, Failed to obtain location information. Please take some time and try again.';
const errorMessageText = 'Unexpected data was retrieved.';

const useLocationMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [inertFlg, setInertFlg] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [locations, setLocations] = useState<Locations>();

  // モバイルサイズの時だけ inert を有効化したい部分があるので、その判定
  const inertCheck = useCallback(() => {
    if (open && window.innerWidth < breakPoint.md) {
      document.body.style.overflowY = 'hidden';
      setInertFlg(true);
      return;
    }
    document.body.style.overflowY = '';
    setInertFlg(false);
  }, [open]);

  // メニュー開閉時と画面リサイズ時に inert 判定をするように
  useEffect(() => {
    window.addEventListener('resize', inertCheck);
    inertCheck();
  }, [open, inertCheck]);

  const handleLocationMenuOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleLocationMenuClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChangeSearchQuery = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );

  const handleSearchLocation = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!query) {
        setErrorMessage(emptyQueryMessageText);
        return;
      }

      setIsLoading(true);
      getLocations({ searchParams: { q: query, limit: 5 } })
        .then((data) => {
          setLocations(data);
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
    },
    [query],
  );

  return {
    open,
    inertFlg,
    query,
    isLoading,
    errorMessage,
    locations,
    handleLocationMenuOpen,
    handleLocationMenuClose,
    handleChangeSearchQuery,
    handleSearchLocation,
  };
};

export default useLocationMenu;
