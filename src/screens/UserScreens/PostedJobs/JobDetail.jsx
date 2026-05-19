import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import UserLayout from '../../../components/Layouts/UserLayout';
import InterestedProBox from '../../../components/InterestedProBox';
import JobBox from '../../../components/JobBox';
import DashboardFooter from '../../../components/Layouts/DashboardFooter';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';
import { getJobQuestionsAnswers } from '../../../utils/jobQuestions';
import JobProgress from '../../../components/JobWorkflow/JobProgress';
import QuoteCard from '../../../components/JobWorkflow/QuoteCard';
import {
  JOB_STATUS_LABELS,
  JOB_STATUS_BADGE,
  formatMoney,
  getPaymentStatusLabel,
  getPaymentStatusBadge,
} from '../../../utils/jobStatus';
import PaymentModal from '../../../components/JobWorkflow/PaymentModal';
import '../../../components/JobWorkflow/JobWorkflow.css';

import recruiterjobdetailbanner from '../../../assets/images/recruiter-job-detail-banner.png';
import editIcon from '../../../assets/images/edit-icon.png';
import interestedProImg from '../../../assets/images/interested-pro-img.png';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';

const INTERESTED_PRO_BLURB =
  'This professional has shown interest in your job. Start chat to know more and find a good fit for the job.';

