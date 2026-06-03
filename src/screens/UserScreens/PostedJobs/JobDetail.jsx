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
import { JOB_STATUS_LABELS, JOB_STATUS_BADGE } from '../../../utils/jobStatus';
import '../../../components/JobWorkflow/JobWorkflow.css';

import recruiterjobdetailbanner from '../../../assets/images/recruiter-job-detail-banner.png';
import editIcon from '../../../assets/images/edit-icon.png';
import interestedProImg from '../../../assets/images/interested-pro-img.png';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';

const CONNECTED_PRO_BLURB =
  'This professional is interested in your job and can contact you directly.';

const JobDetail = () => {
  const { t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [job, setJob] = useState(null);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div className='col-md-12 text-center py-5'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
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
          <div className='container text-center py-5'>
            <h3>Job not found</h3>
            <button className='btn btn-primary mt-3' onClick={() => navigate('/user/posted-jobs')}>
              Back to Posted Jobs
            </button>
          </div>
        </section>
      </UserLayout>
    );
  }

  const questionsAnswers = getJobQuestionsAnswers(job);
  const statusBadge = JOB_STATUS_BADGE[job.status] || 'bg-secondary';
  const unlockedList = (job.unlocks || []).filter((u) => u.unlocked_at);

  return (
    <UserLayout>
      <section className='recruiter__job-detail'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 mb-xl-0 mb-5'>
              <div className='recruiter__job-detail-content'>
                <div className='recruiter__job-detail-content-banner mb-3'>
                  <img src={job.image || recruiterjobdetailbanner} className='img-fluid' alt='' />
                </div>
                <div className='recruiter__job-detail-content-header mb-lg-4 mb-3'>
                  <div className='jobDetail-headLeft'>
                    <h2 className='mb-2'>{job.title}</h2>
                    <p>Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                    <p className='mb-0'>
                      <span className={`badge ${statusBadge}`}>
                        {JOB_STATUS_LABELS[job.status] || job.status}
                      </span>
                    </p>
                    <p className='text-muted small mt-2 mb-0'>
                      {(job.unlock_count ?? 0) > 0
                        ? `${job.unlock_count} professional${job.unlock_count === 1 ? '' : 's'} can contact you`
                        : 'Professionals matching your job can reach out to you'}
                    </p>
                  </div>
                  <div className='jobDetail-headRight'>
                    <button className='customBtn btn__witchIcon me-2'>
                      <img src={editIcon} alt='' />
                      <span>Edit Job</span>
                    </button>
                    {job.status === 'open' && (
                      <button className='customBtn btn-bgRed me-2' onClick={handleCloseJob}>
                        Close Job
                      </button>
                    )}
                    <button className='btn btn-outline-danger' onClick={handleDeleteJob}>
                      Delete
                    </button>
                  </div>
                </div>

                <div className='recruiter__job-detail-content-overview'>
                  <div className='mb-lg-4 mb-3'>
                    <h4 className='mb-2'>Overview</h4>
                    <p>{job.description || 'No description provided.'}</p>
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
                    <div className='recruiter__job-detail-content-overviewQuestion'>
                      <h4 className='mb-3'>Job Questions</h4>
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
              <div className='interested-pro'>
                <div className='interested-pro-head'>
                  <h3>Professionals in Contact</h3>
                  <p>
                    {unlockedList.length > 0
                      ? `${unlockedList.length} professional${unlockedList.length === 1 ? '' : 's'} connected`
                      : 'Waiting for professionals'}
                  </p>
                </div>

                <div className='interested-pro-boxes'>
                  {unlockedList.length > 0 ? (
                    unlockedList.map((unlock) => (
                      <InterestedProBox
                        key={unlock.id || unlock.professional_id}
                        userImg={unlock.professional?.profile_image || interestedProImg}
                        userName={unlock.professional?.name || 'Professional'}
                        ratingValue={4}
                        ratingValueText='4/5'
                        topProLabel='Connected'
                        description={CONNECTED_PRO_BLURB}
                        professionalId={unlock.professional_id}
                        userEmail={unlock.professional?.email}
                        userAvatar={unlock.professional?.profile_image || null}
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
                        No professionals have contacted you about this job yet.
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
                      headerRightLabel='Responses'
                      position={String(prevJob.unlock_count || 0)}
                      description={prevJob.description}
                      date={new Date(prevJob.created_at).toLocaleDateString()}
                      status={prevJob.status}
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
