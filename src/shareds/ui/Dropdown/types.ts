import { DropzoneProps } from '@/temporal/Dropzone';
import { MouseEvent } from 'react';
import { DropdownOptionProps } from 'rupor-ui-kit/dist/components/DropdownMenu/DropdownOption/DropdownOption.types';

export type TDropdownOption = DropdownOptionProps & {
  label?: string;
  href?: string;
  key?: string;
  onClick?: (e?: MouseEvent<HTMLElement & HTMLButtonElement>) => void;
  dropzone?: DropzoneProps;
};
