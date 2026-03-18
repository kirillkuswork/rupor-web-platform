import { DesktopDropdown, MobileDropdown } from '@/shareds/ui/Dropdown';
import { AdditionalHorizontalIcon, HVideoCard } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useState } from 'react';
import { isNewAuthMode } from '@/shareds/lib/utils/isNewAuthMode';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { TVideoAction } from '../../model/types/videoCardWithDetailsProps';

interface IVideoActionsProps {
  videoActions?: TVideoAction[];
  className?: string;
  alwaysVisible?: boolean;
  videoId?: string;
  dti?: string;
}

export const VideoActions = (props: IVideoActionsProps) => {
  const {
    videoActions, className, alwaysVisible, videoId, dti,
  } = props;
  const { isAuth } = useSelector(selectors.userSelector);
  const { isMobile } = useIsMobile();
  const isAuthMode = !isAuth && isNewAuthMode();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isAuthMode) {
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (!videoActions) return null;

  if (isMobile) {
    return (
      <div className={className}>
        <button type="button" onClick={handleOpen}>
          <AdditionalHorizontalIcon />
        </button>
        <MobileDropdown
          isOpen={isOpen}
          onCancel={handleCancel}
          options={videoActions}
        />
      </div>
    );
  }

  const dataTestId = dti ? `${dti}-` : '';

  return (
    <HVideoCard.DropdownMenu
      data-testid={`${dataTestId}dropdown${videoId ? `_${videoId}` : ''}`}
      className={className}
      alwaysVisible={alwaysVisible}
    >
      {isAuthMode ? null : (
        <DesktopDropdown
          dti={`${dataTestId}dropdown-wrapper_${videoId}`}
          options={videoActions}
        />
      )}
    </HVideoCard.DropdownMenu>
  );
};
