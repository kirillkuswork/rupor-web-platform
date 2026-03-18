import React, { FC, memo } from 'react';

import { EyeCloseIcon, EyeIcon } from 'rupor-ui-kit';

type Props = {
  onClick?: () => void;
  showPassword: boolean;
};

export const SwitchPasswordVisibility: FC<Props> = memo(
  ({ onClick, showPassword }) => (
    <span onClick={onClick} className="cursor-pointer">
      {showPassword ? (
        <EyeCloseIcon className="text-white/40 hover:text-white" />
      ) : (
        <EyeIcon className="text-white/40 hover:text-white" />
      )}
    </span>
  ),
);

SwitchPasswordVisibility.displayName = 'SwitchPasswordVisibility';
