import { IIconsProps } from 'rupor-ui-kit/dist/types/interfaces';
import { mapPlaybackStateToIcon, TPlaybackStatesFormatted } from '../../model/lib/mapPlaybackStateToIcon';
import { TPlaybackStates } from '../../model/types/playbackStates';

type TMapPlaybackStateToIconProps = Record<TPlaybackStatesFormatted, IIconsProps>;

interface IPlaybackStateToIconProps {
  playbackState: TPlaybackStates
  iconProps?: Partial<TMapPlaybackStateToIconProps>
}

export const PlaybackIcon = (props: IPlaybackStateToIconProps) => {
  const {
    playbackState,
    iconProps,
  } = props;

  const hasIcon = playbackState in mapPlaybackStateToIcon;

  if (!hasIcon) return null;

  const playbackStateFormatted = playbackState as TPlaybackStatesFormatted;

  const IconComponent = mapPlaybackStateToIcon[playbackStateFormatted];

  const getIconProps = iconProps?.[playbackStateFormatted];

  return <IconComponent {...getIconProps} />;
};
