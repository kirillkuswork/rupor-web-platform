import { ShareItem } from '@/features/ShareVideo/ui/ShareItem';
import { VKIcon } from 'rupor-ui-kit';

export const ShareVK = () => {
  const videoLink = window.location.href;
  const prepareLink = `https://vk.com/share.php?url=${videoLink}`;

  return <ShareItem dti="share-vk-button" link={prepareLink} icon={<VKIcon data-testid="share-vk-icon" className="w-8 h-8" />} name="VK" />;
};
