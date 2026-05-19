export const JOB_STATUS_LABELS = {
  open: 'Open',
  awaiting_payment: 'Awaiting Payment',
  in_progress: 'In Progress',
  pending_completion: 'Pending Your Approval',
  completed: 'Completed',
  closed: 'Closed',
};

export const JOB_STATUS_BADGE = {
  open: 'bg-primary',
  awaiting_payment: 'bg-warning text-dark',
  in_progress: 'bg-info text-dark',
  pending_completion: 'bg-warning text-dark',
  completed: 'bg-success',
  closed: 'bg-secondary',
};

export const QUOTE_STATUS_BADGE = {
  pending: 'bg-warning text-dark',
  accepted: 'bg-success',
  rejected: 'bg-secondary',
};

export const DEFAULT_CURRENCY = 'CHF';
export const SHORTLIST_FEE_LABEL = '100 CHF';

export const formatMoney = (amount, currency = DEFAULT_CURRENCY) => {
  if (amount === null || amount === undefined) return '—';
  return `${currency.toUpperCase()} ${Number(amount).toFixed(2)}`;
};

/**
 * Progress steps: Posted → Quote → Paid → In Progress → Completed
 * Index:           0        1       2      3             4
 */
export const getJobSteps = (status, paymentStatus = 'unpaid') => {
  const steps = [
    { key: 'posted', label: 'Posted' },
    { key: 'quote', label: 'Quote Accepted' },
    { key: 'paid', label: 'Paid' },
    { key: 'work', label: 'In Progress' },
    { key: 'done', label: 'Completed' },
  ];

  if (status === 'completed') {
    return steps.map((step) => ({ ...step, done: true, active: false }));
  }

  let activeIndex = 0;

  switch (status) {
    case 'open':
      activeIndex = 0;
      break;
    case 'awaiting_payment':
      activeIndex = 2; // waiting on payment
      break;
    case 'in_progress':
      activeIndex = 3; // paid — work in progress
      break;
    case 'pending_completion':
      activeIndex = 4; // customer must confirm completion
      break;
    case 'closed':
      activeIndex = 0;
      break;
    default:
      activeIndex = 0;
  }

  return steps.map((step, index) => ({
    ...step,
    done: index < activeIndex,
    active: index === activeIndex,
  }));
};

export const getPaymentStatusLabel = (paymentStatus) => {
  const labels = {
    unpaid: 'Unpaid',
    pending: 'Payment Pending',
    paid: 'Paid',
  };
  return labels[paymentStatus] || paymentStatus;
};

export const getPaymentStatusBadge = (paymentStatus) => {
  const badges = {
    unpaid: 'bg-secondary',
    pending: 'bg-warning text-dark',
    paid: 'bg-success',
  };
  return badges[paymentStatus] || 'bg-secondary';
};
