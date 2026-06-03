export const JOB_STATUS_LABELS = {
  open: 'Open',
  closed: 'Closed',
  completed: 'Completed',
};

export const JOB_STATUS_BADGE = {
  open: 'bg-primary',
  closed: 'bg-secondary',
  completed: 'bg-success',
};

export const DEFAULT_CURRENCY = 'CHF';

export const formatMoney = (amount, currency = DEFAULT_CURRENCY) => {
  if (amount === null || amount === undefined) return '—';
  return `${(currency || DEFAULT_CURRENCY).toUpperCase()} ${Number(amount).toFixed(2)}`;
};

export const formatLeadUnlockPrice = (job, settings = {}) => {
  const amount = job?.lead_unlock_price ?? settings?.lead_unlock_price ?? 100;
  const currency = job?.lead_unlock_currency ?? settings?.currency ?? DEFAULT_CURRENCY;
  return formatMoney(amount, currency);
};

/** @deprecated Lead model — kept for unused legacy components */
export const getPaymentStatusLabel = (paymentStatus) => {
  const labels = { unpaid: 'Unpaid', pending: 'Payment Pending', paid: 'Paid' };
  return labels[paymentStatus] || paymentStatus;
};

/** @deprecated Lead model — kept for unused legacy components */
export const getPaymentStatusBadge = (paymentStatus) => {
  const badges = {
    unpaid: 'bg-secondary',
    pending: 'bg-warning text-dark',
    paid: 'bg-success',
  };
  return badges[paymentStatus] || 'bg-secondary';
};

export const QUOTE_STATUS_BADGE = {
  pending: 'bg-warning text-dark',
  accepted: 'bg-success',
  rejected: 'bg-secondary',
};

export const getJobSteps = (status, userHasUnlocked = false) => {
  const steps = [
    { key: 'posted', label: 'Posted' },
    { key: 'unlock', label: 'Unlock Lead' },
    { key: 'contact', label: 'Contact Customer' },
  ];

  if (userHasUnlocked) {
    return steps.map((step, index) => ({
      ...step,
      done: index < 2,
      active: index === 2,
    }));
  }

  if (status === 'closed') {
    return steps.map((step, index) => ({
      ...step,
      done: index === 0,
      active: index === 1,
    }));
  }

  return steps.map((step, index) => ({
    ...step,
    done: false,
    active: index === 0,
  }));
};
