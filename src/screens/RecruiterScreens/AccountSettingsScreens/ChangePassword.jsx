import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';
import PasswordField from '../../../components/PasswordField';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
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
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-12-6 mb-4'>
                <PasswordField
                  label='Old Password'
                  name='oldPassword'
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
              </div>
              <div className='col-12-6 mb-4'>
                <PasswordField
                  label='New Password'
                  placeholder={'New password'}
                  name='newPassword'
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className='col-12-6 mb-4'>
                <PasswordField
                  label='Confirm Password'
                  placeholder={'Confirm password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className='col-md-12'>
                <button type='submit' className='customBtn btn-bgRed'>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </RecruiterAccountSettingLayout>
  );
};

export default ChangePassword;
