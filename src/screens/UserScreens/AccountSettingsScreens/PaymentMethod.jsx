import React from 'react';
import UserAccountSettingLayout from '../../../components/Layouts/UserLayout/UserAccountSettingLayout';

import checkIcon from '../../../assets/images/check-icon.png';
import deleteIcon from '../../../assets/images/delete-icon.png';
import walletIcon from '../../../assets/images/wallet-icon.png';

const PaymentMethod = () => {
  return (
    <UserAccountSettingLayout>
      <div className='row'>
        <div className='col-md-12'>
          <div className='account__manageBoxes'>
            {/* Verify Box */}
            <div className='account__manageBox'>
              <h4>Payment Method</h4>
              <div className='account__manageBox-content'>
                <div className='account__manageBox-content-withIcon'>
                  <div className='account__manageBox-content-withIcon-icon'>
                    <img src={walletIcon} alt='' />
                  </div>
                  <div className='account__manageBox-content-withIcon-content'>
                    <h5>Connect Payment Method</h5>
                    <p>
                      kindly verify your account with your email or phone no an
                      otp sent to your email address for verifications
                    </p>
                  </div>
                </div>
                <button className='customBtn btn-bgRed'>Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserAccountSettingLayout>
  );
};

export default PaymentMethod;
