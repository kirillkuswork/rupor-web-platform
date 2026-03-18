import React, { FC } from 'react';
import { SelectedIcon } from 'rupor-ui-kit';

type Props = {
  titleMessage: string;
};

const NotificationSaveInBuffer: FC<Props> = ({ titleMessage }) => (
  <div className="inline-flex items-center text-center">
    <div
      className="flex items-center justify-center w-10 h-10 mr-6 text-black bg-white rounded-full"
    >
      <SelectedIcon />
    </div>
    <span className="text-paragraph-l">
      {titleMessage}
    </span>
  </div>
);

export default React.memo(NotificationSaveInBuffer);
