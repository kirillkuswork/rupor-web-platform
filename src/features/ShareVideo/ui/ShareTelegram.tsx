import { TelegramIcon } from 'rupor-ui-kit';
import { ShareItem } from './ShareItem';

interface IShareTelegramProps {
  videoTitle: string;
}

export const ShareTelegram = ({ videoTitle }: IShareTelegramProps) => {
  const videoLink = window.location.href;

  const prepareLink = `https://t.me/share/url?url=${videoLink}&text=${videoTitle}`;

  return (
    <ShareItem
      dti="share-telegram-button"
      link={prepareLink}
      icon={
        <TelegramIcon data-testid="share-telegram-icon" className="w-8 h-8" />
      }
      name="Telegram"
    />
  );
};
