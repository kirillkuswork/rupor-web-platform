import React, { memo } from 'react';

import { Tooltip, PenIcon } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

export const EditPen = memo(() => {
  const { t } = useTranslation();

  return (
    <Tooltip content={t('Edit_Pen_Tooltip')} theme="dark">
      <div>
        <PenIcon className="text-white/40 hover:text-white" />
      </div>
    </Tooltip>
  );
});

EditPen.displayName = 'EditPen';
