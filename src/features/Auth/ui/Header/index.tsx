import { FC, memo, ReactNode } from 'react';

import { BaseModal } from 'rupor-ui-kit';
import { BaseModalProps } from 'rupor-ui-kit/dist/components/Modal/BaseModal/BaseModal.types';

type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
  titleDti?: string;
  descriptionDti?: string;
};

export const Header: FC<Props> = memo(({
  children, title, description, titleDti, descriptionDti,
}) => (
  <BaseModal.Header>
    <BaseModal.Title dti={titleDti}>{title}</BaseModal.Title>
    {description && (
      <BaseModal.SubTitle data-testid={descriptionDti}>
        {description}
      </BaseModal.SubTitle>
    )}

    {children as BaseModalProps['children']}
  </BaseModal.Header>
));

Header.displayName = 'Header';
