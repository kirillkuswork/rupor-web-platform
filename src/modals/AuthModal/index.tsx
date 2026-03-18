import React, { useCallback, useEffect } from 'react';
import { AuthModalType, useAuthModal } from '@/providers/AuthModalProvider';
import { useSendYmMetrics } from 'rupor-common';
import { useAuthModalInfo } from './hooks/useAuthModalInfo';
import {
  Information, Login, Otp, Password, Recovery, Registration,
} from './Content';
import { Header, Wrapper } from './ui';

const modalComponents: Record<
Exclude<AuthModalType, null>,
React.ComponentType
> = {
  login: Login,
  registration: Registration,
  otp: Otp,
  information: Information,
  recovery: Recovery,
  password: Password,
};

export const AuthModal = () => {
  const { modalInfo } = useAuthModalInfo();

  const { currentModal, modalParams, closeModal } = useAuthModal();

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnClose = useCallback(() => {
    if (currentModal === 'login') {
      sendYmMetric({ // метрика 2.2.5 Пользователь нажимает на Крестик закрытия экрана авторизации
        event_group: 'event',
        event_category: 'auth',
        event_label: 'zakryt',
        event_name: 'auth-element_click-zakryt',
        event_action: 'element_click',
        event_element_location: 'popup',
      });
    } else if (currentModal === 'registration') {
      if (modalParams.type === 'registrationConfirmationInfo') {
        sendYmMetric({ // не отправляется т к окно само закрывается, из документации метрика удалена
          event_group: 'event',
          event_category: 'reg',
          event_label: 'akkaunt_sozdan',
          event_name: 'reg-element_click-akkaunt_sozdan',
          event_action: 'element_click',
          event_context: 'zakryt',
          event_element_location: 'popup',
        });
      } else {
        sendYmMetric({ // метрика 2.2.11 Пользователь нажимает на крестик для закрытия шторки регистрации
          event_group: 'event',
          event_category: 'reg',
          event_label: 'zakryt',
          event_name: 'reg-element_click-zakryt',
          event_action: 'element_click',
          event_element_location: 'popup',
        });
      }
    }
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    console.log("!!!!!%%%%% HELLO AuthModal %%%%",currentModal);
    if (currentModal == 'login') {
      sendYmMetric({ // метрика 2.2.4 Нажимает на кнопку Войти и система отображает шторку авторизации
        // Нажимает на карточку видео для воспроизведения, и система определяет пользователя как неавторизованного
        // Нажимает на поисковую строку, и система определяет пользователя как неавторизованного
        // Нажимает на карточку видео для воспроизведения, и система определяет пользователя как неавторизованного
        // Нажимает на любое действие в кебаб меню у карточки видео, и система определяет пользователя как неавторизованного
        // Нажимает на кнопку Авторизоваться в заглушках 
        event_group: 'event',
        event_category: 'auth',
        event_label: 'avtorizaciya',
        event_name: 'auth-element_show-voiti',
        event_action: 'element_show',
        event_element_location: 'popup',
      });
  }
  }, [currentModal]);

  if (!currentModal) return null;

  const ModalContent = modalComponents[currentModal];

  return (
    <Wrapper onClose={handelOnClose} ariaLabelledby={modalInfo[currentModal].title}>
      <Header {...modalInfo[currentModal]} descriptionClassName="text-wrap break-all">
        <ModalContent />
      </Header>
    </Wrapper>
  );
};
