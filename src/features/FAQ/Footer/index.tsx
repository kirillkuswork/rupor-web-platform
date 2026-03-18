import React, { useCallback, useState } from 'react';

import { BlockHeaderInner, Button } from 'rupor-ui-kit';
import { Paper } from '@/shareds';
import { FAQFormModal } from '@/modals';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const showFAQFormModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const closeFAQFormModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <>
      <Paper className="py-10 mb-6 sm:p-4 sm:mt-4 sm:mb-0 md:mb-0">
        <BlockHeaderInner.Container split className="flex md:flex">
          <BlockHeaderInner.TitleWrapper>
            <BlockHeaderInner.Title className="text-paragraph-xl">
              {t('Footer_Title')}
            </BlockHeaderInner.Title>
          </BlockHeaderInner.TitleWrapper>
          <Button
            onClick={showFAQFormModal}
            className="flex whitespace-nowrap"
            size="small"
          >
            {t('Footer_Support_Button')}
          </Button>
        </BlockHeaderInner.Container>
      </Paper>

      <FAQFormModal onClose={closeFAQFormModal} visible={openModal} />
    </>
  );
};
