import { OdnoklassnikiIcon } from 'rupor-ui-kit';
import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import { ShareItem } from './ShareItem';

interface IShareOKProps {
  videoTitle: string;
  videoImage?: string;
}

export const ShareOK = ({ videoTitle, videoImage }: IShareOKProps) => {
  const videoLink = window.location.href;

  const prepareLink = buildPathWithQueryParams('https://connect.ok.ru/offer', {
    url: videoLink,
    title: videoTitle,
    imageUrl: videoImage,
  });

  return (
    <ShareItem
      dti="share-ok-button"
      link={prepareLink}
      icon={
        <OdnoklassnikiIcon data-testid="share-ok-icon" className="w-8 h-8" />
      }
      name="OK"
    />
  );
};
