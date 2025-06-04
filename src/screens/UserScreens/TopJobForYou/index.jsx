import React, { useState } from 'react';
import UserLayout from '../../../components/Layouts/UserLayout';
import JobBox from '../../../components/JobBox';

import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';
import gardeningSmIcon from '../../../assets/images/gardening-sm-icon.png';
import plumbingSmIcon from '../../../assets/images/plumbing-sm-icon.png';
import { BiSearch } from 'react-icons/bi';
import { TbFilterFilled } from 'react-icons/tb';
import { FaFilter } from 'react-icons/fa';
import JobDetailContent from '../../../components/JobDetailContent';
import ContactDetails from '../../../components/ContactDetails';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import Header from '../../../components/Layouts/Header';
import DashboardFooter from '../../../components/Layouts/DashboardFooter';

import logo2 from '../../../assets/images/logo2.png';

const topJobForYouData = [
  {
    id: 1,
    icon: paintingHouseSmIcon,
    title: 'Painting House',
    possition: '02',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
    jobDetail: {
      detailedTitle: 'Painting House detailed title',
      category: 'Gardening',
      address: '24th Street kingston square (4 miles)',
      responsibilities: [
        'Carefully dismantle the existing garden wall and steps, preserving any reusable materials where possible.',
        'Assess and prepare foundations to ensure stability and proper drainage.',
        'Rebuild the garden wall using appropriate materials (e.g., brick, stone, or blockwork) in line with original design or updated specifications.',
        'Reconstruct the steps leading to the lawn area, ensuring correct alignment, level, and uniform tread/riser dimensions.',
        'Repoint joints and apply finishes for durability and aesthetic appeal.',
        'Remove debris and leave the site clean and safe upon completion.',
      ],
      outcomes: [
        'Reconstructed garden wall and steps that are structurally sound, visually pleasing, and safely accessible.',
        'Improved longevity and weather resistance of the garden features.',
      ],
      textInfo:
        "Let me know if you'd like to tailor it further (e.g., specific materials, design elements, or location details).",
    },
  },
  {
    id: 2,
    icon: gardeningSmIcon,
    title: 'Gardening',
    possition: '02',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
    jobDetail: {
      detailedTitle: 'Retaking Garden wall and steps up to lawn area.',
      category: 'Gardening',
      address: '24th Street kingston square (4 miles)',
      responsibilities: [
        'Carefully dismantle the existing garden wall and steps, preserving any reusable materials where possible.',
        'Assess and prepare foundations to ensure stability and proper drainage.',
        'Rebuild the garden wall using appropriate materials (e.g., brick, stone, or blockwork) in line with original design or updated specifications.',
        'Reconstruct the steps leading to the lawn area, ensuring correct alignment, level, and uniform tread/riser dimensions.',
        'Repoint joints and apply finishes for durability and aesthetic appeal.',
        'Remove debris and leave the site clean and safe upon completion.',
      ],
      outcomes: [
        'Reconstructed garden wall and steps that are structurally sound, visually pleasing, and safely accessible.',
        'Improved longevity and weather resistance of the garden features.',
      ],
      textInfo:
        "Let me know if you'd like to tailor it further (e.g., specific materials, design elements, or location details).",
    },
  },
  {
    id: 3,
    icon: plumbingSmIcon,
    title: 'Plumbing',
    possition: '02',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
    jobDetail: {
      detailedTitle: 'Plumbing Detail Title',
      category: 'Gardening',
      address: '24th Street kingston square (4 miles)',
      responsibilities: [
        'Carefully dismantle the existing garden wall and steps, preserving any reusable materials where possible.',
        'Assess and prepare foundations to ensure stability and proper drainage.',
        'Rebuild the garden wall using appropriate materials (e.g., brick, stone, or blockwork) in line with original design or updated specifications.',
        'Reconstruct the steps leading to the lawn area, ensuring correct alignment, level, and uniform tread/riser dimensions.',
        'Repoint joints and apply finishes for durability and aesthetic appeal.',
        'Remove debris and leave the site clean and safe upon completion.',
      ],
      outcomes: [
        'Reconstructed garden wall and steps that are structurally sound, visually pleasing, and safely accessible.',
        'Improved longevity and weather resistance of the garden features.',
      ],
      textInfo:
        "Let me know if you'd like to tailor it further (e.g., specific materials, design elements, or location details).",
    },
  },
];

const TopJobForYou = () => {
  const [selectedJob, setSelectedJob] = useState(topJobForYouData[0]);
  return (
    <>
      <Header logo={logo2} />
      <section className='seved__lead-sec'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-xl-4 col-md-5 mb-md-0 mb-4 seved__lead-leftCol'
              //   style={{ borderRight: '1px solid #07242B4F' }}
            >
              <div className='seved__lead-left'>
                <div className='seved__lead-content-head'>
                  <h4>Top job picks for you</h4>
                  <p className='greenColor'>240 new leads available for you!</p>
                  <p>
                    Based on your profile, preferences, and activity like
                    applies, searches, and saves
                  </p>
                </div>
                <div className='seved__lead-search'>
                  <div className='travelForWork-search-box'>
                    <div className='input-group'>
                      <button className='btn' type='button' id='button-addon2'>
                        <BiSearch />
                      </button>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search Location'
                      />
                    </div>
                    <button className='btn filterBtn'>
                      {/* <TbFilterFilled /> */}
                      <FaFilter />
                    </button>
                  </div>
                </div>
                <div className='seved__lead-boxes d-flex flex-column gap-2'>
                  {topJobForYouData.map((item, index) => (
                    <JobBox
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      headerRightLabel='Interested'
                      position={item.possition}
                      description={item.description}
                      date={item.date}
                      onClick={() => setSelectedJob(item)}
                      isActive={selectedJob?.id === item.id}
                      //   to='/recruiter/posted-jobs/detail'
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='col-xl-5 col-md-7'>
              <JobDetailContent job={selectedJob} />
            </div>
            <div className='col-xl-3 mt-xl-0 mt-4'>
              <div className='savedLeadContact-content'>
                <ContactDetails
                  phone='+25484567890'
                  email='john.doe@mail.com'
                  onInterestedClick={() => console.log('Interested clicked')}
                />

                <div className='shortFeeBox'>
                  <h5>Short listed Fee</h5>
                  <h4 className='redColor'>100 CHF</h4>
                  <p>fee charged only when you get shortlisted by person</p>
                </div>
                <div className='shortFeeBox'>
                  <h5>5 Interested</h5>
                  {/* <h4 className='redColor'>100 CHF</h4> */}
                  <p>Those people show interest in this job</p>
                </div>
                <div className='shortFeeBox'>
                  <h5>0 Shortlisted</h5>
                  {/* <h4 className='redColor'>100 CHF</h4> */}
                  <p>Those people received contact details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DashboardFooter />
    </>
  );
};

export default TopJobForYou;
