import { selectors } from '@/redux/selectors';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import useIsMobile from '@/shareds/hooks/useIsMobile';

export const Wrapper = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { isLeftMenuThin } = useSelector(selectors.headerSelector);
  const { isMobile } = useIsMobile();
  return (
    <header
      className={clsx(
        className,
        'RuiHeader',
        isMobile ? 'h-header-height-mobile' : 'h-header-height',
        'bg-dynamic-primary flex items-center',
        'fixed top-0',
        // 'left-navbar-width',
      )}
      {...props}
    />
  );
};

export const Search = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => <div className={`${className} w-full flex-1`} {...props} />;

export const Icons = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => <div className={`${className} flex items-center`} {...props} />;

export const Header = {
  Wrapper,
  Search,
  Icons,
};
