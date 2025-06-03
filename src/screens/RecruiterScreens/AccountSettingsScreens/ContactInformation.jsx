import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

const ContactInformation = () => {
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
    <RecruiterAccountSettingLayout>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='userName' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Name'
                id='userName'
                name='userName'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Address'
                id='address'
                name='address'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Email'
                id='email'
                name='email'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='phone' className='form-label'>
                Phone
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Phone'
                id='phone'
                name='phone'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <button type='submit' className='customBtn btn-bgRed'>
              Update{' '}
            </button>
          </div>
        </div>
      </form>
    </RecruiterAccountSettingLayout>
  );
};

export default ContactInformation;
