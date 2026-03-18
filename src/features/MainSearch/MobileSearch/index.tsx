/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/display-name */
import {
  ChangeEvent, memo, MouseEventHandler, useCallback,
} from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  Input, LeftArrowIcon, MobileSearch as KitMobileSearch, Overlay, SmallSearchIcon,
} from 'rupor-ui-kit';
import { useActions } from '@/shareds/hooks/useActions';
import { headerActions } from '@/redux/actions/headerActions';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { SEARCH_INPUT_MAX_LENGTH } from '@/shareds/constants/restrictions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { DropdownSearch } from '../DropdownSearch';
import { useSendYmMetrics } from 'rupor-common';

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  handleClear: MouseEventHandler<HTMLButtonElement>;
};

export const MobileSearchWrapper = memo(({
  handleInputChange,
  inputValue,
  handleClear,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { queryString, isResultsDropdownShown } = useSelector(selectors.headerSelector);
  const { setIsMobileSearchOpen, setIsResultsDropdownShown } = useActions(headerActions);

  const handleSearchClose = useCallback(() => {
    setIsResultsDropdownShown(false);
    setIsMobileSearchOpen(false);
  }, [setIsMobileSearchOpen, setIsResultsDropdownShown]);

  const hasData = queryString.length !== 0;

  const { sendYmMetric } = useSendYmMetrics();

  const handleInputFocus = () => {
    /*sendYmMetric({ // метрика 2.3.3 	Клик по поисковой строке на всех страницах.
      event_group: 'event',
      event_category: 'search',
      event_label: 'poiskovaya_stroka',
      event_name: 'search-element_click-telefon_ili_pochta',
      event_action: 'element_click',
    }); */
    if (hasData) {
      setIsResultsDropdownShown(true);
    }
  };
  const handleKeydown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      handleSearchClose();
    }
    if (event.key === 'Enter' && queryString.length > 3) {
      sendYmMetric({ // метрика 2.3.4 	Пользователь нажимает на enter 
        event_group: 'event',
        event_category: 'search',
        event_label: 'podtverzhdenie_poiskovogo_zaprosa',
        event_name: 'search-success-podtverzhdenie_poiskovogo_zaprosa',
        event_action: 'success',
      }); 
      router.push(`${APP_PATHS_PAGES.searchResults}?query=${queryString}`);
      handleSearchClose();
    }
  }, [handleSearchClose, queryString, router]);

  return (
    <>
      <KitMobileSearch.Container onOutsideClick={handleSearchClose}>
        <KitMobileSearch.Wrapper>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSearchClose}
              className="pr-4 text-black/40 dark:text-white/40 hover:dark:text-white hover:text-black"
            >
              <LeftArrowIcon />
            </button>
            <Input
              className="max-w-[596px] min-w-[318px] w-full"
              wrapperClassName={isResultsDropdownShown
                ? 'dark:!bg-white/10 !bg-black/10'
                : 'dark:!bg-[#ffffff12] dark:hover:!bg-white/10 hover:!bg-black/10 dark:focus-within:!bg-white/10 focus-within:!bg-black/10'}
              onChange={handleInputChange}
              allowClear
              prefix={!inputValue && <SmallSearchIcon />}
              defaultValue={router.query?.query as string}
              onFocus={handleInputFocus}
              onClear={handleClear}
              onKeyDown={handleKeydown}
              placeholder={t('Search_placeholder') as string}
              value={inputValue}
              maxLength={SEARCH_INPUT_MAX_LENGTH}
              enterKeyHint="search"
            />
          </div>
        </KitMobileSearch.Wrapper>
      </KitMobileSearch.Container>
      {
        isResultsDropdownShown && (
          <DropdownSearch />
        )
      }
    </>
  );
});

export const MobileSearch = memo((props: Props) => (
  <Overlay>
    <MobileSearchWrapper {...props} />
  </Overlay>
));
