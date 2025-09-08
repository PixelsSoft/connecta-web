import React, { useEffect, useState } from 'react';
import './style.css';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { useTranslation } from 'react-i18next';

import redcheckicon from '../../assets/images/red-check-icon.png';

import paintingIcon from '../../assets/images/painting-icon.png';
import homeRepairingIcon from '../../assets/images/homeRepairing-icon.png';
import gardeningIcon from '../../assets/images/gardening-icon.png';
import electricianIcon from '../../assets/images/electrician-icon.png';
import cleaningIcon from '../../assets/images/cleaning-icon.png';
import kitchenRepairingIcon from '../../assets/images/kitchenRepairing-icon.png';
import plumbingIcon from '../../assets/images/plumbing-icon.png';
import architecturalServicesIcon from '../../assets/images/architecturalServices-icon.png';
import chimneyIcon from '../../assets/images/chimney-icon.png';
import brickLayingIcon from '../../assets/images/brickLaying-icon.png';

import masterCardIcon from '../../assets/images/master-card-icon.png';
import visaCardIcon from '../../assets/images/visa-card-icon.png';
import twintCardIcon from '../../assets/images/twint-card-icon.png';

import profileCompletedIcon from '../../assets/images/profile-completed-icon.png';

import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../data/categoriesData';

// categories new icon
import DesignAnplainingicon from '../../assets/images/category-icons/DesignAnplaining-icon.png';
import GardenAndOutdoorIcon from '../../assets/images/category-icons/GardenAndOutdoor-icon.png';
import ProjectManagementIcon from '../../assets/images/category-icons/ProjectManagement-icon.png';
import OutdoorAndLandscapingIcon from '../../assets/images/category-icons/OutdoorAndLandscaping-icon.png';
import MediaAndCreativeIcon from '../../assets/images/category-icons/MediaAndCreative-icon.png';
import RentalAndEquipmentIcon from '../../assets/images/category-icons/RentalAndEquipment-icon.png';
import BusinessAndFacilityServicesIcon from '../../assets/images/category-icons/BusinessAndFacilityServices-icon.png';
import HomeAndComfortIcon from '../../assets/images/category-icons/HomeAndComfort-icon.png';
import MaintenanceAndRepairingIcon from '../../assets/images/category-icons/MaintenanceAndRepairing-icon.png';
import TechnicalAndConstructionIcon from '../../assets/images/category-icons/TechnicalAndConstruction-icon.png';
import AdministrativeAndPermitsIcon from '../../assets/images/category-icons/AdministrativeAndPermits-icon.png';
import DigitalAndTechIcon from '../../assets/images/category-icons/DigitalAndTech-icon.png';
import CleaningServicesIcon from '../../assets/images/category-icons/CleaningServices-icon.png';
import InteriorAndFinishingIcon from '../../assets/images/category-icons/InteriorAndFinishing-icon.png';
import TransportAndMovingIcon from '../../assets/images/category-icons/TransportAndMoving-icon.png';
import TechnicalAndInstallationIcon from '../../assets/images/category-icons/TechnicalAndInstallation-icon.png';

// Icon mapping for categories (same as in FindProfessional)
const iconMapping = {
  "Cleaning Services": CleaningServicesIcon,
  "Technical & Construction": TechnicalAndConstructionIcon,
  "Garden & Outdoor": GardenAndOutdoorIcon,
  "Home & Comfort": HomeAndComfortIcon,
  "Design & Planning": DesignAnplainingicon,
  "Maintenance & Repairs": MaintenanceAndRepairingIcon,
  "Digital & Tech": DigitalAndTechIcon,
  "Media & Creative": MediaAndCreativeIcon,
  "Business & Facility Services": BusinessAndFacilityServicesIcon,
  "Transport & Moving": TransportAndMovingIcon,
  "Rental & Equipment": RentalAndEquipmentIcon,
  "Project Management": ProjectManagementIcon,
  "Administrative & Permits": AdministrativeAndPermitsIcon,
  "Outdoor & Landscaping": OutdoorAndLandscapingIcon,
  "Interior & Finishing": InteriorAndFinishingIcon,
  "Technical & Installation": TechnicalAndInstallationIcon,
  "Specialist Services": DesignAnplainingicon, // Default icon
};

// Get dynamic category data (same as in FindProfessional)
const servicesCheckBoxes = getAllCategories().map(category => ({
  label: category.name,
  value: category.name.replace(/\s+/g, '-'),
  icon: iconMapping[category.name] || DesignAnplainingicon,
}));

