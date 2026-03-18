import { FC, memo } from 'react';
import clsx from 'clsx';
import { InformationText } from './ui/InformationText';
import { SubmitButton } from './ui/SubmitButton';

export type InformationModalProps = {
  description: string;
  info: string;
  submitBtnTitle: string;
  onSubmit: () => void;
  className?: string
};

export const InformationContent: FC<InformationModalProps> = memo(
  ({
    description,
    info,
    submitBtnTitle,
    onSubmit: handleOnSubmit,
    className,
  }) => (
    <>
      <div className={clsx('flex flex-col gap-6 mt-3', className)}>
        <InformationText text={description} />
        <InformationText text={info} />
      </div>
      <SubmitButton title={submitBtnTitle} onClick={handleOnSubmit} />
    </>
  ),
);

InformationContent.displayName = 'InformationContent';
