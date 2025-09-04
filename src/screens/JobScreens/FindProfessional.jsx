import React from "react";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import { useTranslation } from "react-i18next";

import paintingicon from "../../assets/images/painting-icon.png";
import homeRepairingicon from "../../assets/images/homeRepairing-icon.png";
import gardeningicon from "../../assets/images/gardening-icon.png";
import electricianicon from "../../assets/images/electrician-icon.png";
import cleaningicon from "../../assets/images/cleaning-icon.png";
import roofingicon from "../../assets/images/roofing-icon.png";
import kitchenRepairingicon from "../../assets/images/kitchenRepairing-icon.png";
import plumbingicon from "../../assets/images/plumbing-icon.png";
import architecturalServicesicon from "../../assets/images/architecturalServices-icon.png";
import chimneyicon from "../../assets/images/chimney-icon.png";
import brickLayingicon from "../../assets/images/brickLaying-icon.png";

import jobPostingBannerImg from "../../assets/images/jobPosting-banner-img.png";
import { Link, useNavigate } from "react-router-dom";

// categories new icon
import DesignAnplainingicon from "../../assets/images/category-icons/DesignAnplaining-icon.png";
import GardenAndOutdoorIcon from "../../assets/images/category-icons/GardenAndOutdoor-icon.png";
import ProjectManagementIcon from "../../assets/images/category-icons/ProjectManagement-icon.png";
import OutdoorAndLandscapingIcon from "../../assets/images/category-icons/OutdoorAndLandscaping-icon.png";
import MediaAndCreativeIcon from "../../assets/images/category-icons/MediaAndCreative-icon.png";
import RentalAndEquipmentIcon from "../../assets/images/category-icons/RentalAndEquipment-icon.png";
import BusinessAndFacilityServicesIcon from "../../assets/images/category-icons/BusinessAndFacilityServices-icon.png";
import HomeAndComfortIcon from "../../assets/images/category-icons/HomeAndComfort-icon.png";
import MaintenanceAndRepairingIcon from "../../assets/images/category-icons/MaintenanceAndRepairing-icon.png";
import TechnicalAndConstructionIcon from "../../assets/images/category-icons/TechnicalAndConstruction-icon.png";
import AdministrativeAndPermitsIcon from "../../assets/images/category-icons/AdministrativeAndPermits-icon.png";
import DigitalAndTechIcon from "../../assets/images/category-icons/DigitalAndTech-icon.png";
import CleaningServicesIcon from "../../assets/images/category-icons/CleaningServices-icon.png";
import InteriorAndFinishingIcon from "../../assets/images/category-icons/InteriorAndFinishing-icon.png";
import TransportAndMovingIcon from "../../assets/images/category-icons/TransportAndMoving-icon.png";
import TechnicalAndInstallationIcon from "../../assets/images/category-icons/TechnicalAndInstallation-icon.png";

// const categoryData = [
//   {
//     icon: paintingicon,
//     name: 'Painting',
//   },
//   {
//     icon: homeRepairingicon,
//     name: 'Home Repairing',
//   },
//   {
//     icon: gardeningicon,
//     name: 'Gardening',
//   },
//   {
//     icon: electricianicon,
//     name: 'Electrician',
//   },
//   {
//     icon: cleaningicon,
//     name: 'Cleaning',
//   },
//   {
//     icon: roofingicon,
//     name: 'Roofing',
//   },
//   {
//     icon: kitchenRepairingicon,
//     name: 'Kitchen Repairing',
//   },
//   {
//     icon: plumbingicon,
//     name: 'Plumbing',
//   },
//   {
//     icon: architecturalServicesicon,
//     name: 'Architectural Services',
//   },
//   {
//     icon: chimneyicon,
//     name: 'Chimney',
//   },
//   {
//     icon: brickLayingicon,
//     name: 'Brick Laying',
//   },
// ];

