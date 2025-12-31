import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import bathroomfittingbanner3 from '../../assets/images/bathroom-fitting-banner-3.png';

import { Link } from 'react-router-dom';

const BathroomFittingJob3 = () => {
  return (
    <DefaultLayout2>
      <section className='jobPostingSec'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='jobPosting__content'>
                <div className='sec-head'>
                  <h1>
                    Post a Bathroom Fitting <br /> Job
                  </h1>
                  <p>Verify your email address and phone number</p>
                </div>

                <div className='bathroomFittinJob'>
                  <div className='inputGroup mb-4'>
                    <label htmlFor='userOTP' className='form-label'>
                      OTP Code
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='userOTP'
                      placeholder='******'
                    />
                    <p className='darkGrayColor mb-0 mt-2'>
                      Code will be resent after{' '}
                      <span style={{ color: '#056517' }}>00:59</span>
                    </p>
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
            <div className='col-lg-6'>
              <div className='h-100 d-flex align-items-center'>
                <div className='jobPosting__banner-img bathroomFitting-job3'>
                  <img
                    src={bathroomfittingbanner3}
                    className='img-fluid'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default BathroomFittingJob3;
