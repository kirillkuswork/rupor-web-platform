import { FC, memo, ReactNode } from 'react';

import { BaseModal } from 'rupor-ui-kit';

type Props = {
  children?: ReactNode;
};

export const Content: FC<Props> = memo(({ children }) => (
  <BaseModal.Content>{children}</BaseModal.Content>
));

Content.displayName = 'Content';
