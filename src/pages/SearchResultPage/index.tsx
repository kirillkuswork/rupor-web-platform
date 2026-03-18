import { VideosResultsTape } from '@/features/VideosResultsTape';
import { VideosResultsTapeWrapper } from '@/features/VideosResultsTape/ui/VideosResultsTapeWrapper';
import {
  memo,
} from 'react';
import { BlockHeaderInner, SplitPaper } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

export const SearchResultPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-[100%]">
      <SplitPaper.Wrapper>
        <SplitPaper.TopBlock className="rounded-b-xl">
          <BlockHeaderInner.Title className="text-headline-s my-9">
            {t('Search_Result_Page_Title')}
          </BlockHeaderInner.Title>
        </SplitPaper.TopBlock>
      </SplitPaper.Wrapper>
      <VideosResultsTapeWrapper>
        <VideosResultsTape />
      </VideosResultsTapeWrapper>
    </div>
  );
};

export default memo(SearchResultPage);
