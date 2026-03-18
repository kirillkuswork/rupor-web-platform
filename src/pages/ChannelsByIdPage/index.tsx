import { useEffect } from 'react';

import { SplitPaper, TabsBase } from 'rupor-ui-kit';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useGetChannelByIdQuery } from '@/redux/services/channels';
import { ErrorWrapper } from '@/pages/ChannelsByIdPage/ErrorWrapper';
import { Loader } from '@/shareds';
import { IRequestErrors } from '@/shareds/types/requestError';
import { ChannelHead } from './ChannelHead';
import { TabsContent } from './TabsSection';
import { TabsGroup } from './TabsSection/TabsGroup';

const ChannelsByIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const channelId = String(id);
  const tabName = ('home');
  const { isAuth } = useSelector(selectors.userSelector);
  const {
    data: channel, isLoading, refetch, error,
  } = useGetChannelByIdQuery(channelId);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  // @ts-expect-error ...
  const err = error?.data as IRequestErrors;

  if (isLoading) {
    // TODO запросить скелетон с ui-kit
    return <Loader />;
  }

  return (
    <ErrorWrapper errorData={err}>
      <div className="flex flex-col h-full">
        <SplitPaper.Wrapper>
          <SplitPaper.TopBlock className="!px-0">
            <ChannelHead {...channel} />
          </SplitPaper.TopBlock>
          <SplitPaper.BottomBlock
            data-testid={`channel-page-header-bottom-block_${channelId}`}
            className="py-6 md:!p-4"
          >
            <TabsGroup
              dti="channel-page-header-bottom-block-tab"
              tabName={tabName}
              channelId={channelId}
            />
          </SplitPaper.BottomBlock>
        </SplitPaper.Wrapper>
        <TabsBase.Content data-testid={`channel-page-content-wrapper_${channelId}`} className="!pt-6 md:!pt-4 h-full">
          <TabsContent tabName={tabName} channelId={channelId} />
        </TabsBase.Content>
      </div>
    </ErrorWrapper>
  );
};

export default ChannelsByIdPage;
