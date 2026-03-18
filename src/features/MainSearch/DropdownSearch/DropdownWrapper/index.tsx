import { DropdownPaper } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import clsx from 'clsx';

type Props = {
  children?: any;
};

export const DropdownWrapper = ({
  children,
}: Props) => {
  const { isMobile } = useIsMobile();
  return (
  // 75px - высота header, временный фикс, надо дропдаун с поиском перенести в один компонент
    <DropdownPaper id="search" className={clsx('!bg-[#333437] max-w-[636px] my-0 mx-auto !rounded-b', isMobile && 'top-[75px]')}>
      {children}
    </DropdownPaper>
  );
};
