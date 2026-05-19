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
                    <h5>Pay with Stripe</h5>
                    <p>
                      When you accept a professional&apos;s quote on a job, you will be
                      redirected to Stripe Checkout to pay securely.
                    </p>
                  </div>
                </div>
                <button
                  type='button'
                  className='customBtn btn-bgRed'
                  onClick={() => { window.location.href = '/user/posted-jobs'; }}
                >
                  View My Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserAccountSettingLayout>
  );
};

export default PaymentMethod;
