import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserAccountSettingLayout from '../../../components/Layouts/UserLayout/UserAccountSettingLayout';
import { useTranslation } from 'react-i18next';
import JobBox from '../../../components/JobBox';
import StarRating from '../../../components/StarRating';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';

const ProfileDetails = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.USERS.PROFILE);
      
      if (response.data.success) {
        const userData = response.data.data;
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
        });
        setPostedJobs(userData.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      const response = await axiosInstance.put(
        API_ENDPOINTS.USERS.UPDATE_PROFILE,
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }
      );

      if (response.data.success) {
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <UserAccountSettingLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </UserAccountSettingLayout>
    );
  }

  return (
    <UserAccountSettingLayout>
      <div>
        <div className='sec-head mb-4'>
          <h2>{t('profile.customerProfile')}</h2>
          <p className='mt-2'>{t('profile.customerProfileSubtext')}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='userName' className='form-label'>
                  {t('forms.fullName')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder={t('forms.fullName')}
                  id='userName'
                  name='name'
                  value={formData.name}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='email' className='form-label'>
                  {t('forms.email')}
                </label>
                <input
                  type='email'
                  className='form-control'
                  placeholder={t('forms.email')}
                  id='email'
                  name='email'
                  value={formData.email}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='phone' className='form-label'>
                  {t('forms.phone')}
                </label>
                <input
                  type='tel'
                  className='form-control'
                  placeholder={t('forms.phone')}
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-md-4 mb-3'>
              <div className='inputGroup'>
                <label htmlFor='location' className='form-label'>
                  {t('profile.location')}
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder={t('profile.location')}
                  id='location'
                  name='address'
                  value={formData.address}
                  onChange={handleChanges}
                />
              </div>
            </div>
          </div>
        </form>

        {/* My Posted Jobs Section */}
        <div className='mt-5 mb-4'>
          <h4 className='mb-3'>{t('profile.myPostedJobs')}</h4>
          <div className='row'>
            {postedJobs.length > 0 ? (
              postedJobs.map((job) => (
                <div className='col-lg-6 mb-3' key={job.id}>
                  <JobBox
                    icon={job.category?.icon || ''}
                    title={job.title}
                    position={job.status}
                    description={job.description}
                    date={new Date(job.created_at).toLocaleDateString()}
                  />
                </div>
              ))
            ) : (
              <div className='col-md-12'>
                <p className='text-muted'>{t('recruiter.noJobPostedYet')}</p>
              </div>
            )}
          </div>
        </div>

        {/* My Reviews Section - Removed for now as we don't have reviews table yet */}
        {/* <div className='mt-5 mb-4'>
          <h4 className='mb-3'>{t('profile.myReviews')}</h4>
          <div className='reviews-list'>
            <div className='reviews-empty-state text-center py-5'>
              <p className='text-muted'>{t('reviews.noReviewsYet')}</p>
            </div>
          </div>
        </div> */}

        {/* Buttons */}
        <div className='mt-4'>
          <div className='d-flex gap-3 flex-wrap'>
            <button
              type='button'
              onClick={handleSubmit}
              className='customBtn btn-bgRed'
              disabled={updating}
            >
              {updating ? 'Updating...' : t('profile.editProfile')}
            </button>
            <button
              type='button'
              onClick={() => navigate('/user/account-setting/applied-jobs')}
              className='customBtn btn-bgBlack'
            >
              {t('profile.viewMyJobs')}
            </button>
          </div>
        </div>
      </div>
    </UserAccountSettingLayout>
  );
};

export default ProfileDetails;
