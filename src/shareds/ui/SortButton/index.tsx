import {
  DropdownMenu,
  DropdownOption as UIKitDropdownOption,
  DropdownPaper,
  SortIcon,
} from 'rupor-ui-kit';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { getTranslatedDti } from '@/shareds/helpers/getTranslatedDti';

export type SortVariants = 'ASC' | 'DESC';

export interface IOption<Label extends string, Value extends string> {
  label: Label;
  value: Value;
}

export interface ISortButtonOption<Label extends string, Value extends string>
  extends IOption<Label, Value> {
  onClick: (option: IOption<Label, Value>) => void;
  dti: string;
}

export interface ISortButtonProps<Label extends string, Value extends string> {
  currentSortValue: SortVariants;
  label?: string;
  options: IOption<Label, Value>[];
  onClick: (option: IOption<Label, Value>) => void;
  dti: string;
  videoId: string;
}

const DropdownOption = <Label extends string, Value extends string>(
  props: ISortButtonOption<Label, Value>,
) => {
  const { value, label, onClick, dti } = props;
  return (
    <UIKitDropdownOption
      data-testid={`${dti}_${getTranslatedDti(label)}`}
      key={value}
      label={label}
      onClick={() => onClick({ value, label } as IOption<Label, Value>)}
    />
  );
};

export const SortButton = <Label extends string, Value extends string>(
  props: ISortButtonProps<Label, Value>,
) => {
  const { currentSortValue, label, options, onClick, dti, videoId } = props;

  const dataTestId = dti ? `${dti}-dropdown_${videoId}` : `dropdown_${videoId}`;

  const { isMobile } = useIsMobile();

  const { elementsArray: dropDownOptions } = arrayRender({
    items: options,
    renderItem: DropdownOption,
    additionalProps: {
      // Из-за типов arrayRender, надо поиграться
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onClick,
      dti: dataTestId,
    },
    listKey: 'value',
  });

  const iconStyles =
    currentSortValue === 'ASC' ? { transform: 'rotate(180deg)' } : {};

  return (
    <DropdownMenu
      data-testid={dataTestId}
      label={
        !isMobile ? (
          <div className="!text-paragraph-m-s font-semibold">{label}</div>
        ) : null
      }
      icon={<SortIcon style={iconStyles} />}
    >
      <DropdownPaper>{dropDownOptions}</DropdownPaper>
    </DropdownMenu>
  );
};
