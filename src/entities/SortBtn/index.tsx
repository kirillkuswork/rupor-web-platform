import {
  cloneElement,
  FC, useCallback,
  useMemo,
  useState,
} from 'react';

import { DropdownMenu, SortIcon } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import {
  SortingObjectType, SortType, VideoCommentsSortDirection,
} from '@/shareds/types/sortTypes';
import { DesktopDropdown, MobileDropdown } from '@/shareds/ui/Dropdown';
import { useTranslation } from 'next-i18next';

type Props = {
  onClick: (type: Option['value']) => void;
  options?: Option[];
  dropDownIcon?: JSX.Element;
  value?: SortType;
  dti?: string;
};

export type Option = {
  label: string;
  value: SortingObjectType['value'];
  icon?: JSX.Element;
  onClick?: () => void;
  selected?: boolean;
};

export const byNew: Option = {
  label: 'Sort_Btn_Option_Label_New',
  value: VideoCommentsSortDirection.CreatedAtDesc,
};

export const byOld: Option = {
  label: 'Sort_Btn_Option_Label_Old',
  value: VideoCommentsSortDirection.CreatedAtAsc,
};

const defaultOptions: Option[] = [byNew, byOld];

export const SortBtn: FC<Props> = ({
  onClick: onSelect,
  options = defaultOptions,
  dropDownIcon = <SortIcon />,
  value = defaultOptions[0].value,
  dti,
}) => {
  const [selectedValue, setSortValue] = useState<Option['value']>(value);
  const [isOpen, setOpen] = useState(false);
  const { isMobile } = useIsMobile();
  const { t } = useTranslation();
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? options[0],
    [options, selectedValue],
  );

  const desktopIcon = cloneElement(dropDownIcon, { style: selectedValue === VideoCommentsSortDirection.CreatedAtAsc && { rotate: '180deg' } }) ?? selectedOption.icon;

  const handleToggleSortType = useCallback((optionValue: Option['value']) => {
    setSortValue(optionValue);
    onSelect(optionValue);
  }, [onSelect]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleSortTypeAndClose = useCallback((optionValue: Option['value']) => {
    handleToggleSortType(optionValue);
    handleClose();
  }, [handleClose, handleToggleSortType]);

  const mobileOptions = useMemo(
    () => options.map((option) => ({
      ...option,
      onClick: () => toggleSortTypeAndClose(option.value),
    })),
    [options, toggleSortTypeAndClose],
  );

  const desktopOptions = useMemo(
    () => options.map((option) => ({
      ...option,
      selected: option.value === selectedValue,
    })),
    [options, selectedValue],
  );

  return isMobile ? (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="!p-0 flex dark:text-white/40 text-black/40 text-paragraph-m-s"
      >
        <div className={`${selectedValue === VideoCommentsSortDirection.CreatedAtAsc && 'rotate-180'} mr-2`}>
          {selectedOption.icon ?? dropDownIcon}
        </div>
        {t(selectedOption.label)}
      </button>
      <MobileDropdown
        options={mobileOptions}
        isOpen={isOpen}
        onCancel={handleClose}
      />
    </>
  ) : (
    <DropdownMenu
      data-testid={dti}
      label={t(selectedOption.label)}
      // TODO поправить any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon={desktopIcon as any}
      onOptionSelect={handleToggleSortType}
    >
      <DesktopDropdown dti={`${dti}-option`} options={desktopOptions} />
    </DropdownMenu>
  );
};
