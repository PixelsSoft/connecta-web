import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';

import paintingicon from '../../assets/images/painting-icon.png';
import homeRepairingicon from '../../assets/images/homeRepairing-icon.png';
import gardeningicon from '../../assets/images/gardening-icon.png';
import electricianicon from '../../assets/images/electrician-icon.png';
import cleaningicon from '../../assets/images/cleaning-icon.png';
import roofingicon from '../../assets/images/roofing-icon.png';
import kitchenRepairingicon from '../../assets/images/kitchenRepairing-icon.png';
import plumbingicon from '../../assets/images/plumbing-icon.png';
import architecturalServicesicon from '../../assets/images/architecturalServices-icon.png';
import chimneyicon from '../../assets/images/chimney-icon.png';
import brickLayingicon from '../../assets/images/brickLaying-icon.png';

import jobPostingBannerImg from '../../assets/images/jobPosting-banner-img.png';

const categoryData = [
  {
    icon: paintingicon,
    name: 'Painting',
  },
  {
    icon: homeRepairingicon,
    name: 'Home Repairing',
  },
  {
    icon: gardeningicon,
    name: 'Gardening',
  },
  {
    icon: electricianicon,
    name: 'Electrician',
  },
  {
    icon: cleaningicon,
    name: 'Cleaning',
  },
  {
    icon: roofingicon,
    name: 'Roofing',
  },
  {
    icon: kitchenRepairingicon,
    name: 'Kitchen Repairing',
  },
  {
    icon: plumbingicon,
    name: 'Plumbing',
  },
  {
    icon: architecturalServicesicon,
    name: 'Architectural Services',
  },
  {
    icon: chimneyicon,
    name: 'Chimney',
  },
  {
    icon: brickLayingicon,
    name: 'Brick Laying',
  },
];

const FindProfessional = () => {
  return (
    <DefaultLayout2>
      <section className='jobPostingSec'>
        <div className='container'>
          <div className='row align-items-end'>
            <div className='col-lg-7'>
              <div className='jobPosting__content'>
                <div className='sec-head'>
                  <h1>Find Top Rated Professional for your job</h1>
                  <p>
                    in which Ctaegory you want to post your job here we have
                    some common category.
                  </p>
                </div>
                <div className='findProfessionalContent'>
                  <div className='inputGroup'>
                    <label htmlFor='selectCategory' className='form-label'>
                      What would you like to have done?
                    </label>
                    <select
                      id='selectCategory'
                      className='form-select form-control'
                      aria-label='Default select example'
                    >
                      <option selected>Select Category</option>
                      <option value='1'>Painting</option>
                      <option value='2'>Home Repairing</option>
                      <option value='3'>Gardening</option>
                      <option value='4'>Electrician</option>
                      <option value='5'>Cleaning</option>
                      <option value='6'>Roofing</option>
                      <option value='7'>Kitchen Repairing</option>
                      <option value='8'>Plumbing</option>
                      <option value='9'>Architectural Services</option>
                      <option value='10'>Chimney</option>
                      <option value='11'>Brick Laying</option>
                    </select>
                  </div>
                  <div className='mostRecentCategories'>
                    <h4>Most recent Categories</h4>
                    <div className='mostRecentCategories_boxes'>
                      {categoryData.map((item, index) => (
                        <div className='mostRecentCategories_box' key={index}>
                          <div className='mostRecentCategories_boxe-icon'>
                            <img src={item.icon} alt='' />
                          </div>
                          <p>{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='jobPosting__banner-img'>
                <img src={jobPostingBannerImg} className='img-fluid' alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default FindProfessional;
