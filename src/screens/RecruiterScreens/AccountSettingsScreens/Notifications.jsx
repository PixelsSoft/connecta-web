import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

import newsletterIcon from '../../../assets/images/newsletter-icon.png';
import messageIcon from '../../../assets/images/message-icon.png';
import emailNotificationIcon from '../../../assets/images/email-notification-icon.png';

import Form from 'react-bootstrap/Form';

const Notifications = () => {
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
              <h3>Notification Preferences</h3>
              <p>
                Select the notificaitons ou would like to receive via email.
                Please note that you cannot opt out of receving service
                messages, such as payment, security or legal notifications.
              </p>
            </div>
          </div>
          <div className='col-md-12 mb-4'>
            <div className='inputGroup'>
              <label htmlFor='emailAddress' className='form-label'>
                Email Address*
              </label>
              <input
                type='text'
                className='form-control'
                placeholder=''
                id='emailAddress'
                name='emailAddress'
                onChange={handleChanges}
              />
              <p className='text-muted'>Required for notificaitons.</p>
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
                    <h5>Our newsletter</h5>
                    <p>We will always let you know about important changes</p>
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
                    <h5>Message</h5>
                    <p>You will be notified once the order is delivered</p>
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
                    <h5>Email Notification</h5>
                    <p>
                      Turn on email notificaiton to get updates through email
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
