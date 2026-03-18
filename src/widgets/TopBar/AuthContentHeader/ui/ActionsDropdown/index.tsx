/* eslint-disable jsx-a11y/control-has-associated-label */
import useIsMobile from '@/shareds/hooks/useIsMobile';
import {
  useCallback,
  useState,
} from 'react';

import {
  Avatar,
  DownArrowLargeIcon,
  Popper,
} from 'rupor-ui-kit';

import imgProxy from '@/shareds/lib/utils/imgProxy';
import { DesktopOptions } from './Desktop';
import { MobileOptions } from './Mobile';
import { useSendYmMetrics } from 'rupor-common';

type Props = {
  userAvatar?: string;
};

export const ActionsDropdown = ({ userAvatar }: Props) => {
  const [openAvatar, setOpenAvatar] = useState(false);
  const { isMobile } = useIsMobile();
  const { sendYmMetric } = useSendYmMetrics();

  const handleCloseDropdown = useCallback(() => {
    setOpenAvatar(false);
  }, []);

  const handelOnClick = useCallback(() => {
    sendYmMetric({ // метрика 2.4.3 Пользователь нажимает на аватар пользователя/заглушку вместо аватара в хедере.
      event_group: 'event',
      event_category: 'profile',
      event_label: 'profile',
      event_name: 'profile-element_click-profile',
      event_action: 'element_click',
      // event_element_location: 'header', // https://jira.zxz.su/browse/RU-1803
    });
    setOpenAvatar((prevOpen) => !prevOpen);
  }, [setOpenAvatar]);

  return (
    <>
      <Popper
        content={<DesktopOptions onCancel={handleCloseDropdown} />}
        placement="bottom-start"
        isOpen={!isMobile && openAvatar}
        onOutsideClick={handleCloseDropdown}
      >
        <button
          type="button"
          className="flex items-center"
          onClick={handelOnClick}
        >
          <div data-testid="header-avatar-button" className="overflow-hidden">
            <Avatar
              src={imgProxy({ imgUrl: userAvatar })}
              variant="circle"
              size={isMobile ? 40 : 52}
            />
          </div>
        </button>
      </Popper>
      <MobileOptions
        isOpen={isMobile && openAvatar}
        onCancel={handleCloseDropdown}
      />
    </>
  );
};
