import React from 'react';
import UserAccountSettingLayout from '../../../components/Layouts/UserLayout/UserAccountSettingLayout';

import walletIcon from '../../../assets/images/wallet-icon.png';

const PaymentMethod = () => {
  return (
    <UserAccountSettingLayout>
      <div className='row'>
        <div className='col-md-12'>
          <div className='account__manageBoxes'>
            <div className='account__manageBox'>
              <h4>Payments</h4>
              <div className='account__manageBox-content'>
                <div className='account__manageBox-content-withIcon'>
                  <div className='account__manageBox-content-withIcon-icon'>
                    <img src={walletIcon} alt='' />
                  </div>
                  <div className='account__manageBox-content-withIcon-content'>
                    <h5>No platform payments required</h5>
                    <p>
                      Connecta24 does not process payments between you and professionals.
                      You agree on price and payment directly after a professional contacts you.
                    </p>
                    <p className='text-muted small mb-0'>
                      Professionals pay a one-time lead fee to unlock your contact details.
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
