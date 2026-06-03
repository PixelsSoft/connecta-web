import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ContactDetails.css';

import whitePhoneIcon from '../../assets/images/white-phone-icon.png';
import emailPhoneIcon from '../../assets/images/white-email-icon.png';

const maskPhone = (phone) => {
  if (!phone) return '—';
  const visible = phone.slice(0, Math.min(7, phone.length));
  return `${visible}******`;
};

const maskEmail = (email) => {
  if (!email) return '—';
  return email.replace(
    /^(.)(.*)(@.*)$/,
    (_, first, rest, domain) => '*'.repeat(Math.max(rest.length, 6)) + domain.replace('.', ' .')
  );
};

const ContactDetails = ({
  phone,
  email,
  address,
  customerName,
  isUnlocked = false,
  canUnlock = false,
  slotsRemaining = 0,
  unlockPriceLabel,
  onUnlockClick,
  unlockLoading = false,
  chatJobId,
  customerUserId,
}) => {
  const { t } = useTranslation('common');

  const displayPhone = isUnlocked ? phone || '—' : maskPhone(phone);
  const displayEmail = isUnlocked ? email || '—' : maskEmail(email);
  const displayAddress = isUnlocked ? address || null : null;

  return (
    <div className='savedLeadContact-Detail'>
      <h5 className='mb-3'>{t('home.contactDetails') || 'Contact Details'}</h5>

      <div className='savedLeadContact-DetailIocnText'>
        <img src={whitePhoneIcon} alt='' />
        <span>{displayPhone}</span>
      </div>

      <div className='savedLeadContact-DetailIocnText'>
        <img src={emailPhoneIcon} alt='' />
        <span>{displayEmail}</span>
      </div>

      {displayAddress && (
        <div className='savedLeadContact-DetailIocnText'>
          <i className='bi bi-geo-alt me-2' aria-hidden />
          <span>{displayAddress}</span>
        </div>
      )}

      <p className='savedLeadContact-Detail-note'>
        {isUnlocked
          ? t('home.contactVisibleUnlocked') ||
            'Lead unlocked. You can contact the customer directly.'
          : canUnlock
            ? t('home.contactHiddenUnlock') ||
              'Contact details are hidden. Pay the unlock fee to view phone, email, and chat.'
            : slotsRemaining === 0
              ? 'This job has reached the maximum number of unlocks.'
              : t('home.contactHidden') || 'Contact details are hidden until you unlock this lead.'}
      </p>

      {!isUnlocked && canUnlock && (
        <button
          type='button'
          className='customBtn w-100 savedLeadContact-Detail-btn mb-2'
          onClick={onUnlockClick}
          disabled={unlockLoading}
        >
          {unlockLoading ? 'Please wait...' : `Unlock Lead — ${unlockPriceLabel}`}
        </button>
      )}

      {isUnlocked && customerUserId && (
        <Link
          to='/chat'
          state={{
            partnerId: customerUserId,
            userId: customerUserId,
            userName: customerName,
            userEmail: email,
            userType: 'customer',
            jobId: chatJobId,
          }}
          className='customBtn w-100 text-center d-block savedLeadContact-Detail-btn'
        >
          <i className='bi bi-chat-dots me-2' aria-hidden />
          {t('home.openChat') || 'Open Chat'}
        </Link>
      )}

      {isUnlocked && !customerUserId && (
        <p className='savedLeadContact-Detail-success mb-0'>
          <i className='bi bi-check-circle-fill me-1' aria-hidden />
          Lead unlocked
        </p>
      )}
    </div>
  );
};

export default ContactDetails;
