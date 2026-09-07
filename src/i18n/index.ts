import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English language packs
import enCommon from './locales/en/common.json';
import enSettings from './locales/en/settings.json';
import enKeys from './locales/en/keys.json';

// Chinese language packs
import zhCommon from './locales/zh-CN/common.json';
import zhSettings from './locales/zh-CN/settings.json';
import zhKeys from './locales/zh-CN/keys.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        settings: enSettings,
        keys: enKeys,
      },
      'zh-CN': {
        common: zhCommon,
        settings: zhSettings,
        keys: zhKeys,
      },
    },
    fallbackLng: 'en',
    ns: ['common', 'settings', 'keys'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
