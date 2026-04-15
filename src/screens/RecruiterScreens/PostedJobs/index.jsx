import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import JobBox from '../../../components/JobBox';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';

import nojobicon from '../../../assets/images/no-job-icon.png';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';

const PostedJobs = () => {
  const { t } = useTranslation('common');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const fetchAvailableJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, {
        params: {
          status: 'open', // Only show open jobs
        },
      });

      if (response.data.success) {
        setJobs(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching available jobs:', error);
      toast.error('Failed to load available jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleShowInterest = async (jobId) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.INTERESTED(jobId));
      
      if (response.data.success) {
        toast.success('Interest shown successfully!');
        fetchAvailableJobs(); // Refresh the list
      }
    } catch (error) {
      console.error('Error showing interest:', error);
      toast.error('Failed to show interest');
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <section className='posted__job-sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center py-5'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
                <p className='mt-3'>Loading available jobs...</p>
              </div>
            </div>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      {jobs.length === 0 ? (
        <section className='no__job-posted-yet'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='no__job-posted-content'>
                  <img src={nojobicon} alt='' />
                  <h4>{t('recruiter.noJobAvailable') || 'No Jobs Available Yet'}</h4>
                  <p className='text-muted mt-2'>
                    Check back later for new job opportunities from customers.
                  </p>
                  <button className='customBtn' onClick={() => fetchAvailableJobs()}>
                    {t('recruiter.refresh') || 'Refresh'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className='posted__job-sec'>
          <div className='container'>
            <div className='row mb-4'>
              <div className='col-md-12'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h3>Available Jobs</h3>
                    <p className='text-muted mb-0'>Browse and apply to jobs posted by customers</p>
                  </div>
                  <button className='btn btn-primary' onClick={() => fetchAvailableJobs()}>
                    <i className='bi bi-arrow-clockwise me-2'></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className='row'>
              {jobs.map((job) => (
                <div className='col-xl-4 col-md-6 mb-3' key={job.id}>
                  <JobBox
                    icon={job.category?.image || paintingHouseSmIcon}
                    title={job.title}
                    headerRightLabel={`${job.interested_count || 0} Interested`}
                    position={`Budget: ${job.budget || 'N/A'}`}
                    description={job.description}
                    date={new Date(job.created_at).toLocaleDateString()}
                    to={`/recruiter/posted-jobs/detail/${job.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </RecruiterLayout>
  );
};

export default PostedJobs;
