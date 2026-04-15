import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';

import recruiterjobdetailbanner from '../../../assets/images/recruiter-job-detail-banner.png';

const JobDetail = () => {
  const { t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasShownInterest, setHasShownInterest] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJobDetail();
    }
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(id));

      if (response.data.success) {
        setJob(response.data.data);
        setHasShownInterest(response.data.data.user_interested || false);
      }
    } catch (error) {
      console.error('Error fetching job detail:', error);
      toast.error('Failed to load job details');
      navigate('/recruiter/posted-jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleShowInterest = async () => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.INTERESTED(id));
      
      if (response.data.success) {
        toast.success('Interest shown successfully!');
        setHasShownInterest(true);
        fetchJobDetail(); // Refresh to get updated count
      }
    } catch (error) {
      console.error('Error showing interest:', error);
      const message = error.response?.data?.message || 'Failed to show interest';
      toast.error(message);
    }
  };

  const handleRemoveInterest = async () => {
    try {
      const response = await axiosInstance.delete(API_ENDPOINTS.JOBS.INTERESTED(id));
      
      if (response.data.success) {
        toast.success('Interest removed successfully!');
        setHasShownInterest(false);
        fetchJobDetail(); // Refresh to get updated count
      }
    } catch (error) {
      console.error('Error removing interest:', error);
      toast.error('Failed to remove interest');
    }
  };

  // Parse questions and answers from description
  const parseQuestionsAnswers = (description) => {
    try {
      const qaMatch = description.match(/Questions & Answers:\n([\s\S]*)/);
      if (qaMatch) {
        const qaJson = JSON.parse(qaMatch[1]);
        return Object.entries(qaJson).map(([key, value]) => ({
          question: `Question ${parseInt(key) + 1}`,
          answer: value,
        }));
      }
    } catch (error) {
      console.error('Error parsing Q&A:', error);
    }
    return [];
  };

  if (loading) {
    return (
      <RecruiterLayout>
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
      </RecruiterLayout>
    );
  }

  if (!job) {
    return (
      <RecruiterLayout>
        <section className='recruiter__job-detail'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center py-5'>
                <h3>Job not found</h3>
                <button
                  className='btn btn-primary mt-3'
                  onClick={() => navigate('/recruiter/posted-jobs')}
                >
                  Back to Available Jobs
                </button>
              </div>
            </div>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  const questionsAnswers = parseQuestionsAnswers(job.description);
  const cleanDescription = job.description.split('Questions & Answers:')[0].trim();

  return (
    <RecruiterLayout>
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
                    {job.location && <p className='mb-0'><i className='bi bi-geo-alt me-2'></i>{job.location}</p>}
                    {job.budget && <p className='mb-0'><i className='bi bi-currency-dollar me-2'></i>{job.budget}</p>}
                  </div>
                  <div className='jobDetail-headRight'>
                    {hasShownInterest ? (
                      <button className='customBtn btn-secondary' onClick={handleRemoveInterest}>
                        <i className='bi bi-hand-thumbs-up-fill me-2'></i>
                        <span>Interest Shown</span>
                      </button>
                    ) : (
                      <button className='customBtn btn-primary' onClick={handleShowInterest}>
                        <i className='bi bi-hand-thumbs-up me-2'></i>
                        <span>Show Interest</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className='recruiter__job-detail-content-overview'>
                  <div className='mb-lg-4 mb-3'>
                    <h4 className='mb-2'>Overview</h4>
                    <p>{cleanDescription || 'No description provided.'}</p>
                  </div>
                  
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
                  <h3>Customer Information</h3>
                  <p>Job posted by</p>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <div className='admin-card mb-3'>
                      <div className='card-body'>
                        <div className='mb-2'>
                          <strong><i className='bi bi-person me-2'></i>{job.user?.name || 'N/A'}</strong>
                        </div>
                        {job.user?.email && (
                          <div className='mb-2'>
                            <small className='text-muted'><i className='bi bi-envelope me-2'></i>{job.user.email}</small>
                          </div>
                        )}
                        {job.user?.phone && (
                          <div className='mb-2'>
                            <small className='text-muted'><i className='bi bi-telephone me-2'></i>{job.user.phone}</small>
                          </div>
                        )}
                        <div className='mt-3 mb-3'>
                          <strong className='text-primary'>{job.interested_count || 0} professionals interested</strong>
                        </div>
                        {hasShownInterest ? (
                          <button className='btn btn-secondary w-100' onClick={handleRemoveInterest}>
                            <i className='bi bi-hand-thumbs-up-fill me-2'></i>
                            Remove Interest
                          </button>
                        ) : (
                          <button className='btn btn-primary w-100' onClick={handleShowInterest}>
                            <i className='bi bi-hand-thumbs-up me-2'></i>
                            Show Interest
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RecruiterLayout>
  );
};

export default JobDetail;
