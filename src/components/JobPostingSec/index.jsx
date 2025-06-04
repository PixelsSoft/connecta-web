import React from 'react';

const JobPostingSec = (props) => {
  return (
    <section className='jobPostingSec'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='jobPosting__content'>
              <div className='sec-head'>
                <h1>{props.secTitle}</h1>
                <p>{props.secDescription}</p>
              </div>

              {props.children}
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='h-100 d-flex align-items-center justify-content-center'>
              <div className='jobPosting__banner-img'>
                <img src={props.rightImg} className='img-fluid' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPostingSec;
