import { FC } from 'react';

import { BaseModal } from 'rupor-ui-kit';

import { useTranslation } from 'next-i18next';
import { TDropdownOption } from '../types';
import { Content } from './Content';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  options: TDropdownOption[];
  title?: string;
  subtitle?: string;
};

export const MobileDropdown: FC<Props> = ({
  isOpen,
  onCancel: handleCancel,
  options,
  title = 'Mobile_Dropdown_Default_Title',
  subtitle,
}) => {
  const { t } = useTranslation();

  return (
    <BaseModal.Wrapper
      open={isOpen}
      onClose={handleCancel}
    >
      <BaseModal.Header className="!pb-5">
        <BaseModal.Title dti="mobile-dropdown">
          {t(title)}
        </BaseModal.Title>
        {!!subtitle && (
        <BaseModal.SubTitle>{t(subtitle)}</BaseModal.SubTitle>
        )}
      </BaseModal.Header>
      <BaseModal.Content className="min-w-[min(80vw,356px)] !py-5">
        <div onClick={handleCancel} className="flex flex-col justify-start">
          <Content options={options} onCancel={handleCancel} />
        </div>
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
};
