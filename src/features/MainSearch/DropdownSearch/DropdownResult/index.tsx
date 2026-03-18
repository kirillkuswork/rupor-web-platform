import Link from 'next/link';

import { formatCount, highlightText, textCutter } from 'rupor-ui-kit/dist/utils';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { ArrowUpRightIcon, Button, DropdownOption } from 'rupor-ui-kit';
import { useActions } from '@/shareds/hooks/useActions';
import { headerActions } from '@/redux/actions/headerActions';
import { useCallback } from 'react';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Suggest = any;

type Props = {
  items: Suggest[],
  totalItems: number,
};

export const DropdownResult = ({
  items,
  totalItems,
}: Props) => {
  const { t } = useTranslation();
  const { queryString } = useSelector(selectors.headerSelector);
  const { setQueryString } = useActions(headerActions);
  const { setIsMobileSearchOpen, setIsResultsDropdownShown } = useActions(headerActions);

  const handleSearchClose = () => {
    setIsMobileSearchOpen(false);
    setIsResultsDropdownShown(false);
  };

  const Option = useCallback((item: Suggest) => (
    <Link
      href={`${APP_PATHS_PAGES.searchResults}?query=${item.text}`}
      passHref
    >
      <DropdownOption
        optionClassName="!text-paragraph-l-m !text-white/40"
        onClick={() => {
          setQueryString(item.text || '');
          handleSearchClose();
        }}
        color="#FFF"
        icon={(
          <ArrowUpRightIcon
            width={20}
            height={20}
            color="#FFF"
            className="mr-2 opacity-40"
          />
              )}
        label={highlightText(queryString, textCutter(item.text || '', 60), 'white')}
      />
    </Link>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [handleSearchClose, queryString]);

  const { Element: OptionsList } = arrayRender({
    items,
    listKey: 'text',
    renderItem: Option,
  });

  return (
    <>
      <OptionsList />
      {
        totalItems > 10 && (
          <div className="p-3">
            <Link
              href={`${APP_PATHS_PAGES.searchResults}?query=${queryString}`}
              passHref
            >
              <Button
                variant="secondary"
                fullWidth
                onClick={handleSearchClose}
                isStatic
              >
                {t('Dropdown_Result_Show_More', { items: formatCount(totalItems, [t('Dropdown_Result_Show_More_Option_1'), t('Dropdown_Result_Show_More_Option_2'), t('Dropdown_Result_Show_More_Option_3')]) })}
              </Button>
            </Link>
          </div>
        )
      }
    </>
  );
};
