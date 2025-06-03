import React, { useState } from 'react';
import UserAccountSettingLayout from '../../../components/Layouts/UserLayout/UserAccountSettingLayout';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({});

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can now send `formData` to an API or handle validation
  };
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
