import { FC, memo, ReactNode } from 'react';

import { BaseModal } from 'rupor-ui-kit';
import { BaseModalProps } from 'rupor-ui-kit/dist/components/Modal/BaseModal/BaseModal.types';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
  titleDti?: string;
  descriptionDti?: string;
  descriptionClassName?: string;
};

export const Header: FC<Props> = memo(({
  children, title, description, titleDti, descriptionDti, descriptionClassName,
}) => (
  <BaseModal.Header className={clsx(description ? '!gap-3' : '!gap-0')}>
    <BaseModal.Title dti={titleDti}>{title}</BaseModal.Title>
    {description && (
      <BaseModal.SubTitle className={descriptionClassName} data-testid={descriptionDti}>
        {description}
      </BaseModal.SubTitle>
    )}

    {children as BaseModalProps['children']}
  </BaseModal.Header>
));

Header.displayName = 'Header';
