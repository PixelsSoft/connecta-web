import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import paintingbannerimg from '../../assets/images/painting-banner-img.png';

import { Link } from 'react-router-dom';

const PaintingJob2 = () => {
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
                      What type of painting do you need?
                    </label>
                    <div className='paintingBoxRadioList'>
                      {[
                        {
                          labelId: 'for1Room',
                          title: 'In house decoration',
                          description: 'Completely change a home color',
                          // icon: RoomIcon1,
                        },
                        {
                          labelId: 'for2Room',
                          title: 'Wallpaper work',
                          description:
                            'E.g. replace wall color with different wallpapers',
                          // icon: RoomIcon2,
                        },
                        {
                          labelId: 'for3Room',
                          title: 'Touching',
                          description: 'Need some touching for fresh look',
                          // icon: RoomIcon3,
                        },
                        {
                          labelId: 'for4Room',
                          title: 'Tiling',
                          description: 'E.g. Color with tiles',
                          // icon: RoomIcon4,
                        },
                      ].map((item, index) => (
                        <div
                          className='form-check paintRadioListItem'
                          key={index}
                        >
                          <label
                            className='form-check-label'
                            htmlFor={item.labelId}
                          >
                            <input
                              className='form-check-input'
                              type='radio'
                              name='AditionalVendors'
                              id={item.labelId}
                            />
                            <div className='form-check-labelListContent'>
                              {/* <img src={item.icon} alt='' /> */}
                              <span className='darkGrayColor'>
                                {item.title}
                              </span>
                              <span className='grayColor50'>
                                {item.description}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
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

export default PaintingJob2;
