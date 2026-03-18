import { FC, memo } from 'react';

import Link from 'next/link';
import { BlockHeaderInner, RightArrowIcon } from 'rupor-ui-kit';

type Props = {
  redirectURL: string;
  title: string;
  amountOfVideo?: string;
  updateAt?: string;
  dti?: string
  playlistId: string
};

const PlaylistHeaderComponent: FC<Props> = ({
  redirectURL,
  title,
  amountOfVideo = '',
  updateAt = '',
  dti,
  playlistId,
}) => (
  <Link href={redirectURL} passHref>
    <BlockHeaderInner.Container className="cursor-pointer">
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.TitleContainer>
          <BlockHeaderInner.Title data-testid={`${dti}-title_${playlistId}`} className="flex text-paragraph-l">
            {title}
          </BlockHeaderInner.Title>
          <BlockHeaderInner.Subtitle>
            <RightArrowIcon color="grey" />
          </BlockHeaderInner.Subtitle>
        </BlockHeaderInner.TitleContainer>
        <BlockHeaderInner.Subtitle data-testid={`${dti}-video-amount_${playlistId}`} className="!text-paragraph-m-s font-[600]">
          {amountOfVideo}
        </BlockHeaderInner.Subtitle>
        <BlockHeaderInner.Subtitle data-testid={`${dti}-update_${playlistId}`} className="!text-paragraph-m-s font-[600]">
          {updateAt}
        </BlockHeaderInner.Subtitle>
      </BlockHeaderInner.TitleWrapper>
    </BlockHeaderInner.Container>
  </Link>
);

export const PlaylistHeader = memo(PlaylistHeaderComponent);
