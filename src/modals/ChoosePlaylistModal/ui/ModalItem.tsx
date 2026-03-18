import clsx from 'clsx';
import { ReactNode } from 'react';
import { HFlex } from '@/shareds/ui/Flex';

interface IModelItemProps {
  title: ReactNode
  icon?: JSX.Element
  onClick?: () => void
}

export const ModalItem = (props: IModelItemProps) => {
  const { title, icon, onClick } = props;

  return (
    <div
      className={clsx('bg-white/2.5 cursor-pointer py-[21px] px-4 mb-4 last:mb-0 rounded')}
      onClick={onClick}
    >
      <HFlex justify="between">
        <div
          className="text-paragraph-l-m truncate ..."
        >
          {title}

        </div>

        {icon && (
        <div
          role="button"
        >
          {icon}
        </div>
        )}
      </HFlex>
    </div>
  );
};
