import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const ProfessionalCustomerFlowRedirect = () => {
  const { t } = useTranslation('common');

  useEffect(() => {
    toast.error(
      t('marketplace.professionalCannotPostJob', {
        defaultValue:
          'Professionals cannot post jobs. Browse available leads to find customers.',
      })
    );
  }, [t]);

  return <Navigate to="/recruiter/posted-jobs" replace />;
};

/**
 * Customer-only pages (post job, find professionals to hire).
 * Professionals are redirected to available leads.
 */
const CustomerOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.user_type === 'professional') {
    return <ProfessionalCustomerFlowRedirect />;
  }

  return children;
};

export default CustomerOnlyRoute;
