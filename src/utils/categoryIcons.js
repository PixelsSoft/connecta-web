import DesignAnplainingicon from '../assets/images/category-icons/DesignAnplaining-icon.png';
import GardenAndOutdoorIcon from '../assets/images/category-icons/GardenAndOutdoor-icon.png';
import ProjectManagementIcon from '../assets/images/category-icons/ProjectManagement-icon.png';
import OutdoorAndLandscapingIcon from '../assets/images/category-icons/OutdoorAndLandscaping-icon.png';
import MediaAndCreativeIcon from '../assets/images/category-icons/MediaAndCreative-icon.png';
import RentalAndEquipmentIcon from '../assets/images/category-icons/RentalAndEquipment-icon.png';
import BusinessAndFacilityServicesIcon from '../assets/images/category-icons/BusinessAndFacilityServices-icon.png';
import HomeAndComfortIcon from '../assets/images/category-icons/HomeAndComfort-icon.png';
import MaintenanceAndRepairingIcon from '../assets/images/category-icons/MaintenanceAndRepairing-icon.png';
import TechnicalAndConstructionIcon from '../assets/images/category-icons/TechnicalAndConstruction-icon.png';
import AdministrativeAndPermitsIcon from '../assets/images/category-icons/AdministrativeAndPermits-icon.png';
import DigitalAndTechIcon from '../assets/images/category-icons/DigitalAndTech-icon.png';
import CleaningServicesIcon from '../assets/images/category-icons/CleaningServices-icon.png';
import InteriorAndFinishingIcon from '../assets/images/category-icons/InteriorAndFinishing-icon.png';
import TransportAndMovingIcon from '../assets/images/category-icons/TransportAndMoving-icon.png';
import TechnicalAndInstallationIcon from '../assets/images/category-icons/TechnicalAndInstallation-icon.png';

export const categoryIconMap = {
  'Design & Planning': DesignAnplainingicon,
  'Garden & Outdoor': GardenAndOutdoorIcon,
  'Project Management': ProjectManagementIcon,
  'Outdoor & Landscaping': OutdoorAndLandscapingIcon,
  'Media & Creative': MediaAndCreativeIcon,
  'Rental & Equipment': RentalAndEquipmentIcon,
  'Business & Facility Services': BusinessAndFacilityServicesIcon,
  'Home & Comfort': HomeAndComfortIcon,
  'Maintenance & Repairs': MaintenanceAndRepairingIcon,
  'Technical & Construction': TechnicalAndConstructionIcon,
  'Administrative & Permits': AdministrativeAndPermitsIcon,
  'Digital & Tech': DigitalAndTechIcon,
  'Cleaning Services': CleaningServicesIcon,
  'Interior & Finishing': InteriorAndFinishingIcon,
  'Transport & Moving': TransportAndMovingIcon,
  'Technical & Installation': TechnicalAndInstallationIcon,
  'Specialist Services': DesignAnplainingicon,
};

export const getCategoryIcon = (name) => categoryIconMap[name] || DesignAnplainingicon;

export const POPULAR_SERVICE_QUERIES = [
  'Electrician',
  'Painter',
  'Cleaning service',
  'Glass railing',
  'Plumber',
  'Moving company',
  'Architect',
  'Kitchen renovation',
  'Pool installation',
  'Gardener',
  'Solar panel',
];

export const POPULAR_SERVICE_QUERIES_DE = [
  'Elektriker',
  'Maler',
  'Reinigungsservice',
  'Glasgeländer',
  'Klempner',
  'Umzugsunternehmen',
  'Architekt',
  'Küchenrenovierung',
  'Poolinstallation',
  'Gärtner',
  'Solarpanel',
];

export const POPULAR_SERVICE_QUERIES_FR = [
  'Électricien',
  'Peintre',
  'Nettoyage',
  'Garde-corps en verre',
  'Plombier',
  'Déménagement',
  'Architecte',
  'Rénovation cuisine',
  'Installation piscine',
  'Jardinier',
  'Panneau solaire',
];

export const POPULAR_SERVICE_QUERIES_IT = [
  'Elettricista',
  'Pittore',
  'Pulizia',
  'Ringhiera in vetro',
  'Idraulico',
  'Trasloco',
  'Architetto',
  'Ristrutturazione cucina',
  'Installazione piscina',
  'Giardiniere',
  'Pannello solare',
];

export function resolveUiLanguage(language) {
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = String(localStorage.getItem('connecta_ui_lang') || '').toLowerCase();
      if (stored.startsWith('de') || stored.startsWith('fr') || stored.startsWith('it') || stored.startsWith('en')) {
        return stored.slice(0, 2);
      }
    } catch {
      /* ignore */
    }
  }

  const fromArg = String(language || '').toLowerCase();
  if (fromArg.startsWith('de') || fromArg.startsWith('fr') || fromArg.startsWith('it') || fromArg.startsWith('en')) {
    // i18n-shim is hardcoded to "en"; prefer googtrans/html when available
    if (fromArg !== 'en') return fromArg.slice(0, 2);
  }

  if (typeof document !== 'undefined') {
    const htmlLang = String(document.documentElement?.lang || '').toLowerCase();
    if (htmlLang.startsWith('de') || htmlLang.startsWith('fr') || htmlLang.startsWith('it')) {
      return htmlLang.slice(0, 2);
    }

    const googtrans =
      document.cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('googtrans=')) || '';
    const match = googtrans.match(/googtrans=\/[a-z]{2}\/([a-z]{2})/i);
    if (match?.[1] && match[1].toLowerCase() !== 'en') return match[1].toLowerCase();
  }

  if (fromArg.startsWith('en')) return 'en';
  return 'en';
}

export const getPopularServiceQueries = (language) => {
  const lang = resolveUiLanguage(language);
  if (lang === 'de') return POPULAR_SERVICE_QUERIES_DE;
  if (lang === 'fr') return POPULAR_SERVICE_QUERIES_FR;
  if (lang === 'it') return POPULAR_SERVICE_QUERIES_IT;
  return POPULAR_SERVICE_QUERIES;
};
