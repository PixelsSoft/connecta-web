import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobProgress from './JobProgress';
import {
  JOB_STATUS_LABELS,
  JOB_STATUS_BADGE,
  formatMoney,
  getPaymentStatusLabel,
  getPaymentStatusBadge,
} from '../../utils/jobStatus';
import './JobWorkflow.css';

/**
 * Professional-side actions for the job lifecycle (quote → paid → complete).
 */
const ProfessionalJobWorkflow = ({
  job,
  onSendQuote,
  onMarkComplete,
  actionLoading = false,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const myQuote = useMemo(() => {
    if (!job?.quotes?.length || !user?.id) return null;
    return job.quotes.find(
      (q) =>
        q.professional_id === user.id &&
        (q.status === 'pending' || q.status === 'accepted' || q.status === 'rejected')
    );
  }, [job?.quotes, user?.id]);

  if (!job) return null;

  const isInterested = !!job.user_interested;
  const isAssignedToMe = job.assigned_professional_id === user?.id;
  const statusBadge = JOB_STATUS_BADGE[job.status] || 'bg-secondary';
  const canSendQuote = isInterested && job.status === 'open';
  const canMarkComplete =
    job.status === 'in_progress' && isAssignedToMe && job.payment_status === 'paid';

  const handleChat = () => {
    if (!job.user) return;
    navigate('/chat', {
      state: {
        userId: job.user.id,
        userName: job.user.name,
        userEmail: job.user.email,
        userAvatar: job.user.profile_image || null,
        userType: 'customer',
        jobDetails: {
          title: job.title,
          description: job.description,
          budget: job.budget,
          location: job.location,
          category: job.category?.name,
          subcategory: job.subcategory?.name,
        },
      },
    });
  };

  return (
    <div className='pro-job-workflow'>
      <h5 className='pro-job-workflow__title'>Job Progress</h5>

      <div className='pro-job-workflow__badges d-flex flex-wrap gap-1 mb-2'>
        <span className={`badge ${statusBadge}`}>
          {JOB_STATUS_LABELS[job.status] || job.status}
        </span>
        {job.payment_status && job.payment_status !== 'unpaid' && (
          <span className={`badge ${getPaymentStatusBadge(job.payment_status)}`}>
            {getPaymentStatusLabel(job.payment_status)}
          </span>
        )}
      </div>

      <JobProgress status={job.status} paymentStatus={job.payment_status} />

      {myQuote && (
        <div className='job-deal-box pro-job-workflow__quote mt-3'>
          <h6 className='mb-1'>Your Quote</h6>
          <p className='quote-card__amount mb-1'>
            {formatMoney(myQuote.amount, myQuote.currency)}
          </p>
          <span
            className={`badge ${
              myQuote.status === 'accepted'
                ? 'bg-success'
                : myQuote.status === 'rejected'
                  ? 'bg-secondary'
                  : 'bg-warning text-dark'
            }`}
          >
            {myQuote.status}
          </span>
          {myQuote.message && <p className='small text-muted mt-2 mb-0'>{myQuote.message}</p>}
          {myQuote.status === 'pending' && job.status === 'open' && (
            <p className='small mb-0 mt-2'>Waiting for customer to accept your quote.</p>
          )}
          {myQuote.status === 'accepted' && job.status === 'awaiting_payment' && (
            <p className='small mb-0 mt-2'>Customer accepted — waiting for payment.</p>
          )}
        </div>
      )}

      {isAssignedToMe && job.final_amount && (
        <p className='small mb-2 mt-2'>
          <strong>Agreed price:</strong> {formatMoney(job.final_amount)}
        </p>
      )}

      <div className='pro-job-workflow__actions d-flex flex-column gap-2 mt-3'>
        {job.user && (
          <button type='button' className='customBtn btn-blackBorder w-100' onClick={handleChat}>
            <i className='bi bi-chat-dots me-2' aria-hidden />
            Chat with Customer
          </button>
        )}

        {canSendQuote && (
          <button
            type='button'
            className='customBtn btn-bgRed w-100'
            onClick={onSendQuote}
            disabled={actionLoading}
          >
            <i className='bi bi-send me-2' aria-hidden />
            {myQuote?.status === 'pending' ? 'Update Quote' : 'Send Quote'}
          </button>
        )}

        {canMarkComplete && (
          <button
            type='button'
            className='customBtn btn-bgGreen w-100'
            onClick={onMarkComplete}
            disabled={actionLoading}
          >
            Mark Work Complete
          </button>
        )}

        {job.status === 'pending_completion' && isAssignedToMe && (
          <p className='small text-muted mb-0'>
            Work submitted. Waiting for customer to confirm completion.
          </p>
        )}

        {job.status === 'completed' && isAssignedToMe && (
          <p className='small text-success mb-0 fw-semibold'>Job completed.</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalJobWorkflow;
