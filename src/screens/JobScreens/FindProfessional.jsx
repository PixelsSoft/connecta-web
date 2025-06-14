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
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    // if (selectedValue === 'painting-job') {
    //   navigate('/painting-job');
    // }
    navigate('/painting-job');

    // Add more redirects if needed for other categories
  };
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
                    In which Category you want to post your job here we have
                    some common categories.
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
                      aria-label='Select job category'
                      onChange={handleSelectChange}
                      defaultValue=''
                    >
                      <option value={''} disabled>
                        Select Category
                      </option>
                      <option value='painting-job'>Painting</option>
                      <option value='home-repairing'>Home Repairing</option>
                      <option value='gardening'>Gardening</option>
                      <option value='electrician'>Electrician</option>
                      <option value='cleaning'>Cleaning</option>
                      <option value='roofing'>Roofing</option>
                      <option value='kitchen-Repairing'>tchen Repairing</option>
                      <option value='plumbing'>Plumbing</option>
                      <option value='architectural-Services'>
                        Architectural Services
                      </option>
                      <option value='Chimney0'>Chimney</option>
                      <option value='brick-Laying'>Brick Laying</option>
                    </select>
                  </div>
                  <div className='mostRecentCategories'>
                    <h4>Most recent Categories</h4>
                    <div className='mostRecentCategories_boxes'>
                      {categoryData.map((item, index) => (
                        <Link
                          to={'/painting-job'}
                          className='mostRecentCategories_box'
                          key={index}
                        >
                          <div className='mostRecentCategories_boxe-icon'>
                            <img src={item.icon} alt='' />
                          </div>
                          <p>{item.name}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='h-100 d-flex align-items-center justify-content-center'>
                <div className='jobPosting__banner-img'>
                  <img src={jobPostingBannerImg} className='img-fluid' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default FindProfessional;
