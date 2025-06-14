import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

import checkIcon from '../../../assets/images/check-icon.png';
import deleteIcon from '../../../assets/images/delete-icon.png';

import checkLgIcon from '../../../assets/images/check-lg-icon.png';
import deleteLgIcon from '../../../assets/images/delete-lg-icon.png';
import CustomModal from '../../../components/CustomModal';
import { Form } from 'react-bootstrap';

const ManageAccount = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
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
                  <button
                    className='customBtn btn-bgRed'
                    // onClick={() => setShowVerifyModal(true)}
                  >
                    Verify
                  </button>
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

      <CustomModal
        show={showVerifyModal}
        handleClose={() => setShowVerifyModal(false)}
        // title='Verify Account'
        size='sm'
      >
        <div className='emailVerificationModal'>
          <p>Please enter the verification code sent to your email.</p>
          <div className='row justify-content-center my-3'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='col-3'>
                <Form.Control maxLength={1} className='text-center' />
              </div>
            ))}
          </div>
          <button className='w-100 customBtn btn-bgRed'>Verify</button>
        </div>
      </CustomModal>
    </>
  );
};

export default ManageAccount;
