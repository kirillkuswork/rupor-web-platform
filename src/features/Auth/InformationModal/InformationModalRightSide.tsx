import { FC, memo } from 'react';

import { Wrapper, Header } from '../ui';
import { InformationText } from './ui/InformationText';
import { SubmitButton } from './ui/SubmitButton';

export type InformationModalProps = {
  title: string;
  description: string;
  info: string;
  submitBtnTitle: string;
  onSubmit: () => void;
  onClose: () => void;
};

export const InformationModalRightSide: FC<InformationModalProps> = memo(
  ({
    title,
    description,
    info,
    submitBtnTitle,
    onSubmit: handleOnSubmit,
    onClose: handleOnClose,
  }) => (
    <Wrapper onClose={handleOnClose} ariaLabelledby={title}>
      <Header titleDti="information" title={title}>
        <InformationText text={description} />
        <InformationText text={info} />
        <SubmitButton title={submitBtnTitle} onClick={handleOnSubmit} />
      </Header>
    </Wrapper>
  ),
);

InformationModalRightSide.displayName = 'InformationModalRightSide';
