import { DesktopDropdown } from '@/shareds/ui/Dropdown';
import { useGetDropdownOptions } from '../../../model/hooks/useGetDropdownOptions';

type Props = {
  onCancel: () => void;
};

export const DesktopOptions = ({ onCancel: handleCancel }: Props) => {
  const options = useGetDropdownOptions({ onCancel: handleCancel });

  return (
    <DesktopDropdown
      dti="header-dropdown-option"
      options={options}
      onCancel={handleCancel}
    />
  );
};
