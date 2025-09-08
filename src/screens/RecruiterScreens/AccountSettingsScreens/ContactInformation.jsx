import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';
import { useTranslation } from 'react-i18next';

const ContactInformation = () => {
  const { t } = useTranslation('common');
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
                {t('forms.fullName')}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder={t('forms.fullName')}
                id='userName'
                name='userName'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='address' className='form-label'>
                {t('recruiter.address')}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder={t('recruiter.address')}
                id='address'
                name='address'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='email' className='form-label'>
                {t('forms.email')}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder={t('forms.email')}
                id='email'
                name='email'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-lg-6 mb-md-4 mb-3'>
            <div className='inputGroup'>
              <label htmlFor='phone' className='form-label'>
                {t('forms.phone')}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder={t('forms.phone')}
                id='phone'
                name='phone'
                onChange={handleChanges}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <button type='submit' className='customBtn btn-bgRed'>
              {t('buttons.update')}
            </button>
          </div>
        </div>
      </form>
    </RecruiterAccountSettingLayout>
  );
};

export default ContactInformation;
