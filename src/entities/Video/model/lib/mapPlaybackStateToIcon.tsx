import { PauseIcon, PlayIcon } from 'rupor-ui-kit';
import { IIconsProps } from 'rupor-ui-kit/dist/types/interfaces';
import { FC } from 'react';
import { TPlaybackStates } from '../types/playbackStates';

export type TPlaybackStatesFormatted = Extract<TPlaybackStates, 'play' | 'pause'>;

type TMapPlaybackStateToIcon = Record<TPlaybackStatesFormatted, FC<IIconsProps>>;

export const mapPlaybackStateToIcon: TMapPlaybackStateToIcon = {
  play: PlayIcon,
  pause: PauseIcon,
};
