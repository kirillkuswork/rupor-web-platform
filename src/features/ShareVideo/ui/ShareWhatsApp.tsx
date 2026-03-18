import { WhatsAppIcon } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { ShareItem } from './ShareItem';

export const ShareWhatsApp = () => {
  const { isMobile } = useIsMobile();
  const videoLink = window.location.href;

  const prepareLink = isMobile
    ? `https://wa.me/?text=${videoLink}`
    : `https://api.whatsapp.com://send?text=${videoLink}`;

  return <ShareItem dti="share-whatsup-button" link={prepareLink} icon={<WhatsAppIcon data-testid="share-whatsup-icon" className="w-8 h-8" />} name="WhatsApp" />;
};
