import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
import home_en from './locales/en/home.json';
import common_en from './locales/en/common.json';

// German
import home_de from './locales/de/home.json';
import common_de from './locales/de/common.json';

// French
import home_fr from './locales/fr/home.json';
import common_fr from './locales/fr/common.json';

// Italian
import home_it from './locales/it/home.json';
import common_it from './locales/it/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: home_en,
        common: common_en,
      },
      de: {
        home: home_de,
        common: common_de,
      },
      fr: {
        home: home_fr,
        common: common_fr,
      },
      it: {
        home: home_it,
        common: common_it,
      },
    },
    fallbackLng: 'en', // fallback if language not found
    ns: ['home', 'common'], // namespaces to load
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