const JobDetail = () => {
  const { t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [job, setJob] = useState(null);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  useEffect(() => {
    if (user?.id) {
      fetchPreviousJobs();
    }
  }, [id, user?.id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(id));

      if (response.data.success) {
        setJob(response.data.data.job);
      }
    } catch (error) {
      console.error('Error fetching job detail:', error);
      toast.error('Failed to load job details');
      navigate('/user/posted-jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseJob = async () => {
    if (!window.confirm('Are you sure you want to close this job?')) {
      return;
    }

    try {
      const response = await axiosInstance.put(API_ENDPOINTS.JOBS.UPDATE(id), {
        status: 'closed',
      });

      if (response.data.success) {
        toast.success('Job closed successfully');
        fetchJobDetail();
      }
    } catch (error) {
      console.error('Error closing job:', error);
      toast.error('Failed to close job');
    }
  };

  const handleDeleteJob = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      const response = await axiosInstance.delete(API_ENDPOINTS.JOBS.DELETE(id));

      if (response.data.success) {
        toast.success('Job deleted successfully');
        navigate('/user/posted-jobs');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleAcceptQuote = async (quoteId) => {
    setActionLoading(true);
    try {
      const acceptRes = await axiosInstance.post(API_ENDPOINTS.JOBS.QUOTE_ACCEPT(id, quoteId));
      if (!acceptRes.data.success) return;

      toast.success('Quote accepted');
      await fetchJobDetail();
      setShowPaymentModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept quote');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectQuote = async (quoteId) => {
    setActionLoading(true);
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.QUOTE_REJECT(id, quoteId));
      if (response.data.success) {
        toast.success('Quote rejected');
        fetchJobDetail();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject quote');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePay = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (updatedJob) => {
    if (updatedJob) {
      setJob(updatedJob);
    } else {
      fetchJobDetail();
    }
  };

  const handleConfirmCompletion = async () => {
    if (!window.confirm('Confirm that the work is completed to your satisfaction?')) return;
    setActionLoading(true);
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.CONFIRM_COMPLETION(id));
      if (response.data.success) {
        toast.success('Job marked as completed!');
        fetchJobDetail();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to confirm completion');
    } finally {
      setActionLoading(false);
    }
  };

  const fetchPreviousJobs = async () => {
    if (!user?.id) return;
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, {
        params: { user_id: user.id, per_page: 10 },
      });
      if (response.data.success) {
        const others = (response.data.data.jobs || [])
          .filter((j) => String(j.id) !== String(id))
          .slice(0, 3);
        setPreviousJobs(others);
      }
    } catch (error) {
      console.error('Error fetching previous jobs:', error);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <section className='recruiter__job-detail'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center py-5'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
                <p className='mt-3'>Loading job details...</p>
              </div>
            </div>
          </div>
        </section>
      </UserLayout>
    );
  }

  if (!job) {
    return (
      <UserLayout>
        <section className='recruiter__job-detail'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center py-5'>
                <h3>Job not found</h3>
                <button
                  className='btn btn-primary mt-3'
                  onClick={() => navigate('/user/posted-jobs')}
                >
                  Back to Posted Jobs
                </button>
              </div>
            </div>
          </div>
        </section>
      </UserLayout>
    );
  }

  const questionsAnswers = getJobQuestionsAnswers(job);
  const cleanDescription = job.description || '';
  const pendingQuotes = (job.quotes || []).filter((q) => q.status === 'pending');
  const statusBadge = JOB_STATUS_BADGE[job.status] || 'bg-secondary';

  return (
    <UserLayout>
      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        jobId={id}
        onSuccess={handlePaymentSuccess}
      />
      <section className='recruiter__job-detail'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 mb-xl-0 mb-5'>
              <div className='recruiter__job-detail-content'>
                <div className='recruiter__job-detail-content-banner mb-3'>
                  <img
                    src={job.image || recruiterjobdetailbanner}
                    className='img-fluid'
                    alt=''
                  />
                </div>
                <div className='recruiter__job-detail-content-header mb-lg-4 mb-3'>
                  <div className='jobDetail-headLeft'>
                    <h2 className='mb-2'>{job.title}</h2>
                    <p>Posted Date: {new Date(job.created_at).toLocaleDateString()}</p>
                    <p className='mb-0 d-flex flex-wrap gap-2 align-items-center'>
                      <span className={`badge ${statusBadge}`}>
                        {JOB_STATUS_LABELS[job.status] || job.status}
                      </span>
                      {job.payment_status && job.payment_status !== 'unpaid' && (
                        <span className={`badge ${getPaymentStatusBadge(job.payment_status)}`}>
                          {getPaymentStatusLabel(job.payment_status)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className='jobDetail-headRight'>
                    {job.status === 'awaiting_payment' && (
                      <button
                        className='customBtn btn-bgGreen me-2'
                        onClick={handlePay}
                        disabled={actionLoading}
                      >
                        Pay with Stripe
                      </button>
                    )}
                    {job.status === 'pending_completion' && (
                      <button
                        className='customBtn btn-bgGreen me-2'
                        onClick={handleConfirmCompletion}
                        disabled={actionLoading}
                      >
                        Confirm Completion
                      </button>
                    )}
                    <button className='customBtn btn__witchIcon me-2'>
                      <img src={editIcon} alt='' />
                      <span>Edit Job</span>
                    </button>
                    {job.status !== 'closed' && job.status !== 'completed' && (
                      <button
                        className='customBtn btn-bgRed me-2'
                        onClick={handleCloseJob}
                      >
                        Close This Position
                      </button>
                    )}
                    <button
                      className='btn btn-outline-danger'
                      onClick={handleDeleteJob}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <JobProgress status={job.status} paymentStatus={job.payment_status} />

                {(job.status === 'awaiting_payment' || job.status === 'in_progress' || job.status === 'pending_completion') && job.assigned_professional && (
                  <div className='job-deal-box mb-4'>
                    <h4>Active Deal</h4>
                    <p className='mb-1'>
                      <strong>Professional:</strong> {job.assigned_professional.name}
                    </p>
                    <p className='mb-1'>
                      <strong>Agreed price:</strong> {formatMoney(job.final_amount)}
                    </p>
                    {job.status === 'awaiting_payment' && (
                      <button
                        type='button'
                        className='customBtn btn-bgRed mt-2'
                        onClick={handlePay}
                        disabled={actionLoading}
                      >
                        Complete Payment (Stripe)
                      </button>
                    )}
                  </div>
                )}

                {pendingQuotes.length > 0 && (
                  <div className='mb-4'>
                    <h4 className='mb-3'>Quotes from Professionals</h4>
                    {pendingQuotes.map((quote) => (
                      <QuoteCard
                        key={quote.id}
                        quote={quote}
                        showActions={job.status === 'open'}
                        onAccept={handleAcceptQuote}
                        onReject={handleRejectQuote}
                        processing={actionLoading}
                      />
                    ))}
                  </div>
                )}

                <div className='recruiter__job-detail-content-overview'>
                  <div className='mb-lg-4 mb-3'>
                    <h4 className='mb-2'>Overview</h4>
                    <p>{cleanDescription || 'No description provided.'}</p>
                  </div>

                  {job.location && (
                    <div className='mb-lg-4 mb-3'>
                      <h4 className='mb-2'>Location</h4>
                      <p>{job.location}</p>
                    </div>
                  )}

                  {job.budget && (
                    <div className='mb-lg-4 mb-3'>
                      <h4 className='mb-2'>Budget</h4>
                      <p>{job.budget}</p>
                    </div>
                  )}

                  {questionsAnswers.length > 0 && (
                    <>
                      <div className='mb-lg-4 mb-3'>
                        <h4>Question Related Job</h4>
                      </div>
                      <div className='recruiter__job-detail-content-overviewQuestion'>
                        {questionsAnswers.map((qa, index) => (
                          <div className='job-detail-question' key={index}>
                            <h5>
                              <span>Q{index + 1}</span> {qa.question}
                            </h5>
                            <p>
                              <span>A{index + 1}</span> {qa.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className='col-xl-4'>
              <div className='interested-pro'>
                <div className='interested-pro-head'>
                  <h3>Interested Professionals</h3>
                  <p>Total Interest: {job.interested_count || 0}</p>
                </div>

                <div className='interested-pro-boxes'>
                  {job.interests && job.interests.length > 0 ? (
                    job.interests.map((interest) => (
                      <InterestedProBox
                        key={interest.id || interest.professional_id}
                        userImg={interest.professional?.profile_image || interestedProImg}
                        userName={interest.professional?.name || 'Professional'}
                        ratingValue={4}
                        ratingValueText='4/5'
                        topProLabel='Top Professional'
                        description={INTERESTED_PRO_BLURB}
                        professionalId={interest.professional_id}
                        userEmail={interest.professional?.email}
                        userAvatar={interest.professional?.profile_image || null}
                        jobDetails={{
                          title: job.title,
                          description: job.description,
                          budget: job.budget,
                          location: job.location,
                          category: job.category?.name,
                          subcategory: job.subcategory?.name,
                        }}
                      />
                    ))
                  ) : (
                    <div className='text-center py-4'>
                      <p className='text-muted mb-0'>
                        No professionals have shown interest yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {previousJobs.length > 0 && (
            <div className='job-detail-prevJob'>
              <div className='sec-head'>
                <h3>Previous Jobs</h3>
              </div>
              <div className='row'>
                {previousJobs.map((prevJob) => (
                  <div className='col-xl-4 col-md-6 mb-3' key={prevJob.id}>
                    <JobBox
                      icon={prevJob.category?.image || paintingHouseSmIcon}
                      title={prevJob.title}
                      headerRightLabel='Interested'
                      position={String(prevJob.interested_count || 0)}
                      description={prevJob.description}
                      date={new Date(prevJob.created_at).toLocaleDateString()}
                      status={prevJob.status}
                      paymentStatus={prevJob.payment_status}
                      to={`/user/posted-jobs/${prevJob.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <DashboardFooter />
    </UserLayout>
  );
};

export default JobDetail;
