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

export const getPopularServiceQueries = (language) =>
  String(language || '').startsWith('de') ? POPULAR_SERVICE_QUERIES_DE : POPULAR_SERVICE_QUERIES;
