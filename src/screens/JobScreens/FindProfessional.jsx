import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout2 from "../../components/Layouts/DefaultLayout2";
import { useTranslation } from "react-i18next";
import { fetchCategories } from "../../store/slices/categorySlice";

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

// Icon mapping for categories
const iconMapping = {
  "Design & Planning": DesignAnplainingicon,
  "Garden & Outdoor": GardenAndOutdoorIcon,
  "Project Management": ProjectManagementIcon,
  "Outdoor & Landscaping": OutdoorAndLandscapingIcon,
  "Media & Creative": MediaAndCreativeIcon,
  "Rental & Equipment": RentalAndEquipmentIcon,
  "Business & Facility Services": BusinessAndFacilityServicesIcon,
  "Home & Comfort": HomeAndComfortIcon,
  "Maintenance & Repairs": MaintenanceAndRepairingIcon,
  "Technical & Construction": TechnicalAndConstructionIcon,
  "Administrative & Permits": AdministrativeAndPermitsIcon,
  "Digital & Tech": DigitalAndTechIcon,
  "Cleaning Services": CleaningServicesIcon,
  "Interior & Finishing": InteriorAndFinishingIcon,
  "Transport & Moving": TransportAndMovingIcon,
  "Technical & Installation": TechnicalAndInstallationIcon,
  "Specialist Services": DesignAnplainingicon, // Default icon
};

const FindProfessional = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Map categories from API to display format
  const categoryData = categories.map(category => ({
    icon: iconMapping[category.name] || DesignAnplainingicon,
    name: category.name,
    value: category.slug,
    id: category.id,
  }));

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    navigate(`/post-a-job/${selectedValue}`);
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
                      disabled={loading}
                    >
                      <option value={""} disabled>
                        {loading ? 'Loading categories...' : t('jobPosting.selectCategory')}
                      </option>
                      {categoryData.map((item, index) => (
                        <option
                          value={item.value}
                          key={item.id || index}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mostRecentCategories">
                    <h4>{t('jobPosting.mostRecentCategories')}</h4>
                    {loading ? (
                      <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mostRecentCategories_boxes">
                        {categoryData.map((item, index) => (
                          <Link
                            to={`/post-a-job/${item.value}`}
                            className="mostRecentCategories_box"
                            key={item.id || index}
                          >
                            <div className="mostRecentCategories_boxe-icon">
                              <img src={item.icon} alt={item.name} />
                            </div>
                            <p>{item.name}</p>
                          </Link>
                        ))}
                      </div>
                    )}
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
