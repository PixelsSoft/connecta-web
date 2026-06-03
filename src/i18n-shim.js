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

export function useTranslation(namespace = 'common') {
  const ns = Array.isArray(namespace) ? namespace[0] : namespace;

  const t = (key, options) => {
    if (!key) return options?.defaultValue ?? '';

    const [nsMaybe, rest] = key.includes(':') ? key.split(':') : [null, null];
    if (nsMaybe && rest) {
      const value = get(resources[nsMaybe], rest);
      if (typeof value === 'string') return value;
      return options?.defaultValue;
    }

    const inNamespace = get(resources[ns], key);
    if (typeof inNamespace === 'string') return inNamespace;

    const inCommon = get(resources.common, key);
    if (typeof inCommon === 'string') return inCommon;

    const inHome = get(resources.home, key);
    if (typeof inHome === 'string') return inHome;

    return options?.defaultValue;
  };

  return { t, i18n: { language: 'en', changeLanguage: () => Promise.resolve() } };
}

export const Trans = ({ children }) => children;

export default { useTranslation };
