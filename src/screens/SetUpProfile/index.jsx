import React, { useEffect, useState } from 'react';
import './style.css';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';

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

const servicesCheckBoxes = [
  { label: 'Painting', value: 'painting', icon: paintingIcon },
  { label: 'Home Repairing', value: 'home_repairing', icon: homeRepairingIcon },
  { label: 'Gardening', value: 'gardening', icon: gardeningIcon },
  { label: 'Electrician', value: 'electrician', icon: electricianIcon },
  { label: 'Cleaning', value: 'cleaning', icon: cleaningIcon },
  {
    label: 'Kitchen Repairing',
    value: 'kitchen_repairing',
    icon: kitchenRepairingIcon,
  },
  { label: 'Plumbing', value: 'plumbing', icon: plumbingIcon },
  {
    label: 'Architectural Services',
    value: 'architectural',
    icon: architecturalServicesIcon,
  },
  { label: 'Chimney', value: 'chimney', icon: chimneyIcon },
  { label: 'Brick Laying', value: 'brick_laying', icon: brickLayingIcon },
];

const SetUpProfile = () => {
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
        <span>Personal Details</span>
      </div>
      <div className='step-labelContent'>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          2{/* {subStep ? `.${subStep}` : ''} */}
        </div>
        <span>Professional Skills</span>
      </div>
      <div className='step-labelContent'>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        <span>Banking Details</span>
      </div>
      <div className='step-labelContent'>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4</div>
        <span>Complete</span>
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
                                We need some information about your company
                              </h3>
                            </div>
                            <div className='row'>
                              <div className='col-md-6 mb-3'>
                                <div className='inputGroup'>
                                  <label
                                    htmlFor='companyName'
                                    className='form-label'
                                  >
                                    Company Name
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Company Name'
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
                                    UID/MWST Number
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Type number here'
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
                                    Email Address
                                  </label>
                                  <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Email'
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
                                    Company Phone No
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Company Phone No'
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
                                    Company Address
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Company Address'
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
                                    Postal Code
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Postal Code'
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
                                    Company website (optional)
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Company website'
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
                                    How many workers do you have
                                  </label>
                                  <select
                                    className='form-control form-select'
                                    id='totalWorker'
                                    name='totalWorker'
                                    onChange={handleChanges}
                                    defaultValue=''
                                  >
                                    <option value='' disabled>
                                      Select Total Workers
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
                                  What skills do you have?
                                </label>
                                <select
                                  className='form-control form-select'
                                  id='totalWorker'
                                  name='totalWorker'
                                  onChange={handleChanges}
                                  defaultValue=''
                                >
                                  <option value='' disabled>
                                    Select Category
                                  </option>
                                  <option value='Bathroom Fitting'>
                                    Bathroom Fitting
                                  </option>
                                  <option value='Electrical Services'>
                                    Electrical Services
                                  </option>
                                  <option value='Carpentry Services'>
                                    Carpentry Services
                                  </option>
                                  <option value='Painting and Decorating'>
                                    Painting and Decorating
                                  </option>
                                  <option value='Tiling and Flooring'>
                                    Tiling and Flooring
                                  </option>
                                  <option value='Roofing Services'>
                                    Roofing Services
                                  </option>
                                  <option value='Landscaping and Gardening'>
                                    Landscaping and Gardening
                                  </option>
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
                                  How far can you travel for work from your
                                  area?
                                </h5>
                                <p>
                                  Search your area below pin your location and
                                  set maximum distance you are willing to travel
                                  from your Location.
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
                                    placeholder='Search Location'
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
                                    I work throughout the UK
                                  </label>
                                </div>
                              </div>

                              <div className='trave__limit'>
                                <div className='trave__limit-head'>
                                  <h5>Set your Travel Limit here.</h5>
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
                                      {mile.toString().padStart(2, '0')} miles
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
                                <h3>Banking info</h3>
                                <p>
                                  We use identity verification to ensure your
                                  security and keep Connecta24 safe. Your ID
                                  will be handled securely and will never be
                                  shared with anyone.
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
                                          Card Holder Name
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Jon Doe'
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
                                          Card Number
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
                                          Expiry Date
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
                                          CVV
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
                                          Card Holder Name
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
                                          Card Number
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
                                          Expiry Date
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
                                          CVV
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
                                          TWINT Phone Number
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
                              <h4>Profile setup completed!</h4>
                              <button
                                className='customBtn btn-bgRed'
                                onClick={() => navigate('/user/saved-leads')}
                              >
                                Browse Leads
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
