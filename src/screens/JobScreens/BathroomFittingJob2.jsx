import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import jobPostingbannerimg from '../../assets/images/jobPosting-banner-img.png';

import { Link } from 'react-router-dom';

const BathroomFittingJob2 = () => {
  return (
    <DefaultLayout2>
      <section className='jobPostingSec'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7'>
              <div className='jobPosting__content'>
                <div className='sec-head'>
                  <h1>
                    Post a Bathroom Fitting <br /> Job
                  </h1>
                  <p>Enter your contact information</p>
                </div>

                <div className='bathroomFittinJob'>
                  <div className='inputGroup mb-4'>
                    <label htmlFor='userEmail' className='form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='userEmail'
                      placeholder='info@modernize.com'
                    />
                  </div>
                  <div className='inputGroup'>
                    <label htmlFor='userPhone' className='form-label mb-0'>
                      Phone
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='userPhone'
                      placeholder='+91 12345 65478'
                    />
                  </div>

                  <div className='paintingJobContent-btns mt-5'>
                    <Link to={''} className='customBtn btn-blackBorder'>
                      Back
                    </Link>
                    <Link to={''} className='customBtn btn-bgRed'>
                      Next
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='h-100 d-flex align-items-center'>
                <div className='jobPosting__banner-img'>
                  <img src={jobPostingbannerimg} className='img-fluid' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default BathroomFittingJob2;
