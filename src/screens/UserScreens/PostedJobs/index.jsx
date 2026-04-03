import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import UserLayout from '../../../components/Layouts/UserLayout';
import JobBox from '../../../components/JobBox';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';

import nojobicon from '../../../assets/images/no-job-icon.png';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';

const PostedJobs = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const fetchPostedJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, {
        params: {
          user_id: user?.id,
        },
      });

      if (response.data.success) {
        setJobs(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching posted jobs:', error);
      toast.error('Failed to load posted jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      const response = await axiosInstance.delete(API_ENDPOINTS.JOBS.DELETE(jobId));
      
      if (response.data.success) {
        toast.success('Job deleted successfully');
        fetchPostedJobs(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <section className='posted__job-sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center py-5'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
                <p className='mt-3'>Loading your posted jobs...</p>
              </div>
            </div>
          </div>
        </section>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {jobs.length === 0 ? (
        <section className='no__job-posted-yet'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='no__job-posted-content'>
                  <img src={nojobicon} alt='' />
                  <h4>{t('user.noJobPostedYet') || 'No Jobs Posted Yet'}</h4>
                  <p className='text-muted mt-2'>
                    Start posting jobs to find the right professionals for your needs.
                  </p>
                  <button 
                    className='customBtn mt-3' 
                    onClick={() => navigate('/find-professionals')}
                  >
                    {t('user.postAJob') || 'Post a Job'}
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
                  <h3>My Posted Jobs</h3>
                  <button 
                    className='btn btn-primary'
                    onClick={() => navigate('/find-professionals')}
                  >
                    Post New Job
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
                    headerRightLabel={job.status}
                    position={`Budget: ${job.budget || 'N/A'}`}
                    description={job.description}
                    date={new Date(job.created_at).toLocaleDateString()}
                    to={`/user/posted-jobs/${job.id}`}
                    onDelete={() => handleDeleteJob(job.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </UserLayout>
  );
};

export default PostedJobs;
