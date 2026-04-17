import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import UserLayout from '../../../components/Layouts/UserLayout';
import StarRating from '../../../components/StarRating';
import DashboardFooter from '../../../components/Layouts/DashboardFooter';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';

import recruiterjobdetailbanner from '../../../assets/images/recruiter-job-detail-banner.png';
import editIcon from '../../../assets/images/edit-icon.png';
import proCheckIcon from '../../../assets/images/applied-check.png';
import defaultUserImg from '../../../assets/images/interested-pro-img.png';
import interestedProImg from '../../../assets/images/interested-pro-img.png';

const JobDetail = () => {
  const { t } = useTranslation('common');
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestedPros] = useState([]);

  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(id));

      if (response.data.success) {
        setJob(response.data.data);
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

  const questionsAnswers = parseQuestionsAnswers(job.description);
  const cleanDescription = job.description.split('Questions & Answers:')[0].trim();

  return (
    <UserLayout>
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
                    <p className='mb-0'>
                      <span className='badge bg-primary'>{job.status}</span>
                    </p>
                  </div>
                  <div className='jobDetail-headRight'>
                    <button className='customBtn btn__witchIcon me-2'>
                      <img src={editIcon} alt='' />
                      <span>Edit Job</span>
                    </button>
                    {job.status !== 'closed' && (
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
                        <h4>Questions Related to Job</h4>
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

                <div className='row'>
                  {job.interests && job.interests.length > 0 ? (
                    job.interests.map((interest, index) => (
                      <div className='col-xl-12 col-md-6 mb-3' key={index}>
                        <div className='interested-pro-box'>
                          <div className='interestedProBox-head'>
                            <div className='interestedProBox-head-left'>
                              <img 
                                src={interest.professional?.profile_image || defaultUserImg} 
                                alt={interest.professional?.name || 'Professional'} 
                              />
                              <div className='interestedProBox-user'>
                                <h4>{interest.professional?.name || 'N/A'}</h4>
                                <div className='interestedProBox-rating'>
                                  <StarRating value={4.5} />
                                  <span>4.5/5</span>
                                </div>
                              </div>
                            </div>
                            <div className='interestedProBox-head-right'>
                              <img src={proCheckIcon} alt='' />
                              <h5>Professional</h5>
                            </div>
                          </div>
                          <p className='interestedProBox-body'>
                            {interest.professional?.email || 'No email provided'}
                            {interest.professional?.phone && (
                              <>
                                <br />
                                <i className='bi bi-telephone me-2'></i>
                                {interest.professional.phone}
                              </>
                            )}
                            <br />
                            <small className='text-muted'>
                              Interested on {new Date(interest.created_at).toLocaleDateString()}
                            </small>
                          </p>
                          <div className='d-flex gap-2'>
                            <button
                              className='customBtn btn-bgRed flex-fill text-center'
                              onClick={() => navigate('/chat', { 
                                state: { 
                                  userId: interest.professional_id,
                                  userName: interest.professional?.name,
                                  userEmail: interest.professional?.email,
                                  userAvatar: interest.professional?.profile_image || null,
                                  userType: 'professional',
                                  jobDetails: {
                                    title: job?.title || null,
                                    description: job?.description || null,
                                    budget: job?.budget || null,
                                    location: job?.location || null,
                                    category: job?.category?.name || null,
                                    subcategory: job?.subcategory?.name || null
                                  }
                                } 
                              })}
                            >
                              <i className='bi bi-chat-dots me-2'></i>
                              Start Chat
                            </button>
                            <button
                              className='customBtn btn-outline flex-fill text-center'
                              onClick={() => navigate(`/professional/${interest.professional_id}`)}
                            >
                              <i className='bi bi-person me-2'></i>
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='col-12'>
                      <div className='text-center py-4'>
                        <p className='text-muted'>
                          No professionals have shown interest yet.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DashboardFooter />
    </UserLayout>
  );
};

export default JobDetail;
