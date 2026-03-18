/* eslint-disable react-hooks/exhaustive-deps */
import {
  memo,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useActions } from '@/shareds/hooks/useActions';
import { headerActions } from '@/redux/actions/headerActions';
import useDebouncedCallback from '@/shareds/hooks/useDebounceCallback';
import { DesktopSearch } from './DesktopSearch';
import { MobileSearch } from './MobileSearch';

export const MainSearch = () => {
  const {
    isResultsDropdownShown,
    isMobileSearchOpen,
    queryString,
  } = useSelector(selectors.headerSelector);
  const { setIsResultsDropdownShown, setQueryString } = useActions(headerActions);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { isMobile } = useIsMobile();

  const hasData = !!queryString.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleClear = () => {
    setInputValue('');
  };

  useEffect(() => {
    if (hasData && !isResultsDropdownShown) {
      setIsResultsDropdownShown(true);
    }

    if (!hasData) {
      setIsResultsDropdownShown(false);
    }

    setInputValue(queryString);
  }, [queryString, hasData]);

  const debouncedSearch = useDebouncedCallback(() => setQueryString(inputValue), 200);

  useEffect(() => {
    setIsResultsDropdownShown(false);
  }, [router.pathname]);

  const searchProps = {
    handleInputChange,
    inputValue,
    handleClear,
  };

  useEffect(() => {
    debouncedSearch();
  }, [inputValue]);

  return isMobileSearchOpen && isMobile ? (
    <MobileSearch {...searchProps} />
  ) : (
    <DesktopSearch {...searchProps} />
  );
};
export default memo(MainSearch);
