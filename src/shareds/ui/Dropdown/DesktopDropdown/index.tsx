/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';

import { DropdownHeader, DropdownPaper } from 'rupor-ui-kit';
import { Content } from './Content';
import { TDropdownOption } from '../types';

type Props = {
  options: TDropdownOption[];
  // TODO переделать any
  title?: any;
  onCancel?: () => void;
  dti?: string;
};

export const DesktopDropdown: FC<Props> = ({
  options,
  title,
  onCancel: handleCancel,
  dti,
}) => (
  <DropdownPaper data-testid={dti}>
    {!!title && <DropdownHeader>{title}</DropdownHeader>}
    <Content options={options} onCancel={handleCancel} />
  </DropdownPaper>
);
