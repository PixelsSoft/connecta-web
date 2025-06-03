import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import paintingbannerimg from '../../assets/images/painting-banner-img.png';

import { Link } from 'react-router-dom';

const BathroomFittingJob1 = () => {
  return (
    <DefaultLayout2>
      <section className='jobPostingSec'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7'>
              <div className='jobPosting__content'>
                <div className='sec-head'>
                  <h1>
                    Post a Bathroom Fitting <br /> job
                  </h1>
                  <p>
                    Enter Some Description about your job or upload some images
                    to support your description!
                  </p>
                </div>

                <div className='bathroomFittinJob'>
                  <div class='inputGroup mb-4'>
                    <label for='userName' class='form-label'>
                      Description
                    </label>
                    <textarea
                      class='form-control'
                      placeholder='Add Description'
                      rows={3}
                      style={{
                        resize: 'none',
                      }}
                    ></textarea>
                    {/* <input
                      type='email'
                      class='form-control'
                      id='userName'
                      placeholder='info@wrappixel.com'
                    /> */}
                  </div>
                  <div class='inputGroup'>
                    <label for='userName' class='form-label mb-0'>
                      Upload Images
                    </label>
                    <div class='form-text mt-0 mb-2'>
                      you can upload up to 20 pictures not more than 100 mbs
                    </div>
                    <input
                      type='file'
                      class='form-control'
                      id='userName'
                      placeholder='info@wrappixel.com'
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
                  <img src={paintingbannerimg} className='img-fluid' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default BathroomFittingJob1;
