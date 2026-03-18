import { DropdownOption, HistoryIcon } from 'rupor-ui-kit';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { IChannelResponse, IPlaylist, IVideo } from '@/redux/services/video/baseModel';
import { useGetVideoSuggestionsQuery } from '@/redux/services/video';
import { useTranslation } from 'next-i18next';
import { DropdownWrapper } from './DropdownWrapper';
import { DropdownSkeleton } from './DropdownSkeleton';
import { DropdownResult } from './DropdownResult';

type Item = IVideo | IChannelResponse | IPlaylist;

type Props = {
  historyItems?: Item[];
};

const NoResults = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center pt-25 pb-25">
      <p className="text-white font-bold mb-2.5 text-paragraph-l">{t('Dropdown_Search_No_Results_Not_Found')}</p>
      <p className="text-center text-grey-light text-paragraph-m-l">
        {t('Dropdown_Search_No_Results_Check_And_Try')}
      </p>
    </div>
  );
};

export const DropdownSearch = ({
  historyItems,
}: Props) => {
  const { queryString } = useSelector(selectors.headerSelector);
  const { data, isError, isLoading } = useGetVideoSuggestionsQuery({ query: queryString, limit: 10 }, { skip: !queryString });
  const { suggestions: videos } = data || {};

  const hasVideos = !!videos?.length;

  const renderResults = () => (
    hasVideos ? (
      <DropdownResult
        items={videos}
        totalItems={10}
      />
    ) : <NoResults />
  );

  const Option = useCallback((item: Item) => (
    <DropdownOption
      optionClassName="!text-paragraph-l-m"
      label={item.title}
      isStatic
      icon={(
        <HistoryIcon
          width={20}
          height={20}
          className="opacity-40"
        />
      )}
    />
  ), []);

  if (isError) {
    return (
      <DropdownWrapper>
        <NoResults />
      </DropdownWrapper>
    );
  }

  if (isLoading) {
    return (
      <DropdownWrapper>
        <DropdownSkeleton />
      </DropdownWrapper>
    );
  }

  const { Element: OptionsList } = arrayRender({
    items: historyItems,
    renderItem: Option,
    listKey: 'title',
  });

  return (
    <DropdownWrapper>
      {videos && (
        <>
          {renderResults()}
        </>
      )}
      <OptionsList />
    </DropdownWrapper>
  );
};
