import { IChannel } from '@/redux/services/channels/responseModel';

export const transformChannelProps = (channel?: IChannel) => {
  if (!channel) return null;
  return {
    channelId: channel.id,
    subscribersCount: channel.subscribers,
    ...channel,
  };
};
