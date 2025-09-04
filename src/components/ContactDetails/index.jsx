import React from 'react';
import { useTranslation } from 'react-i18next';

import whitePhoneIcon from '../../assets/images/white-phone-icon.png';
import emailPhoneIcon from '../../assets/images/white-email-icon.png';

const ContactDetails = ({ phone, email, onInterestedClick }) => {
  const { t } = useTranslation('common');
  
  // Masking phone and email
  const maskedPhone = phone?.slice(0, 7) + '******';
  const maskedEmail = email
    ? email.replace(
        /^(.)(.*)(@.*)$/,
        (_, first, rest, domain) =>
          '*'.repeat(rest.length) + domain.replace('.', ' .')
      )
    : '';

  return (
    <div className='savedLeadContact-Detail'>
      <h5 className='mb-3'>{t('home.contactDetails')}</h5>

      <div className='savedLeadContact-DetailIocnText'>
        <img src={whitePhoneIcon} alt='' />
        <span>{maskedPhone}</span>
      </div>

      <div className='savedLeadContact-DetailIocnText'>
        <img src={emailPhoneIcon} alt='' />
        <span>{maskedEmail}</span>
      </div>

      <p>
        {t('home.contactDescription')}
      </p>

      <button className='customBtn btn-bgRed w-100' onClick={onInterestedClick}>
        {t('home.interested')}
      </button>
    </div>
  );
};

export default ContactDetails;
