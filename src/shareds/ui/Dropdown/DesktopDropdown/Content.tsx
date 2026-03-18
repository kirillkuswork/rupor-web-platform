import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { DropdownOption } from 'rupor-ui-kit';
import { getTranslatedDti } from '@/shareds/helpers/getTranslatedDti';
import { useSendYmMetrics } from 'rupor-common';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { TDropdownOption } from '../types';
import { useRouter } from 'next/router';

type Props = {
  options: TDropdownOption[];
  onCancel?: () => void;
};

export const Content = ({
  options,
  onCancel: handleCancel = () => { },
}: Props) => {
  const { sendYmMetric } = useSendYmMetrics();
  const { t } = useTranslation();
  const studioUrl = window?.__APP_ENV__?.STUDIO_URL ?? '';
  const router = useRouter();

  const handelOnClickStudio = useCallback(() => {
    console.log("click studio");
    sendYmMetric({ // метрика 2.4.4 Пользователь нажимает на кнопку Рупор студия в контекстном меню после клика по аватару/заглушке	Все экраны
      event_group: 'event',
      event_category: 'profile',
      event_label: 'rupor_studio',
      event_name: 'profile-element_click-rupor_studio',
      event_action: 'element_click',
      event_element_location: 'popup',
    });
    setTimeout(() => {
      router.push(studioUrl);
    }, 100);
  }, [router, studioUrl]);

  const handelOnClickSettings = useCallback(() => {
    sendYmMetric({ // метрика 2.4.5 Пользователь нажимает на кнопку Настройки в контекстном меню после клика по аватару/заглушке
      event_group: 'event',
      event_category: 'profile',
      event_label: 'nastroiki',
      event_name: 'profile-element_click-nastroiki',
      event_action: 'element_click',
      event_element_location: 'popup',
    });
    router.push(APP_PATHS_PAGES.settings);
    handleCancel();
  }, [router, handleCancel]);

  const ContentItem = useCallback((option: TDropdownOption) => {
    const translatedLabel = t(option.label!);
    const changedOption = { ...option, label: translatedLabel };

    const handleClick = () => {
      if (option.href === window?.__APP_ENV__?.STUDIO_URL) {
        handelOnClickStudio();
      } else if (option.href === APP_PATHS_PAGES.settings) {
        handelOnClickSettings();
      } else {
        if(option.href) router.push(option.href);
        handleCancel();
      }
    };

    if (option.href) {
      return (
        <a key={option.label}>
          <DropdownOption
            data-testid={`option_${getTranslatedDti(translatedLabel)}`}
            className="!text-white"
            optionClassName="!text-paragraph-m-s"
            {...changedOption}
            onClick={handleClick}
          />
        </a>
      );
    }

    return (
      <DropdownOption
        data-testid={`option_${getTranslatedDti(translatedLabel)}`}
        className="!text-white mt-1"
        optionClassName="!text-paragraph-m-s truncate max-w-[250px]"
        key={option.label}
        {...changedOption}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { Element } = arrayRender({
    items: options,
    renderItem: ContentItem,
  });

  return <Element />;
};
