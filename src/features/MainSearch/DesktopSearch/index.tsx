import {
  ChangeEvent,
  memo,
  MouseEventHandler,
  useCallback,
  KeyboardEvent,
} from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Input, Popper, SmallSearchIcon } from 'rupor-ui-kit';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { SEARCH_INPUT_MAX_LENGTH } from '@/shareds/constants/restrictions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { headerActions } from '@/redux/actions/headerActions';
import { isNewAuthMode } from '@/shareds/lib/utils/isNewAuthMode';
import { useSendYmMetrics, useAuthModal } from 'rupor-common';
import { DropdownSearch } from '../DropdownSearch';

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  handleClear: MouseEventHandler<HTMLButtonElement>;
};

export const DesktopSearch = memo(
  ({ handleInputChange, inputValue, handleClear }: Props) => {
    const { isAuth } = useSelector(selectors.userSelector);
    const router = useRouter();
    const { t } = useTranslation();
    const { openModal } = useAuthModal();
    const { queryString, isResultsDropdownShown } = useSelector(
      selectors.headerSelector,
    );
    const { sendYmMetric } = useSendYmMetrics();
    const { setIsResultsDropdownShown } = useActions(headerActions);
    const isAuthMode = isNewAuthMode() && !isAuth;
    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.keyCode === 13 && queryString.length > 3) {
        sendYmMetric({ // метрика 2.3.4 	Пользователь нажимает на enter
          event_group: 'event',
          event_category: 'search',
          event_label: 'podtverzhdenie_poiskovogo_zaprosa',
          event_name: 'search-success-podtverzhdenie_poiskovogo_zaprosa',
          event_action: 'success',
        });
        router.push(`${APP_PATHS_PAGES.searchResults}?query=${queryString}`);
        setIsResultsDropdownShown(false);
      }
    };

    const handelOnClick = useCallback(() => {
      sendYmMetric({ // метрика 2.3.3 	Клик по поисковой строке на всех страницах.
        event_group: 'event',
        event_category: 'search',
        event_label: 'poiskovaya_stroka',
        event_name: 'search-element_click-telefon_ili_pochta',
        event_action: 'element_click',
      });
      if (isAuthMode) {
        openModal('login');
      }
    }, [isAuthMode]);

    return (
      <Popper
        isOpen={isResultsDropdownShown}
        onOutsideClick={() => {
          setIsResultsDropdownShown(false);
        }}
        content={<DropdownSearch />}
        style={{
          width: 636,
          zIndex: 80,
        }}
      >
        <div className="max-w-[636px] min-w-[300px] flex-1 relative z-modal" onClick={handelOnClick}>

          {isAuthMode && <div className="absolute inset-0" style={{ zIndex: 100 }} />}

          <Input
            readOnly={isNewAuthMode() && !isAuth}
            data-testid="main-search-input"
            className="max-w-[100%] min-w-[300px] flex-1 relative z-modal"
            wrapperClassName={
              isResultsDropdownShown
                ? 'dark:!bg-white/10 !bg-black/10'
                : 'dark:!bg-shark/80 !bg-white/80 dark:hover:!bg-white/10 hover:!bg-black/10 dark:focus-within:!bg-white/10 focus-within:!bg-black/10'
            }
            prefix={<SmallSearchIcon />}
            allowClear
            defaultValue={router.query?.query as string}
            onChange={handleInputChange}
            onFocus={() => {
              if (queryString.length !== 0) {
                setIsResultsDropdownShown(true);
              }
            }}
            onClear={handleClear}
            onKeyDown={handleKeydown}
            placeholder={t('Search_placeholder') as string}
            value={inputValue}
            maxLength={SEARCH_INPUT_MAX_LENGTH}
          />

        </div>

      </Popper>
    );
  },
);

DesktopSearch.displayName = 'DesktopSearch';
