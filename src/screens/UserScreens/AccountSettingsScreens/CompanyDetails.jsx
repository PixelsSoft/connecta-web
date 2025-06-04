import React, { useEffect, useState } from 'react';
import UserAccountSettingLayout from '../../../components/Layouts/UserLayout/UserAccountSettingLayout';
import { BiSearch } from 'react-icons/bi';

import paintingIcon from '../../../assets/images/painting-icon.png';
import homeRepairingIcon from '../../../assets/images/homeRepairing-icon.png';

import redcheckicon from '../../../assets/images/red-check-icon.png';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({
    selectedServices: [],
  });

  const [distance, setDistance] = useState(30);
  const options = [5, 10, 20, 30];

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can now send `formData` to an API or handle validation
  };

  useEffect(() => {
    const slider = document.querySelector('.form-range');
    if (slider) {
      slider.style.setProperty('--value', distance);
    }
  }, [distance]);
  return (
    <UserAccountSettingLayout>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='compny__detail-title'>Company Info</h4>
          </div>
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='companyName' className='form-label'>
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
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='UIDMWSTNumber' className='form-label'>
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
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                id='email'
                name='email'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='companyPhoneNo' className='form-label'>
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
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='companyAddress' className='form-label'>
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
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='postalCode' className='form-label'>
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
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='companywebsite' className='form-label'>
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
          <div className='col-lg-6 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='totalWorker' className='form-label'>
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
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6+'>6+</option>
              </select>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='companyDetail-serviceBox'>
              <h4 className='compny__detail-title'>Services</h4>
              <div className='inputGroup mb-3'>
                <label htmlFor='totalWorker' className='form-label'>
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
                  <option value='Bathroom Fitting'>Bathroom Fitting</option>
                  <option value='Electrical Services'>
                    Electrical Services
                  </option>
                  <option value='Carpentry Services'>Carpentry Services</option>
                  <option value='Painting and Decorating'>
                    Painting and Decorating
                  </option>
                  <option value='Tiling and Flooring'>
                    Tiling and Flooring
                  </option>
                  <option value='Roofing Services'>Roofing Services</option>
                  <option value='Landscaping and Gardening'>
                    Landscaping and Gardening
                  </option>
                </select>
              </div>

              <div className='customCheckBoxes'>
                {[
                  { label: 'Painting', value: 'painting', icon: paintingIcon },
                  {
                    label: 'Home Repairing',
                    value: 'home_repairing',
                    icon: homeRepairingIcon,
                  },
                ].map((service) => (
                  <label className='customCheck-wrapper' key={service.value}>
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
                      <span className='customCheck-label'>{service.label}</span>
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
          </div>

          <div className='col-md-12'>
            <div className='travelForWork'>
              {/* <div className='travelForWork-head'>
                <h5>How far can you travel for work from your area?</h5>
                <p>
                  Search your area below pin your location and set maximum
                  distance you are willing to travel from your Location.
                </p>
              </div> */}
              <h2 className='compny__detail-title'>Work Area</h2>

              <div className='travelForWork-search-box'>
                <div className='input-group'>
                  <button className='btn' type='button' id='button-addon2'>
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
                  <label class='form-check-label' for='wordThroughoutUk'>
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
                  onChange={(e) => setDistance(Number(e.target.value))}
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

          <div className='col-md-12'>
            <button type='submit' className='customBtn btn-bgRed'>
              Update{' '}
            </button>
          </div>
        </div>
      </form>
    </UserAccountSettingLayout>
  );
};

export default CompanyDetails;
