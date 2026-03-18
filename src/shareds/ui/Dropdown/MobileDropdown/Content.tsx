import { ReactNode, useCallback } from 'react';

import { Tooltip } from 'rupor-ui-kit';

import { useTranslation } from 'next-i18next';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { Dropzone } from '@/temporal/Dropzone';
import Link from 'next/link';
import { useSendYmMetrics } from 'rupor-common';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { TDropdownOption } from '../types';
import { useRouter } from 'next/router';

type WrapperProps = TDropdownOption & {
  children: ReactNode;
};

type OptionsProps = {
  options: TDropdownOption[];
  onCancel: () => void;
};

const OptionWrapper = ({
  children,
  ...props
}: WrapperProps) => (
  <button
    type="button"
    className="flex mb-6 cursor-pointer"
    {...props}
  >
    {children}
  </button>
);

const Option = ({
  label,
  icon,
  ...props
}: TDropdownOption) => {
  const { t } = useTranslation();

  return (
    <OptionWrapper {...props}>
      <Tooltip content={label} theme="dark">
        <div className="text-white/40">
          {icon}
        </div>
      </Tooltip>
      <span className="ml-4 text-paragraph-l-m truncate">{t(label!)}</span>
    </OptionWrapper>
  );
};

export const Content = ({ options, onCancel: handleCancel }: OptionsProps) => {
  const ContentItem = useCallback((option: TDropdownOption) => {
    const {
      dropzone,
      ...optionProps
    } = option;

    const { sendYmMetric } = useSendYmMetrics();
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
        <a
          key={option.label}
          onClick={handleClick}
        >
          <Option
            label={option.label}
            icon={option.icon}
          />
        </a>
      );
    }

    if (dropzone) {
      const {
        setterFn,
        accept,
      } = dropzone;

      return (
        <Dropzone
          setterFn={setterFn}
          key={option.label}
          accept={accept}
        >
          <Option
            {...optionProps}
          />
        </Dropzone>
      );
    }

    return (
      <Option
        key={option.label}
        onClick={handleCancel}
        {...optionProps}
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
