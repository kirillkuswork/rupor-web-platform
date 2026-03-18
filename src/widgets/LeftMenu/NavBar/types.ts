import { ReactNode } from 'react';

export interface NavBarMainProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  /**
  * @deprecated передевайте свойство thinAside в MainLayout.Page
  */
  thin?: boolean;
}

export interface NavBarItemProps {
  icon?: ReactNode;
  postFix?: ReactNode;
  label: ReactNode;
  labelClassName?: string;
  selected?: boolean;
  disabled?: boolean;
}
