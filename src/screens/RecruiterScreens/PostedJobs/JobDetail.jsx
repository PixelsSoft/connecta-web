import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import ContactDetails from '../../../components/ContactDetails';
import LeadUnlockModal from '../../../components/JobWorkflow/LeadUnlockModal';
import JobProgress from '../../../components/JobWorkflow/JobProgress';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';
import { getJobQuestionsAnswers } from '../../../utils/jobQuestions';
import {
  JOB_STATUS_LABELS,
  JOB_STATUS_BADGE,
  formatLeadUnlockPrice,
} from '../../../utils/jobStatus';
import '../../../components/JobWorkflow/JobWorkflow.css';

import recruiterjobdetailbanner from '../../../assets/images/recruiter-job-detail-banner.png';

const JobDetail = () => {
  const { t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  useEffect(() => {
    if (id) fetchJobDetail();
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(id));

      if (response.data.success) {
        setJob(response.data.data.job);
      }
    } catch (error) {
      console.error('Error fetching job detail:', error);
      toast.error(error.response?.data?.message || 'Failed to load job details');
      navigate('/recruiter/posted-jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockSuccess = (updatedJob) => {
    if (updatedJob) setJob(updatedJob);
    else fetchJobDetail();
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <section className='recruiter__job-detail'>
          <div className='container text-center py-5'>
            <div className='spinner-border text-primary' role='status' />
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  if (!job) {
    return (
      <RecruiterLayout>
        <section className='recruiter__job-detail'>
          <div className='container text-center py-5'>
            <h3>Job not found</h3>
            <button className='btn btn-primary mt-3' onClick={() => navigate('/recruiter/posted-jobs')}>
              Back
            </button>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  const questionsAnswers = getJobQuestionsAnswers(job);
  const statusBadge = JOB_STATUS_BADGE[job.status] || 'bg-secondary';
  const isUnlocked = !!job.user_has_unlocked;
  const canUnlock = !!job.can_unlock;
  const unlockPriceLabel = formatLeadUnlockPrice(job);

  return (
    <RecruiterLayout>
      <LeadUnlockModal
        show={showUnlockModal}
        onHide={() => setShowUnlockModal(false)}
        jobId={id}
        onSuccess={handleUnlockSuccess}
      />
      <section className='recruiter__job-detail'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 mb-xl-0 mb-5'>
              <div className='recruiter__job-detail-content'>
                <div className='recruiter__job-detail-content-banner mb-3'>
                  <img src={job.image || recruiterjobdetailbanner} className='img-fluid' alt='' />
                </div>
                <div className='recruiter__job-detail-content-header mb-4'>
                  <h2 className='mb-2'>{job.title}</h2>
                  <p>Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                  {job.location && <p className='mb-0'><i className='bi bi-geo-alt me-2' />{job.location}</p>}
                  <span className={`badge ${statusBadge} mt-2`}>
                    {JOB_STATUS_LABELS[job.status] || job.status}
                  </span>
                </div>

                <JobProgress status={job.status} userHasUnlocked={isUnlocked} />

                <div className='recruiter__job-detail-content-overview'>
                  <h4 className='mb-2'>Overview</h4>
                  <p>{job.description || 'No description provided.'}</p>

                  {questionsAnswers.length > 0 && (
                    <div className='mt-4'>
                      <h4 className='mb-3'>Customer Answers</h4>
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
                  )}
                </div>
              </div>
            </div>

            <div className='col-xl-4'>
              <ContactDetails
                phone={job.user?.phone}
                email={job.user?.email}
                address={job.user?.address}
                isUnlocked={isUnlocked}
                canUnlock={canUnlock}
                slotsRemaining={job.slots_remaining ?? 0}
                unlockPriceLabel={unlockPriceLabel}
                onUnlockClick={() => setShowUnlockModal(true)}
                chatJobId={id}
                customerName={job.user?.name}
                customerUserId={isUnlocked ? job.user?.id : null}
              />
              <div className='shortFeeBox mt-3'>
                <h5>Unlock slots</h5>
                <p>
                  {job.unlock_count ?? 0} / {job.max_unlocks ?? 5} used
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RecruiterLayout>
  );
};

export default JobDetail;
