import React from 'react';
import {
  SettingsModalType,
  useSettingsModal,
} from '@/app/providers/SettingsProvider';

import { ChangeEmail } from './ChangeEmail';
import { useSettingsModalInfo } from './hooks/useSettingsModalInfo';
import { Header, Wrapper } from './ui';
import { ChangePassword } from './ChangePassword';
import { Otp } from './Otp';
import { Information } from './Information';
import { ChangeAvatar } from './ChangeAvatar';

const modalComponents: Record<
Exclude<SettingsModalType, null>,
React.ComponentType
> = {
  password: ChangePassword,
  email: ChangeEmail,
  otp: Otp,
  information: Information,
  avatar: ChangeAvatar,
};

export const SettingsModal = () => {
  const { modalInfo } = useSettingsModalInfo();

  const { currentModal, closeModal } = useSettingsModal();

  if (!currentModal) return null;

  const ModalContent = modalComponents[currentModal];

  return (
    <Wrapper onClose={closeModal} ariaLabelledby={modalInfo[currentModal].title}>
      <Header {...modalInfo[currentModal]}>
        <ModalContent />
      </Header>
    </Wrapper>
  );
};
