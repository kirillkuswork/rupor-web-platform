import imgProxy from '@/shareds/lib/utils/imgProxy';
import React, { FC, useState } from 'react';

import {
  Avatar,
  Button,
  Notification,
} from 'rupor-ui-kit';
import { ISubscribeProps, SubscribePropsType } from './types';

const Subscribe: FC<ISubscribeProps> = React.memo((props) => {
  const [isDisabled, setDisabled] = useState(false);

  const {
    src,
    type,
    title,
    id,
    onClose,
    onSub,
    onUnsub,
    mainText,
    buttonText,
    t,
  } = props;
  const handleClick = () => {
    setDisabled(true);
    if (type === SubscribePropsType.unsubscribe) {
      onSub();
    }
    if (type === SubscribePropsType.subscribe) {
      onUnsub();
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    subscribeNotification({
      ...props,
      type: type === SubscribePropsType.subscribe ? SubscribePropsType.unsubscribe : SubscribePropsType.subscribe,
      mainText: type === SubscribePropsType.subscribe ? t('Subscribe_Notification_Unsubscribe') : t('Subscribe_Notification_Subscribe'),
    });
    onClose();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12">
        <Avatar
          src={imgProxy({ imgUrl: src })}
          size="small"
        />
      </div>
      <div
        data-testid={`channel-subscribe-notification-text_${id}`}
        className="mt-0 mb-0 ml-4 mr-4 w-72 md:w-[calc(100%-180px)] text-paragraph-l-m break-words"
      >
        {mainText}
        {Boolean(title) && (
          <div className="font-semibold text-paragraph-l-m line-clamp-2">
            {` «${title}»`}
          </div>
        )}
      </div>
      <Button
        data-testid={`channel-subscribe-notification-button_${id}`}
        label={buttonText}
        variant="tertiary"
        size="medium"
        onClick={handleClick}
        disabled={isDisabled}
        className="dark:!text-black dark:!border-black/10 hover:dark:!border-black/20"
      />
    </div>
  );
});

Subscribe.displayName = 'Subscribe';

export const subscribeNotification = (props: Omit<ISubscribeProps, 'onClose'>) => {
  const key = Date.now();
  const handleClose = async () => {
    await new Promise((res) => {
      setTimeout(res, 300);
    });
    Notification.close(key);
  };
  Notification.add({
    content: (
      <Subscribe
        {...props}
        onClose={handleClose}
      />
    ),
    key,
    duration: 2000,
  });
};
