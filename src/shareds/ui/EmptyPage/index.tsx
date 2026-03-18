import { FC } from 'react';

import Link from 'next/link';
import {
  Button,
  CloseIcon,
  EmptyPage as EmptyPageUI,
} from 'rupor-ui-kit';

interface IEmptyPage {
  title: string;
  subTitle: string;
  className?: string;
  buttonTitle?: string;
  buttonHref?: string;
  isIconShown?: boolean;
  isButtonShown?: boolean;
  dti?: string
}

export const EmptyPage: FC<IEmptyPage> = ({
  title,
  subTitle,
  className = '',
  buttonTitle = '',
  buttonHref = '',
  isIconShown = true,
  isButtonShown = true,
  dti,
}) => (
  <EmptyPageUI.Wrapper className={className}>
    {isIconShown && (
      <EmptyPageUI.Icon>
        <CloseIcon
          width={64}
          height={64}
          fill="black"
          color="black"
        />
      </EmptyPageUI.Icon>
    )}
    <EmptyPageUI.Title data-testid={`${dti}-empty-title`}>{title}</EmptyPageUI.Title>
    <EmptyPageUI.Subtitle data-testid={`${dti}-empty-subtitle`}>{subTitle}</EmptyPageUI.Subtitle>
    {isButtonShown && (
      <Link href={buttonHref} passHref>
        <Button label={buttonTitle} />
      </Link>
    )}
  </EmptyPageUI.Wrapper>
);
