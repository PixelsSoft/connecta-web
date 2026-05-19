import React from 'react';
import { useTranslation } from 'react-i18next';

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
  isInterested = false,
  isShortlisted = false,
  onInterestedClick,
  onRemoveInterest,
  interestLoading = false,
}) => {
  const { t } = useTranslation('common');

  const displayPhone = isShortlisted ? phone || '—' : maskPhone(phone);
  const displayEmail = isShortlisted ? email || '—' : maskEmail(email);

  const handleClick = () => {
    if (interestLoading) return;
    if (isInterested) {
      onRemoveInterest?.();
    } else {
      onInterestedClick?.();
    }
  };

  return (
    <div className='savedLeadContact-Detail'>
      <h5 className='mb-3'>{t('home.contactDetails')}</h5>

      <div className='savedLeadContact-DetailIocnText'>
        <img src={whitePhoneIcon} alt='' />
        <span>{displayPhone}</span>
      </div>

      <div className='savedLeadContact-DetailIocnText'>
        <img src={emailPhoneIcon} alt='' />
        <span>{displayEmail}</span>
      </div>

      <p>
        {isShortlisted
          ? t('home.contactVisibleShortlisted') ||
            'You have been shortlisted. Contact details are now visible.'
          : isInterested
            ? t('home.contactAfterInterest') ||
              'You are on the client list. They can shortlist you to share contact details.'
            : t('home.contactDescription')}
      </p>

      <button
        type='button'
        className={`customBtn w-100 saved-lead-interest-btn ${
          isInterested ? 'saved-lead-interest-btn--done' : ''
        } ${isShortlisted ? 'saved-lead-interest-btn--shortlisted' : ''}`}
        onClick={handleClick}
        disabled={interestLoading || isShortlisted}
        title={
          isInterested && !isShortlisted
            ? 'Click to withdraw your interest'
            : undefined
        }
      >
        {interestLoading ? (
          'Please wait...'
        ) : isShortlisted ? (
          <>
            <i className='bi bi-check-circle-fill me-2' aria-hidden />
            {t('home.shortlisted') || 'Shortlisted'}
          </>
        ) : isInterested ? (
          <>
            <i className='bi bi-check-circle-fill me-2' aria-hidden />
            {t('home.interestShown') || 'Interest Shown'}
          </>
        ) : (
          t('home.interested')
        )}
      </button>
    </div>
  );
};

export default ContactDetails;
