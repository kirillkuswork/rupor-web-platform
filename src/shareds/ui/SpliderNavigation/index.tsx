/* eslint-disable jsx-a11y/control-has-associated-label */
import { memo } from 'react';

import { LeftArrowIcon, RightArrowIcon } from 'rupor-ui-kit';
import { SpliderApi } from 'rupor-ui-kit/dist/components/Splider/Splider.types';

type Props = Partial<SpliderApi> & SpliderProps;

type SpliderProps = {
  dti?: string
  id?: number
};
export const SpliderNavigation = memo(({
  started,
  ended,
  navigateMoveToPrev,
  navigateMoveToNext,
  dti,
  id,
}: Props) => (

  <div className="flex items-center md:hidden">
    <button
      data-testid={`${dti}-prev-arrow_${id}`}
      type="button"
      disabled={started}
      className="RuiSlider-nav-btn"
      onClick={() => navigateMoveToPrev?.()}
    >
      <LeftArrowIcon />
    </button>
    <button
      data-testid={`${dti}-next-arrow_${id}`}
      type="button"
      disabled={ended}
      className="RuiSlider-nav-btn"
      onClick={() => navigateMoveToNext?.()}
    >
      <RightArrowIcon />
    </button>
  </div>
));

SpliderNavigation.displayName = 'SpliderNavigation';
