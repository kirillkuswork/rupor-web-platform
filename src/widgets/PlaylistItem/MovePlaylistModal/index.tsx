import React, { FC } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import {
  Button, CloseIcon, Modal, PlusIcon,
} from 'rupor-ui-kit';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const playListCards = [
  { title: 'History_Ancient_World', src: 'https://cdn-prototype-content.rupor.media/maxresdefault_83e442e078.jpg' },
  { title: 'History_Ancient_World', src: 'https://cdn-prototype-content.rupor.media/maxresdefault_83e442e078.jpg' },
  { title: 'History_Ancient_World', src: 'https://cdn-prototype-content.rupor.media/maxresdefault_83e442e078.jpg' },
];

export const MovePlaylistModal: FC<Props> = React.memo(({ isOpen, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      ariaLabelledby={t('Move_Playlist_Modal_Label')}
      onClose={handleClose}
      open={isOpen}
    >
      <div className="box-border pt-3 pb-6 pl-6 pr-3 bg-black-old w-[502px]">
        <div className="flex justify-between">
          <div className="mx-0 mt-4 mb-2">{t('Move_Playlist_Modal_Select_Playlist')}</div>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="mb-12 text-grey">
          {t('Move_Playlist_Modal_Save_Same')}
        </div>
        <div className="flex max-w-[400px] mt-9">
          <Button
            variant="tertiary"
            label={<PlusIcon />}
            onClick={() => { }}
          />
          <p className="paragraph-l-m">
            {t('Playlist_Create_Button_Title')}
          </p>
        </div>
        {playListCards.map((item) => (
          <div className="flex max-w-[400px] mt-8" key={item.title}>
            <Image
              src={item.src}
              alt="icon"
              key={t(item.title)}
              className="rounded-2xl max-w-[80px] max-h-[48px] w-full object-cover object-center"
            />
            <p className="paragraph-l-m">{item.title}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
});

MovePlaylistModal.displayName = 'MovePlaylistModal';
