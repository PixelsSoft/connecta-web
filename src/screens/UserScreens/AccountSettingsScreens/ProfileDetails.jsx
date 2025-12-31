import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAccountSettingLayout from '../../../components/Layouts/UserLayout/UserAccountSettingLayout';
import { useTranslation } from 'react-i18next';
import JobBox from '../../../components/JobBox';
import StarRating from '../../../components/StarRating';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';
import gardeningSmIcon from '../../../assets/images/gardening-sm-icon.png';

const ProfileDetails = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  // Sample data for posted jobs
  const postedJobsData = [
    {
      id: 1,
      icon: paintingHouseSmIcon,
      title: 'Painting House',
      possition: 'Open',
      description: `Reliable painting services – from touch-ups to complete house painting, we've got you covered.`,
      date: '02/20/2025',
    },
    {
      id: 2,
      icon: gardeningSmIcon,
      title: 'Gardening',
      possition: 'Closed',
      description: `Professional gardening services – landscaping, lawn care, and garden maintenance.`,
      date: '02/15/2025',
    },
  ];

  // Sample data for reviews
  const reviewsData = [
    {
      id: 1,
      review: "Excellent service! The professional completed the job on time and exceeded expectations.",
      rating: 5,
      date: "February 2025",
      professionalName: "John Smith",
    },
    {
      id: 2,
      review: "Very satisfied with the quality of work. Highly recommended!",
      rating: 4,
      date: "January 2025",
      professionalName: "Sarah Johnson",
    },
  ];

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can now send `formData` to an API or handle validation
  };

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
                  onChange={handleChanges}
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
                  name='location'
                  value={formData.location}
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
            {postedJobsData.length > 0 ? (
              postedJobsData.map((item) => (
                <div className='col-lg-6 mb-3' key={item.id}>
                  <JobBox
                    icon={item.icon}
                    title={item.title}
                    position={item.possition}
                    description={item.description}
                    date={item.date}
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

        {/* My Reviews Section */}
        <div className='mt-5 mb-4'>
          <h4 className='mb-3'>{t('profile.myReviews')}</h4>
          <div className='reviews-list'>
            {reviewsData.length > 0 ? (
              reviewsData.map((review) => (
                <div key={review.id} className='review-item mb-4 p-3 border rounded'>
                  <div className='review-header mb-2'>
                    <div className='d-flex align-items-center gap-2 mb-2'>
                      <StarRating value={review.rating} />
                      <span className='text-muted'>{review.date}</span>
                    </div>
                    <p className='review-text mb-0'>{review.review}</p>
                    <p className='review-author text-muted small mt-2 mb-0'>
                      - {review.professionalName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className='reviews-empty-state text-center py-5'>
                <p className='text-muted'>{t('reviews.noReviewsYet')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-4'>
          <div className='d-flex gap-3'>
            <button
              type='button'
              onClick={handleSubmit}
              className='customBtn btn-bgRed'
            >
              {t('profile.editProfile')}
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
