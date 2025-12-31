import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';
import { useTranslation } from 'react-i18next';
import { getAllCategories } from '../../../data/categoriesData';

const ContactInformation = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    category: '',
    description: '',
    experience: '',
    rate: '',
    rateType: 'hourly',
    serviceArea: '',
  });

  const handleChanges = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? value : type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can now send `formData` to an API or handle validation
  };

  const categories = getAllCategories();

  return (
    <RecruiterAccountSettingLayout>
      <div>
        <div className='sec-head mb-4'>
          <h2>{t('profile.myProfile')}</h2>
          <p className='mt-2'>{t('profile.profileSubtext')}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-12 mb-4'>
              <div className='inputGroup'>
                <label htmlFor='profilePhoto' className='form-label'>
                  {t('profile.profilePhoto')}
                </label>
                <input
                  type='file'
                  className='form-control'
                  id='profilePhoto'
                  name='profilePhoto'
                  accept='image/*'
                  onChange={handleChanges}
                />
                <small className='form-text text-muted mt-2 d-block'>
                  Upload your profile photo
                </small>
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='name' className='form-label'>
                  {t('forms.fullName')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder={t('forms.fullName')}
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='businessName' className='form-label'>
                  {t('profile.businessName')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder={t('profile.businessName')}
                  id='businessName'
                  name='businessName'
                  value={formData.businessName}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='category' className='form-label'>
                  {t('profile.category')}
                </label>
                <select
                  className='form-control form-select'
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChanges}
                >
                  <option value='' disabled>
                    {t('setupProfile.selectCategory')}
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='experience' className='form-label'>
                  {t('profile.experience')}
                </label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='0'
                  id='experience'
                  name='experience'
                  value={formData.experience}
                  onChange={handleChanges}
                  min='0'
                />
                <small className='form-text text-muted mt-1 d-block'>
                  Years of experience
                </small>
              </div>
            </div>

            <div className='col-md-12 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='description' className='form-label'>
                  {t('profile.description')}
                </label>
                <textarea
                  className='form-control'
                  rows='5'
                  placeholder={t('profile.description')}
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label className='form-label'>
                  {t('profile.rate')}
                </label>
                <div className='rateType-radioButtons'>
                  <div className='form-check paintJobRadio'>
                    <label className='form-check-label' htmlFor='hourlyRateRecruiter'>
                      <span>{t('setupProfile.hourlyRate')}</span>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='rateType'
                        id='hourlyRateRecruiter'
                        value='hourly'
                        checked={formData.rateType === 'hourly'}
                        onChange={handleChanges}
                      />
                    </label>
                  </div>
                  <div className='form-check paintJobRadio'>
                    <label className='form-check-label' htmlFor='fixedRateRecruiter'>
                      <span>{t('setupProfile.fixedRate')}</span>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='rateType'
                        id='fixedRateRecruiter'
                        value='fixed'
                        checked={formData.rateType === 'fixed'}
                        onChange={handleChanges}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type='text'
                  className='form-control mt-2'
                  placeholder='Enter rate'
                  id='rate'
                  name='rate'
                  value={formData.rate}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='serviceArea' className='form-label'>
                  {t('profile.serviceArea')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder={t('profile.serviceArea')}
                  id='serviceArea'
                  name='serviceArea'
                  value={formData.serviceArea}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-md-12 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='portfolio' className='form-label'>
                  {t('profile.portfolio')}
                </label>
                <input
                  type='file'
                  className='form-control'
                  id='portfolio'
                  name='portfolio'
                  multiple
                  accept='image/*'
                  onChange={handleChanges}
                />
                <small className='form-text text-muted mt-2 d-block'>
                  {t('jobPosting.uploadHelpText')}
                </small>
              </div>
            </div>

            <div className='col-md-12 mb-3'>
              <p className='text-muted small'>
                <em>{t('profile.profileTip')}</em>
              </p>
            </div>

            <div className='col-md-12'>
              <div className='d-flex gap-3'>
                <button type='submit' className='customBtn btn-bgRed'>
                  {t('profile.editProfile')}
                </button>
                <button type='button' className='customBtn btn-bgBlack'>
                  {t('profile.viewPublicProfile')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </RecruiterAccountSettingLayout>
  );
};

export default ContactInformation;
