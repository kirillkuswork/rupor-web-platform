/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback } from 'react';

import { AddVideoIcon } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useSendYmMetrics } from 'rupor-common';
import { useRouter } from 'next/router';

export const StudioButton = () => {
  const studioUrl = `${window?.__APP_ENV__?.STUDIO_URL}?action=addVideo`;
  const { isMobile } = useIsMobile();

  const { sendYmMetric } = useSendYmMetrics();

  const router = useRouter();

  const handleLoadVideoClick = useCallback(() => {
    sendYmMetric({ // метрика 2.6.3 	Пользователь нажимает на иконку Загрузить видео в хедере.
      event_group: 'event',
      event_category: 'menu',
      event_label: 'zagruzit_video',
      event_name: 'rupor_studio-element_click-zagruzit_video',
      event_action: 'element_click',
      event_element_location: 'header',
    });

    setTimeout(() => {
      router.push(studioUrl);
    }, 100);
  }, [router, studioUrl]);
  return (
    <a onClick={handleLoadVideoClick} data-testid="header-studio-button" className="w-[52px] h-[52px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full bg-[#ffffff29]">
      <AddVideoIcon
        color="#fff"
        className="cursor-pointer hover:cl-dynamic-interface-primary md:cl-dynamic-interface-primary md:p-0.25"
        height={isMobile ? 18 : 20}
      />
    </a>
  );
};
