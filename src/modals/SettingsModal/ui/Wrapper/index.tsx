import { FC, memo, ReactNode } from 'react';

import clsx from 'clsx';
import { BaseModal } from 'rupor-ui-kit';
import { BaseModalProps } from 'rupor-ui-kit/dist/components/Modal/BaseModal/BaseModal.types';

export type WrapperProps = {
  children: ReactNode;
  ariaLabelledby: string;
  onClose: () => void;
};

export const Wrapper: FC<WrapperProps> = memo(
  ({ children, ariaLabelledby, onClose: handleOnClose }) => (
    <BaseModal.Wrapper
      open
      onClose={handleOnClose}
      ariaLabelledby={ariaLabelledby}
      className={clsx(
        'flex flex-col justify-between md:justify-start',
        'md:h-auto w-[480px] md:w-auto',
      )}
    >
      {children as BaseModalProps['children']}
    </BaseModal.Wrapper>
  ),
);

Wrapper.displayName = 'WrapperRightSide';
