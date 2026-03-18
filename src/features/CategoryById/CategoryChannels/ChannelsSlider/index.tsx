import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { EmptyContainer, Paper, SpliderNavigation } from '@/shareds';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import { IChannel } from '@/redux/services/channels/responseModel';
import { BlockHeaderInner, RightArrowIcon, Splider } from 'rupor-ui-kit/dist';
import { SpliderApi } from 'rupor-ui-kit/dist/components/Splider/Splider.types';

import { ChannelSlide } from './ChannelSlide';

type Props = {
  channels?: IChannel[];
  isLoading: boolean;
  categoryId: number;
  categoryTitle?: string;
  href?: string;
  dti?: string;
  index?: number;
};

const { categories: channelsPath } = APP_PATHS_PAGES;

export const ChannelsSlider: FC<Props> = ({
  channels,
  isLoading,
  categoryId,
  categoryTitle,
  href: propsHref,
  dti,
  index,
}) => {
  const href = propsHref ?? `${channelsPath}/channels/${categoryId}`;
  const { t } = useTranslation();
  const [sliderApi, handleSliderApi] = useState<SpliderApi>();

  const channelSlides = useMemo(() => (channels ?? []).map((channel,i) => (
    <ChannelSlide
      dti={dti}
      key={channel?.id}
      index={i+1}
      channel={channel}
      categoryId={categoryId}
    />
  )), [channels]);

  const isEmpty = !isLoading && !channels?.length;

  return (
    <Paper className="pt-4 md:p-4 md:pr-0 md:mb-4" data-testid={`${dti}-wrapper`}>
      <div className="flex justify-between mb-2 md:mb-0 h-11">
        <BlockHeaderInner.Container split className="mb-4 cursor-pointer">
          <Link href={href} passHref>
            <BlockHeaderInner.TitleWrapper data-testid={`${dti}-title_${categoryId}`}>
              <BlockHeaderInner.Title className="text-paragraph-l">
                {categoryTitle || t('Common_channels')}
              </BlockHeaderInner.Title>
              <BlockHeaderInner.Subtitle>
                <RightArrowIcon color="grey" width={20} />
              </BlockHeaderInner.Subtitle>
            </BlockHeaderInner.TitleWrapper>
          </Link>
        </BlockHeaderInner.Container>
        {!isEmpty && (
          <SpliderNavigation
            id={categoryId}
            dti={dti}
            {...sliderApi}
          />
        )}
      </div>

      {isEmpty ? (
        <EmptyContainer
          text={t('Channels_Slider_Empty_Container_Text')}
          height={211}
          isPage={false}
        />
      ) : (
        <Splider
          onGetApi={handleSliderApi}
          slides={isLoading ? renderSkeletons({ template: 'channelCard', limit: 8 }) : channelSlides}
          data-testid={dti}
        />
      )}
    </Paper>
  );
};
