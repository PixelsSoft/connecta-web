import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

import checkIcon from '../../../assets/images/check-icon.png';
import deleteIcon from '../../../assets/images/delete-icon.png';

import checkLgIcon from '../../../assets/images/check-lg-icon.png';
import deleteLgIcon from '../../../assets/images/delete-lg-icon.png';

const ManageAccount = () => {
  return (
    <>
      <RecruiterAccountSettingLayout>
        <div className='row'>
          <div className='col-md-12'>
            <div className='account__manageBoxes'>
              {/* Verify Box */}
              <div className='account__manageBox'>
                <h4>Account Verification</h4>
                <div className='account__manageBox-content'>
                  <div className='account__manageBox-content-withIcon'>
                    <div className='account__manageBox-content-withIcon-icon'>
                      <img src={checkIcon} alt='' />
                    </div>
                    <div className='account__manageBox-content-withIcon-content'>
                      <h5>Verify Account</h5>
                      <p>
                        kindly verify your account with your email or phone no
                        an otp sent to your email address for verifications
                      </p>
                    </div>
                  </div>
                  <button className='customBtn btn-bgRed'>Verify</button>
                </div>
              </div>

              {/* Delete Box */}
              <div className='account__manageBox'>
                <h4>Delete Account</h4>
                <div className='account__manageBox-content'>
                  <div className='account__manageBox-content-withIcon'>
                    <div className='account__manageBox-content-withIcon-icon'>
                      <img src={deleteIcon} alt='' />
                    </div>
                    <div className='account__manageBox-content-withIcon-content'>
                      <h5>Delete Account</h5>
                      <p>
                        kindly verify your account with your email or phone no
                        an otp sent to your email address for verifications
                      </p>
                    </div>
                  </div>
                  <button className='customBtn btn-bgRed'>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RecruiterAccountSettingLayout>
    </>
  );
};

export default ManageAccount;
