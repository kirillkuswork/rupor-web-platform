/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable max-len */
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import clsx from 'clsx';
import { RemoveScroll } from 'react-remove-scroll';

import { Overlay, RuporLogoIcon } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { wordCutter } from '@/shareds/lib/utils/wordCutter';
import { NavBarItemProps, NavBarMainProps } from './types';

export const Main = ({
  children, isOpen, onClose,
}: NavBarMainProps) => {
  const { isMobile } = useIsMobile();

  return (
    <RemoveScroll allowPinchZoom enabled={isOpen && isMobile}>
      {children}
      {(isMobile && isOpen) && <Overlay className="!z-[5]" onClick={onClose} />}
    </RemoveScroll>
  );
};

export const Container = ({
  className = '', children, ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { isLeftMenuOpen: isOpen } = useSelector(selectors.headerSelector);
  const { isLeftMenuThin } = useSelector(selectors.headerSelector);
  const { isMobile } = useIsMobile();

  return (
    <aside
      className={clsx(
        className,
        isMobile ? 'pt-header-height-mobile' : 'pt-header-height',
        'bg-dynamic-primary fixed z-10 left-0 top-0 h-full md:duration-200 box-border',
        isLeftMenuThin ? 'w-navbar-thin-width' : 'w-navbar-width',
        !isOpen && 'md:-translate-x-full md:invisible',
        'md:w-navbar-mobile-width',
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

export const Logo = ({ className = '', studio, ...props }: HTMLAttributes<HTMLDivElement> & { studio?: boolean }) => (
  <div
    className="fixed left-[20px] top-[20px] md:top-[22px] md:left-[56px] z-20 w-[32px] h-[32px] md:w-[28px] md:h-[28px] cursor-pointer"
    {...props}
  >
    <div className={`${className} relative z-10 bg-red primary-btn-double-bg text-white w-full h-full squircle flex items-center justify-center`}>
      <RuporLogoIcon
        className="w-[37.5%] h-[56.25%] ml-[7%]"
      />
    </div>
    <div className="absolute-center z-0 w-[22px] h-[22px] shadow-red/90 shadow-[0_0_36px_0]" />
  </div>
);

export const Section = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <section
    className={`${className}
    after:mx-6 after:my-3 after:h-[1px] after:block md:after:my-4 md:after:mx-4
    after:dark:bg-white/5 after:bg-black/5 first-of-type:pt-3 md:first-of-type:pt-4 last-of-type:after:hidden`}
    {...props}
  />
);

export const Wrapper = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <nav
    className={clsx(
      className,
      'scrollbar overflow-y-auto overflow-x-hidden overscroll-y-contain flex flex-col h-full',
    )}
    {...props}
  />
);

export const BurgerButton = ({
  className = '', ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { isLeftMenuOpen: isOpen } = useSelector(selectors.headerSelector);
  const { isMobile } = useIsMobile();

  return (
    <>
      {isMobile && (
        <button
          className={clsx(className, 'flex items-center justify-center')}
          type="button"
          {...props}
        >
          <div className="w-[18px] h-[18px] grid grid-flow-row gap-[5px] justify-center">
            <div className={clsx('transition-all h-[2px]', isOpen ? '-rotate-50 translate-y-[5px] rounded-[1px] w-[8px] dark:bg-white bg-black' : 'dark:bg-white/40 bg-black/40 rotate-0 w-[18px]')} />
            <div className={clsx('transition-all w-[11px] h-[2px] dark:bg-white/40 bg-black/40', isOpen ? 'opacity-0' : 'opacity-100')} />
            <div className={clsx('transition-all h-[2px]', isOpen ? 'rotate-50 -translate-y-[4px] rounded-[1px] w-[8px] dark:bg-white bg-black' : 'dark:bg-white/40 bg-black/40 rotate-0 w-[14px]')} />
          </div>
        </button>
      )}
    </>
  );
};

export const Item = ({
  className = '',
  icon,
  label,
  labelClassName,
  selected,
  postFix,
  disabled,
  ...props
}: HTMLAttributes<HTMLDivElement> & NavBarItemProps) => {
  const { isMobile } = useIsMobile();
  const { isLeftMenuThin } = useSelector(selectors.headerSelector);

  const isThinDesktop = isLeftMenuThin && !isMobile;

  return (
    <div
      className={clsx(
        disabled && 'dark:text-white/40 text-black/40 pointer-events-none',
        className,
        'flex items-center cursor-pointer duration-200 transition-colors py-3',
        isLeftMenuThin ? 'flex-col text-paragraph-s px-2' : 'text-paragraph-m-s px-6 mr-1',
        selected ? 'cl-dynamic-interface-primary' : 'dark:text-white/40 text-black/40',
        'dark:hover:text-white hover:text-black',
        // mobile
        'md:py-2 md:px-4 md:text-paragraph-m-s md:flex-row',
      )}
      {...props}
    >
      {icon && (
        <span className={clsx(
          'shrink-0 md:mr-4',
          !isLeftMenuThin && 'mr-2.5',
        )}
        >
          {icon}
        </span>
      )}
      <span className={clsx(
        labelClassName,
        'font-normal md:pr-4 grow block overflow-hidden text-ellipsis',
        isLeftMenuThin ? 'text-center md:text-left' : 'pr-2.5',
      )}
      >
        {(typeof label === 'string' && isThinDesktop) ? wordCutter(label) : label}
      </span>
      {postFix}
    </div>
  );
};

export const ChannelWrapper = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${className} grid grid-cols-1 gap-4 items-center justify-items-center px-6 py-2 md:px-4 md:-mt-3`}
    {...props}
  />
);

export const Title = ({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    className={`${className} m-0 text-center font-semibold text-paragraph-l cl-dynamic-interface-primary`}
    {...props}
  />
);

export const SectionTitle = ({
  className = '',
  icon,
  label,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & Pick<NavBarItemProps, 'icon' | 'label'>) => (
  <h4
    className={`${className} group
    cursor-pointer px-6 md:px-4 m-0 md:gap-4 gap-2.5
    grid grid-cols-[auto_1fr] text-paragraph-m-l font-bold
    cl-dynamic-primary`}
    {...props}
  >
    <span className="dark:text-white/40 text-black/40 group-hover:text-black dark:group-hover:text-white duration-200">
      {icon}
    </span>
    {label}
  </h4>
);

export const NavBar = {
  Main,
  Container,
  Logo,
  Section,
  Wrapper,
  BurgerButton,
  Item,
  ChannelWrapper,
  Title,
  SectionTitle,
};
