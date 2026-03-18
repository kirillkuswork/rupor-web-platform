import useIsMobile from '@/shareds/hooks/useIsMobile';
import { DesktopDropdown } from '@/shareds/ui/Dropdown';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { FC, memo } from 'react';

import {
  AdditionalHorizontalIcon,
  BlockHeaderInner,
  DropdownMenu,
  DropdownPaper,
  PenIcon,
  TrashIcon,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type PlaylistByIdPageHeaderTitleProps = {
  title: string;
  amountOfVideo: number,
  isMenuVisible?: boolean;
  handleDropdownButtonClick: () => void;
  handleEditMenuClick: () => void;
  handleDeleteMenuClick: () => void;
  id?: string
  dti?: string
};

export const PlaylistByIdPageHeaderTitle: FC<PlaylistByIdPageHeaderTitleProps> = memo(({
  title,
  amountOfVideo,
  isMenuVisible = true,
  handleDropdownButtonClick,
  handleEditMenuClick,
  handleDeleteMenuClick,
  id,
  dti,
}) => {
  const { isMobile } = useIsMobile();
  const isInformationVisible = !!amountOfVideo;
  const { t } = useTranslation();
  const amountOfVideoStr = t('Playlist_By_Id_Page_Header_Title_Amount_Of_Video', { amountOfVideo });

  const options: TDropdownOption[] = [
    {
      // TODO: translate
      label: t('Playlist_By_Id_Page_Header_Title_Options_Edit'),
      icon: <PenIcon />,
      onClick: handleEditMenuClick,
    },
    {
      // TODO: translate
      label: t('Playlist_By_Id_Page_Header_Title_Options_Delete'),
      icon: <TrashIcon />,
      onClick: handleDeleteMenuClick,
    },
  ];

  return (
    <>
      <BlockHeaderInner.Container split>
        <>
          <BlockHeaderInner.TitleWrapper>
            <BlockHeaderInner.Title
              data-testid={`${dti}-title_${id}`}
              className="my-4 md:text-headline-xs text-headline-s"
              style={{ wordBreak: 'break-word' }}
            >
              {title}
            </BlockHeaderInner.Title>

            {isInformationVisible && !isMobile && (
              <BlockHeaderInner.Subtitle data-testid={`${dti}-amount_${id}`}>
                {amountOfVideoStr}
              </BlockHeaderInner.Subtitle>
            )}
          </BlockHeaderInner.TitleWrapper>

          {isMenuVisible && (
            <>
              {!isMobile && (
                <BlockHeaderInner.RightBlock>
                  <DropdownMenu data-testid={`${dti}-dropdown-icon_${id}`}>
                    <DropdownPaper data-testid={`${dti}-dropdown-menu_${id}`}>
                      <DesktopDropdown
                        dti={`${dti}-option`}
                        options={options}
                      />
                    </DropdownPaper>
                  </DropdownMenu>
                </BlockHeaderInner.RightBlock>
              )}

              <BlockHeaderInner.RightBlockMobile>
                <AdditionalHorizontalIcon
                  onClick={handleDropdownButtonClick}
                />
              </BlockHeaderInner.RightBlockMobile>
            </>
          )}
        </>
      </BlockHeaderInner.Container>

      {isInformationVisible && isMobile && (
        <div className="flex flex-row mb-0">
          <div className="mr-3 font-[600] text-white-40 md:text-paragraph-m-s text-paragraph-l-m">
            {amountOfVideoStr}
          </div>
        </div>
      )}
    </>
  );
});

PlaylistByIdPageHeaderTitle.displayName = 'PlaylistByIdPageHeaderTitle';
