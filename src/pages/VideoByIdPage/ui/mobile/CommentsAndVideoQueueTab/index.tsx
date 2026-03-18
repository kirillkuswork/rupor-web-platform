import { useTranslation } from 'next-i18next';
import { TabsBase } from 'rupor-ui-kit';
import { useState } from 'react';
import { IVideo } from '@/redux/services/video/baseModel';
import { VideoQueue } from '@/widgets/VideoQueue';
import { VideoCommentsList } from '../VideoCommentsList';

export type TTabValues = 'comment' | 'videoQueue';

interface ICommentsAndVideoQueueTabProps {
  videoData?: IVideo
  isLoading?: boolean;
}

export const CommentsAndVideoQueueTab = (props: ICommentsAndVideoQueueTabProps) => {
  const { videoData, isLoading } = props;

  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState<TTabValues>('comment');
  const isCommentsEnabled = process.env.NEXT_PUBLIC_MODULE_COMMENTS_ENABLED === 'true';

  const toggleHandler = (value: string) => {
    setSelectedTab(value as TTabValues);
  };

  if (!isCommentsEnabled) return <VideoQueue />;

  return (
    <>
      <TabsBase.Group
        onChange={toggleHandler}
        value={selectedTab}
        className="grid grid-row-1 grid-cols-2"
      >
        <TabsBase.Item
          option="videoSort"
          value="comment"
          className="justify-center"
        >
          {t('Common_comments')}
        </TabsBase.Item>
        <TabsBase.Item
          option="videoSort"
          value="videoQueue"
          className="justify-center"
        >
          {t('Video_Queue')}
        </TabsBase.Item>
      </TabsBase.Group>
      {
        selectedTab === 'comment'
          && <VideoCommentsList videoData={videoData} isLoading={isLoading} />
      }
      {
        selectedTab === 'videoQueue'
          && <VideoQueue />
      }
    </>
  );
};
