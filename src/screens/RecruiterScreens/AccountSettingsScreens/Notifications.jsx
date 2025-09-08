import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

import newsletterIcon from '../../../assets/images/newsletter-icon.png';
import messageIcon from '../../../assets/images/message-icon.png';
import emailNotificationIcon from '../../../assets/images/email-notification-icon.png';

import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
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
      <div className='notification-preference'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='notification-preference-head'>
              <h3>{t('recruiter.notificationPreferences')}</h3>
              <p>
                {t('recruiter.notificationPreferencesDescription')}
              </p>
            </div>
          </div>
          <div className='col-md-12 mb-4'>
            <div className='inputGroup'>
              <label htmlFor='emailAddress' className='form-label'>
                {t('recruiter.emailAddressRequired')}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder=''
                id='emailAddress'
                name='emailAddress'
                onChange={handleChanges}
              />
              <p className='text-muted'>{t('recruiter.requiredForNotifications')}</p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='notification-preference-actions'>
              <div className='account__manageBox-content'>
                <div className='account__manageBox-content-withIcon'>
                  <div className='account__manageBox-content-withIcon-icon'>
                    <img src={newsletterIcon} alt='' />
                  </div>
                  <div className='account__manageBox-content-withIcon-content'>
                    <h5>{t('recruiter.ourNewsletter')}</h5>
                    <p>{t('recruiter.newsletterDescription')}</p>
                  </div>
                </div>
                {/* <button className='customBtn btn-bgRed'>Verify</button> */}
                <Form.Check
                  type='switch'
                  // id='custom-switch'
                  // label='Enable feature'
                  className='custom-switch'
                />
              </div>
              <div className='account__manageBox-content'>
                <div className='account__manageBox-content-withIcon'>
                  <div className='account__manageBox-content-withIcon-icon'>
                    <img src={messageIcon} alt='' />
                  </div>
                  <div className='account__manageBox-content-withIcon-content'>
                    <h5>{t('recruiter.message')}</h5>
                    <p>{t('recruiter.messageDescription')}</p>
                  </div>
                </div>
                {/* <button className='customBtn btn-bgRed'>Verify</button> */}
                <Form.Check
                  type='switch'
                  // id='custom-switch'
                  // label='Enable feature'
                  className='custom-switch'
                />
              </div>
              <div className='account__manageBox-content'>
                <div className='account__manageBox-content-withIcon'>
                  <div className='account__manageBox-content-withIcon-icon'>
                    <img src={emailNotificationIcon} alt='' />
                  </div>
                  <div className='account__manageBox-content-withIcon-content'>
                    <h5>{t('recruiter.emailNotification')}</h5>
                    <p>
                      {t('recruiter.emailNotificationDescription')}
                    </p>
                  </div>
                </div>
                {/* <button className='customBtn btn-bgRed'>Verify</button> */}
                <Form.Check
                  type='switch'
                  // id='custom-switch'
                  // label='Enable feature'
                  className='custom-switch'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecruiterAccountSettingLayout>
  );
};

export default Notifications;
