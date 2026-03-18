import { FC } from 'react';
import { MobileDropdown } from '@/shareds/ui/Dropdown';
import { useGetDropdownOptions } from '../../../model/hooks/useGetDropdownOptions';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

export const MobileOptions: FC<Props> = ({
  isOpen,
  onCancel: handleCancel,
}) => {
  const options = useGetDropdownOptions({ onCancel: handleCancel });

  return (
    <MobileDropdown
      options={options}
      onCancel={handleCancel}
      isOpen={isOpen}
    />
  );
};
