import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

import checkIcon from '../../../assets/images/check-icon.png';
import deleteIcon from '../../../assets/images/delete-icon.png';

import checkLgIcon from '../../../assets/images/check-lg-icon.png';
import deleteLgIcon from '../../../assets/images/delete-lg-icon.png';
import CustomModal from '../../../components/CustomModal';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ManageAccount = () => {
  const { t } = useTranslation('common');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  return (
    <>
      <RecruiterAccountSettingLayout>
        <div className='row'>
          <div className='col-md-12'>
            <div className='account__manageBoxes'>
              {/* Verify Box */}
              <div className='account__manageBox'>
                <h4>{t('recruiter.accountVerification')}</h4>
                <div className='account__manageBox-content'>
                  <div className='account__manageBox-content-withIcon'>
                    <div className='account__manageBox-content-withIcon-icon'>
                      <img src={checkIcon} alt='' />
                    </div>
                    <div className='account__manageBox-content-withIcon-content'>
                      <h5>{t('recruiter.verifyAccount')}</h5>
                      <p>
                        {t('recruiter.verifyAccountDescription')}
                      </p>
                    </div>
                  </div>
                  <button
                    className='customBtn btn-bgRed'
                    // onClick={() => setShowVerifyModal(true)}
                  >
                    {t('recruiter.verify')}
                  </button>
                </div>
              </div>

              {/* Delete Box */}
              <div className='account__manageBox'>
                <h4>{t('recruiter.deleteAccount')}</h4>
                <div className='account__manageBox-content'>
                  <div className='account__manageBox-content-withIcon'>
                    <div className='account__manageBox-content-withIcon-icon'>
                      <img src={deleteIcon} alt='' />
                    </div>
                    <div className='account__manageBox-content-withIcon-content'>
                      <h5>{t('recruiter.deleteAccount')}</h5>
                      <p>
                        {t('recruiter.deleteAccountDescription')}
                      </p>
                    </div>
                  </div>
                  <button className='customBtn btn-bgRed'>{t('recruiter.delete')}</button>
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
          <p>{t('recruiter.verificationCodeDescription')}</p>
          <div className='row justify-content-center my-3'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='col-3'>
                <Form.Control maxLength={1} className='text-center' />
              </div>
            ))}
          </div>
          <button className='w-100 customBtn btn-bgRed'>{t('recruiter.verify')}</button>
        </div>
      </CustomModal>
    </>
  );
};

export default ManageAccount;
