import { EmptyContainer } from '@/shareds';
import Link from 'next/link';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useState } from 'react';
import { Button, Paper } from 'rupor-ui-kit/dist';
import { useTranslation } from 'next-i18next';

interface IAgeRatingPlugProps {
  onAdultHandler: () => void
  thumbnailUrl?: string
}

export const AgeRatingPlug = ({ onAdultHandler, thumbnailUrl }: IAgeRatingPlugProps) => {
  const [isShowAgeStub, setIsShowAgeStub] = useState(false);
  const { t } = useTranslation();

  const setIsAdult = () => {
    // Проставить в ls стейт
    onAdultHandler();
  };

  const button = (
    isShowAgeStub
      ? (
        <div className="flex justify-center mt-2 w-80">
          <Link href={APP_PATHS_PAGES.home} passHref>
            <Button label={t('Age_Rating_Plug_Button_Main')} />
          </Link>
        </div>
      )
      : (
        <div className="flex justify-between mt-2 w-80">
          <Button
            onClick={() => setIsShowAgeStub(true)}
            variant="secondary"
            label={t('Age_Rating_Plug_Button_Small')}
          />
          <Button label={t('Age_Rating_Plug_Button_Already_Big')} onClick={() => setIsAdult()} />
        </div>
      )
  );

  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${thumbnailUrl})` }}
    >
      <Paper className="h-full w-full" theme="blur">
        <EmptyContainer
          text={t('Age_Rating_Plug_Empty_Container_Text')}
          subtitleText={t('Age_Rating_Plug_Empty_Container_Subtitle_Text')}
          button={button}
        />
      </Paper>
    </div>
  );
};
