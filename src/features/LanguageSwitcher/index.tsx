import React, { useCallback, useEffect, useState } from 'react';
import { DownArrowIcon, Popper } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { getCookie, setCookie } from 'cookies-next';
// eslint-disable-next-line import/order
import { env } from '@/app/utils/getEnv';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { DesktopDropdown, MobileDropdown } from '@/shareds/ui/Dropdown';
import { isBrowser } from '@/shareds/lib/utils/isBrowser';

interface Language {
  code: string;
  label: string;
  option: string;
}

const languages: Language[] = [
  { code: 'ru', label: 'RU', option: 'Русский' },
  { code: 'en', label: 'EN', option: 'English' },
];

export const LanguageSwitcher = () => {
  const [isLanguageSwitcherOpen, setIsLanguageSwitcherOpen] = useState(false);
  const { isMobile } = useIsMobile();

  const handleCloseDropdown = useCallback(() => {
    setIsLanguageSwitcherOpen(false);
  }, []);

  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleLanguageChange = useCallback((langCode: string) => async () => {
    await i18n.changeLanguage(langCode);
    setCookie('X-RUPOR-LANG', langCode, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      domain: env.API_COOKIE_DOMAIN,
      path: '/',
      sameSite: 'lax',
    });
    handleCloseDropdown();
  }, [handleCloseDropdown, i18n]);

  useEffect(() => {
    if (!isBrowser) return;
    const cookieLang = getCookie('X-RUPOR-LANG');
    const savedLang = cookieLang ?? currentLanguage;
    handleLanguageChange(savedLang)();
  }, []);

  const langOptions: TDropdownOption[] = languages.map((lang) => ({
    label: lang.option,
    key: lang.code,
    onClick: handleLanguageChange(lang.code),
  }));

  const currentLanguageLabel = languages.find((lang) => lang.code === currentLanguage)?.label || 'Язык';

  return (
    <>
      <Popper
        content={<DesktopDropdown options={langOptions} />}
        placement="bottom-start"
        isOpen={!isMobile && isLanguageSwitcherOpen}
        onOutsideClick={handleCloseDropdown}
      >
        <button
          type="button"
          className="flex items-center gap-[6px]"
          onClick={() => setIsLanguageSwitcherOpen((prevOpen) => !prevOpen)}
        >
          <span className="font-bold text-base opacity-80">
            {currentLanguageLabel}
          </span>
          {
            !isMobile && (
            <DownArrowIcon
              data-testid="header-down-arrow"
              height={24}
              width={24}
              className="text-white"
              direction={isLanguageSwitcherOpen ? 'down' : 'up'}
            />
            )
          }
        </button>
      </Popper>
      <MobileDropdown
        options={langOptions}
        onCancel={handleCloseDropdown}
        isOpen={isMobile && isLanguageSwitcherOpen}
      />
    </>

  );
};