const categoryData = [
  {
    icon: DesignAnplainingicon,
    name: "Design and Planning",
    value: "Design-And-Planning",
  },
  {
    icon: GardenAndOutdoorIcon,
    name: "Garden & Outdoor",
    value: "Garden-And-Outdoor",
  },
  {
    icon: ProjectManagementIcon,
    name: "Project Management",
    value: "Project-Management",
  },
  {
    icon: OutdoorAndLandscapingIcon,
    name: "Outdoor & Landscaping",
    value: "Outdoor-And-Landscaping",
  },
  {
    icon: MediaAndCreativeIcon,
    name: "Media & Creative",
    value: "Media-And-Creative",
  },
  {
    icon: RentalAndEquipmentIcon,
    name: "Rental & Equipment", 
    value: "Rental-And-Equipment",
  },
  {
    icon: BusinessAndFacilityServicesIcon,
    name: "Business & Facility Services",
    value: "Business-And-Facility-Services",
  },
  {
    icon: HomeAndComfortIcon,
    name: "Home & Comfort",
    value: "Home-And-Comfort",
  },
  {
    icon: MaintenanceAndRepairingIcon,
    name: "Maintenance & Repairing",
    value: "Maintenance-And-Repairing",
  },
  {
    icon: TechnicalAndConstructionIcon,
    name: "Technical & Construction",
    value: "Technical-And-Construction",
  },
  {
    icon: AdministrativeAndPermitsIcon,
    name: "Administrative & Permits",
    value: "Administrative-And-Permits",
  },
  {
    icon: DigitalAndTechIcon,
    name: "Digital & Tech",
    value: "Digital-And-Tech",
  },
  {
    icon: CleaningServicesIcon,
    name: "Cleaning Services",
    value: "Cleaning-Services",
  },
  {
    icon: InteriorAndFinishingIcon,
    name: "Interior & Finishing",
    value: "Interior-And-Finishing",
  },
  {
    icon: TransportAndMovingIcon,
    name: "Transport & Moving",
    value: "Transport-And-Moving",
  },
  {
    icon: TechnicalAndInstallationIcon,
    name: "Technical & Installation",
    value: "Technical-And-Installation",
  },
];

const FindProfessional = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
 
    // if (selectedValue === 'painting-job') {
    //   navigate('/painting-job');
    // }
    navigate(`/post-a-job/${selectedValue}`);

    // Add more redirects if needed for other categories
  };
  return (
    <DefaultLayout2>
      <section className="jobPostingSec">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7">
              <div className="jobPosting__content">
                <div className="sec-head">
                  <h1>{t('jobPosting.findTopRatedProfessional')}</h1>
                  <p>
                    {t('jobPosting.whichCategory')}
                  </p>
                </div>
                <div className="findProfessionalContent">
                  <div className="inputGroup">
                    <label htmlFor="selectCategory" className="form-label">
                      {t('jobPosting.whatWouldYouLikeDone')}
                    </label>
                    <select
                      id="selectCategory"
                      className="form-select form-control"
                      aria-label="Select job category"
                      onChange={handleSelectChange}
                      defaultValue=""
                    >
                      <option value={""} disabled>
                        {t('jobPosting.selectCategory')}
                      </option>
                      {categoryData.map((item, index) => (
                     
                        <option
                          value={item.value}
                          key={index}
                        >
                          {item.name}
                        </option>
                      ))}
                      {/* <option value="Painting-job">Painting</option>
                      <option value="Home-repairing">Home Repairing</option>
                      <option value="Gardening">Gardening</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Roofing">Roofing</option>
                      <option value="Kitchen-Repairing">
                        Kitchen Repairing
                      </option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Architectural-Services">
                        Architectural Services
                      </option>
                      <option value="Chimney">Chimney</option>
                      <option value="Brick-Laying">Brick Laying</option> */}
                    </select>
                  </div>
                  <div className="mostRecentCategories">
                    <h4>{t('jobPosting.mostRecentCategories')}</h4>
                    <div className="mostRecentCategories_boxes">
                      {categoryData.map((item, index) => (
                        <Link
                          to={`/post-a-job/${item.value}`}
                          className="mostRecentCategories_box"
                          key={index}
                        >
                          <div className="mostRecentCategories_boxe-icon">
                            <img src={item.icon} alt="" />
                          </div>
                          <p>{item.name}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="jobPosting__banner-img">
                  <img src={jobPostingBannerImg} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default FindProfessional;
