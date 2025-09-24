// Lightweight shim to replace react-i18next while keeping app strings intact
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';

const resources = {
  common: enCommon,
  home: enHome,
};

function get(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj);
}

export function useTranslation() {
  const t = (key) => {
    if (!key) return '';
    // allow optional namespace prefix like "common:key" or "home:key"
    const [nsMaybe, rest] = key.includes(':') ? key.split(':') : [null, null];
    if (nsMaybe && rest) {
      const value = get(resources[nsMaybe], rest);
      return typeof value === 'string' ? value : key;
    }
    // dot-path within default resources (try common first then home)
    const inCommon = get(resources.common, key);
    if (typeof inCommon === 'string') return inCommon;
    const inHome = get(resources.home, key);
    if (typeof inHome === 'string') return inHome;
    return key;
  };
  return { t, i18n: { language: 'en', changeLanguage: () => Promise.resolve() } };
}

export const Trans = ({ children }) => children;

export default { useTranslation };


