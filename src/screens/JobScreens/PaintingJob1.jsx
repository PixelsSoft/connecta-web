import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import paintingbannerimg from '../../assets/images/painting-banner-img.png';

import RoomIcon1 from '../../assets/images/1-room-icon.png';
import RoomIcon2 from '../../assets/images/2-room-icon.png';
import RoomIcon3 from '../../assets/images/3-room-icon.png';
import RoomIcon4 from '../../assets/images/4-room-icon.png';
import { Link } from 'react-router-dom';

const vissionOfWeddingCheckboxes = [
  {
    labelId: 'classicTraditional',
    title: 'Classic / Traditional',
  },
];

const PaintingJob1 = () => {
  return (
    <DefaultLayout2>
      <section className='jobPostingSec'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7'>
              <div className='jobPosting__content'>
                <div className='sec-head'>
                  <h1>Post a Painting job</h1>
                  <p>
                    Get responses from Connecta24 screened and reviewed
                    Professional People near you
                  </p>
                </div>

                <div className='paintingJobContent'>
                  <div className='input-group'>
                    <label className='form-label fw-600'>
                      How many room do you want to cover in this services?
                    </label>
                    <div className='paintingBoxRadioButtons'>
                      {[
                        {
                          labelId: 'for1Room',
                          title: '1 Room',
                          icon: RoomIcon1,
                        },
                        {
                          labelId: 'for2Room',
                          title: '2 Room',
                          icon: RoomIcon2,
                        },
                        {
                          labelId: 'for3Room',
                          title: '3 Room',
                          icon: RoomIcon3,
                        },
                        {
                          labelId: 'for4Room',
                          title: '4 Room',
                          icon: RoomIcon4,
                        },
                      ].map((item, index) => (
                        <div className='form-check paintJobRadio' key={index}>
                          <label
                            className='form-check-label'
                            htmlFor={item.labelId}
                          >
                            <div className='form-check-labelContent'>
                              <img src={item.icon} alt='' />
                              <span>{item.title}</span>
                            </div>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='AditionalVendors'
                              id={item.labelId}
                            />
                          </label>
                        </div>
                      ))}
                      <div className='form-check paintJobRadio'>
                        <label
                          className='form-check-label'
                          htmlFor={'paintingOther'}
                        >
                          <div className='form-check-labelContent'>
                            {/* <img src={item.icon} alt='' /> */}
                            <span>Other</span>
                            <input
                              type='text'
                              className='forn-control'
                              placeholder='No of rooms'
                            />
                          </div>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='AditionalVendors'
                            id={'paintingOther'}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='paintingJobContent-btns mt-3'>
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

export default PaintingJob1;
