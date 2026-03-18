import { Paper as BasePaper } from 'rupor-ui-kit';
import { PaperProps } from 'rupor-ui-kit/dist/components/Paper/Paper.types';
import { FC } from 'react';

export const Paper: FC<PaperProps> = ({ children, className = '', ...props }) => (
  <BasePaper className={`${className} p-6 mb-6`} {...props}>
    {children}
  </BasePaper>
);