const SetUpProfile = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    selectedServices: [],
  });
  const [checked, setChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1); // for step 2

  const [distance, setDistance] = useState(30);
  const options = [5, 10, 20, 30];

  const [selectedMethod, setSelectedMethod] = useState('mastercard');

  const navigate = useNavigate();

  const handleChanges = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      //   [name]: value,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevData) => {
      const updated = checked
        ? [...prevData.selectedServices, value]
        : prevData.selectedServices.filter((v) => v !== value);

      return {
        ...prevData,
        selectedServices: updated,
      };
    });
  };

  const handleNext = () => {
    if (step === 2 && subStep < 2) {
      setSubStep((prev) => prev + 1);
    } else {
      setStep((prev) => prev + 1);
      setSubStep(1);
    }
  };

  const handleBack = () => {
    if (step === 2 && subStep > 1) {
      setSubStep((prev) => prev - 1);
    } else if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const slider = document.querySelector('.form-range');
    if (slider) {
      slider.style.setProperty('--value', distance);
    }
  }, [distance]);

  const renderStepIndicator = () => (
    <div className='steps'>
      <div className='step-labelContent'>
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
        <span>{t('setupProfile.personalDetails')}</span>
      </div>
      <div className='step-labelContent'>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          2{/* {subStep ? `.${subStep}` : ''} */}
        </div>
        <span>{t('setupProfile.professionalSkills')}</span>
      </div>
      <div className='step-labelContent'>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        <span>{t('setupProfile.bankingDetails')}</span>
      </div>
      <div className='step-labelContent'>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4</div>
        <span>{t('setupProfile.complete')}</span>
      </div>
      {/* <div className={`step ${step >= 5 ? 'active' : ''}`}>5</div> */}
    </div>
  );

  return (
    <DefaultLayout2>
      <section className='user__profile-setUp'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-10 col-xl-11'>
              <div className='multi-step-form'>
                <div className='row justify-content-center'>
                  <div className='col-md-12'>{renderStepIndicator()}</div>
                  <div className='col-xxl-8'>
                    <div className='step-content'>
                      <div className='step-content'>
                        {step === 1 && (
                          <div className='step-1-content'>
                            <div className='sec-head'>
                              <h3>
                                {t('setupProfile.companyInfoHeading')}
                              </h3>
                            </div>
                            <div className='row'>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='companyName'
                                    className='form-label'
                                  >
                                    {t('setupProfile.companyName')}
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.companyName')}
                                    id='companyName'
                                    name='companyName'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='UIDMWSTNumber'
                                    className='form-label'
                                  >
                                    {t('setupProfile.uidMwstNumber')}
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.typeNumberHere')}
                                    id='UIDMWSTNumber'
                                    name='UIDMWSTNumber'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='emailAddress'
                                    className='form-label'
                                  >
                                    {t('forms.email')}
                                  </label>
                                  <input
                                    type='email'
                                    className='form-control'
                                    placeholder={t('forms.email')}
                                    id='emailAddress'
                                    name='emailAddress'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='companyPhoneNo'
                                    className='form-label'
                                  >
                                    {t('setupProfile.companyPhoneNo')}
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.companyPhoneNo')}
                                    id='companyPhoneNo'
                                    name='companyPhoneNo'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='companyAddress'
                                    className='form-label'
                                  >
                                    {t('setupProfile.companyAddress')}
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.companyAddress')}
                                    id='companyAddress'
                                    name='companyAddress'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='postalCode'
                                    className='form-label'
                                  >
                                    {t('setupProfile.postalCode')}
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.postalCode')}
                                    id='postalCode'
                                    name='postalCode'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='companywebsite'
                                    className='form-label'
                                  >
                                    {t('setupProfile.companyWebsiteOptional')}
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.companyWebsite')}
                                    id='companywebsite'
                                    name='companywebsite'
                                    onChange={handleChanges}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='totalWorker'
                                    className='form-label'
                                  >
                                    {t('setupProfile.howManyWorkers')}
                                  </label>
                                  <select
                                    className='form-control form-select'
                                    id='totalWorker'
                                    name='totalWorker'
                                    onChange={handleChanges}
                                    defaultValue=''
                                  >
                                    <option value='' disabled>
                                      {t('setupProfile.selectTotalWorkers')}
                                    </option>
                                    <option value='1 to 10'>1 to 10</option>
                                    <option value='1 to 50'>1 to 50</option>
                                    <option value='1 to 200'>1 to 200</option>
                                    <option value='1 to 500'>1 to 500</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && subStep === 1 && (
                          <div className='step-content-2'>
                            <div className='col-md-12 mb-3'>
                              <div className='inputGroup'>
                                <label
                                  htmlFor='totalWorker'
                                  className='form-label'
                                >
                                  {t('setupProfile.whatSkillsDoYouHave')}
                                </label>
                                <select
                                  className='form-control form-select'
                                  id='totalWorker'
                                  name='totalWorker'
                                  onChange={handleChanges}
                                  defaultValue=''
                                >
                                  <option value='' disabled>
                                    {t('setupProfile.selectCategory')}
                                  </option>
                                  {servicesCheckBoxes.map((category, index) => (
                                    <option
                                      value={category.value}
                                      key={index}
                                    >
                                      {category.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className='customCheckBoxes'>
                              {servicesCheckBoxes.map((service) => (
                                <label
                                  className='customCheck-wrapper'
                                  key={service.value}
                                >
                                  <input
                                    type='checkbox'
                                    value={service.value}
                                    checked={formData.selectedServices.includes(
                                      service.value
                                    )}
                                    onChange={handleCheckboxChange}
                                  />
                                  <div className='customCheck-box'>
                                    <img
                                      src={service.icon}
                                      className='customCheck-img'
                                      alt={service.label}
                                    />
                                    <span className='customCheck-label'>
                                      {service.label}
                                    </span>
                                    <img
                                      src={redcheckicon}
                                      className='customCheck-icon'
                                      alt='Check'
                                    />
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                        {step === 2 && subStep === 2 && (
                          <div className='step-content-2-2'>
                            <div className='travelForWork'>
                              <div className='travelForWork-head'>
                                <h5>
                                  {t('setupProfile.howFarCanYouTravel')}
                                </h5>
                                <p>
                                  {t('setupProfile.travelDescription')}
                                </p>
                              </div>

                              <div className='travelForWork-search-box'>
                                <div className='input-group'>
                                  <button
                                    className='btn'
                                    type='button'
                                    id='button-addon2'
                                  >
                                    <BiSearch />
                                  </button>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder={t('setupProfile.searchLocation')}
                                  />
                                </div>
                              </div>

                              <div className='travelForWork-map'>
                                <iframe
                                  src='https://www.google.com/maps/embed?pb=!1m16!1m10!1m3!1d579466.9616788006!2d-119.72931949194717!3d36.62341716437833!2m1!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia!5e0!3m2!1sen!2sus!4v1748899376650!5m2!1sen!2sus'
                                  width='100%'
                                  style={{ border: 0 }}
                                  allowFullScreen=''
                                  loading='lazy'
                                  referrerPolicy='no-referrer-when-downgrade'
                                  title='Zoomed California Map'
                                />
                              </div>

                              <div className='authForm-checkBoxes'>
                                <div class='form-check'>
                                  <input
                                    class='form-check-input'
                                    type='checkbox'
                                    value=''
                                    id='wordThroughoutUk'
                                  />
                                  <label
                                    class='form-check-label'
                                    for='wordThroughoutUk'
                                  >
                                    {t('setupProfile.workThroughoutUk')}
                                  </label>
                                </div>
                              </div>

                              <div className='trave__limit'>
                                <div className='trave__limit-head'>
                                  <h5>{t('setupProfile.setTravelLimit')}</h5>
                                </div>

                                <input
                                  type='range'
                                  min='5'
                                  max='30'
                                  step='5'
                                  value={distance}
                                  onChange={(e) =>
                                    setDistance(Number(e.target.value))
                                  }
                                  className='form-range'
                                />

                                <div className='distance-buttons'>
                                  {options.map((mile) => (
                                    <button
                                      key={mile}
                                      onClick={() => setDistance(mile)}
                                      className={`distance-btn ${
                                        distance === mile ? 'active' : ''
                                      }`}
                                    >
                                      {mile.toString().padStart(2, '0')} {t('setupProfile.miles')}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className='step-content-3'>
                            <div className='bankingInfo'>
                              <div className='bankingInfo-head'>
                                <h3>{t('setupProfile.bankingInfo')}</h3>
                                <p>
                                  {t('setupProfile.bankingDescription')}
                                </p>
                              </div>

                              <div className='payment-tabs'>
                                <button
                                  className={
                                    selectedMethod === 'mastercard'
                                      ? 'tab-button active'
                                      : 'tab-button'
                                  }
                                  onClick={() =>
                                    setSelectedMethod('mastercard')
                                  }
                                >
                                  <img src={masterCardIcon} alt='' />
                                </button>
                                <button
                                  className={
                                    selectedMethod === 'visa'
                                      ? 'tab-button active'
                                      : 'tab-button'
                                  }
                                  onClick={() => setSelectedMethod('visa')}
                                >
                                  <img src={visaCardIcon} alt='' />
                                </button>
                                <button
                                  className={
                                    selectedMethod === 'twint'
                                      ? 'tab-button active'
                                      : 'tab-button'
                                  }
                                  onClick={() => setSelectedMethod('twint')}
                                >
                                  <img src={twintCardIcon} alt='' />
                                </button>
                              </div>

                              {selectedMethod === 'mastercard' && (
                                <>
                                  <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='cardHolderName'
                                          className='form-label'
                                        >
                                          {t('setupProfile.cardHolderName')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder={t('setupProfile.cardHolderName')}
                                          id='cardHolderName'
                                          name='cardHolderName'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='cardNumber'
                                          className='form-label'
                                        >
                                          {t('setupProfile.cardNumber')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='4555 4555 4555 1222'
                                          id='cardNumber'
                                          name='cardNumber'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='cardExpDate'
                                          className='form-label'
                                        >
                                          {t('setupProfile.expiryDate')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='02 -22'
                                          id='cardExpDate'
                                          name='cardExpDate'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='cardExpDate'
                                          className='form-label'
                                        >
                                          {t('setupProfile.cvv')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='CVV'
                                          id='cardExpDate'
                                          name='cardExpDate'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {selectedMethod === 'visa' && (
                                <>
                                  <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='visaCardHolderName'
                                          className='form-label'
                                        >
                                          {t('setupProfile.cardHolderName')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Jane Doe'
                                          id='visaCardHolderName'
                                          name='visaCardHolderName'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='visaCardNumber'
                                          className='form-label'
                                        >
                                          {t('setupProfile.cardNumber')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='4111 1111 1111 1111'
                                          id='visaCardNumber'
                                          name='visaCardNumber'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='visaExpDate'
                                          className='form-label'
                                        >
                                          {t('setupProfile.expiryDate')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='03 -24'
                                          id='visaExpDate'
                                          name='visaExpDate'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='visaCvv'
                                          className='form-label'
                                        >
                                          {t('setupProfile.cvv')}
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='CVV'
                                          id='visaCvv'
                                          name='visaCvv'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {selectedMethod === 'twint' && (
                                <>
                                  <div className='row'>
                                    <div className='col-md-12 mb-3'>
                                      <div className='inputGroup'>
                                        <label
                                          htmlFor='twintPhone'
                                          className='form-label'
                                        >
                                          {t('setupProfile.twintPhoneNumber')}
                                        </label>
                                        <input
                                          type='tel'
                                          className='form-control'
                                          placeholder='+41 79 123 45 67'
                                          id='twintPhone'
                                          name='twintPhone'
                                          onChange={handleChanges}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                        {step === 4 && (
                          <div className='step-content-4'>
                            <div className='profileSetUpCompleted'>
                              <img src={profileCompletedIcon} alt='' />
                              <h4>{t('setupProfile.profileSetupCompleted')}</h4>
                              <button
                                className='customBtn btn-bgRed'
                                onClick={() => navigate('/user/saved-leads')}
                              >
                                {t('setupProfile.browseLeads')}
                              </button>
                            </div>
                          </div>
                        )}
                        {/* {step === 5 && <div>Step 5 - Complete</div>} */}
                      </div>
                    </div>

                    {/* <div className='step-buttons'>
                      {step > 1 && (
                        <button onClick={handleBack} className='customBtn'>
                          Back
                        </button>
                      )}
                      {step < 4 && (
                        <button
                          onClick={handleNext}
                          className='customBtn btn-bgRed'
                        >
                          Next
                        </button>
                      )}
                    </div> */}

                    <div className='step-buttons'>
                      {step > 1 && step < 4 && (
                        <button onClick={handleBack} className='customBtn'>
                          {t('buttons.back')}
                        </button>
                      )}
                      {step < 4 && (
                        <button
                          onClick={handleNext}
                          className='customBtn btn-bgRed'
                        >
                          {t('buttons.next')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default SetUpProfile;
