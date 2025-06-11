import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import { Link } from 'react-router-dom';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import servicearrowicon from '../../assets/images/service-arrow-icon.png';
import homeAboutImg from '../../assets/images/homeAboutImg.png';
import greencheck from '../../assets/images/green-check.png';

import whyChooseIcon1 from '../../assets/images/whyChooseIcon1.png';
import whyChooseIcon2 from '../../assets/images/whyChooseIcon2.png';
import whyChooseIcon3 from '../../assets/images/whyChooseIcon3.png';

import WhyChooseBox from '../../components/WhyChooseBox';

// Category Image
import categoryimg1 from '../../assets/images/category-img-1.png';
import categoryimg2 from '../../assets/images/category-img-2.png';

// Industry Icon Images
import industryicon1 from '../../assets/images/industry-icon-1.png';
import industryicon2 from '../../assets/images/industry-icon-2.png';
import industryicon3 from '../../assets/images/industry-icon-3.png';
import industryicon4 from '../../assets/images/industry-icon-4.png';
import industryicon5 from '../../assets/images/industry-icon-5.png';
import industryicon6 from '../../assets/images/industry-icon-6.png';
import industryicon7 from '../../assets/images/industry-icon-7.png';
import industryicon8 from '../../assets/images/industry-icon-8.png';
import { FaBusinessTime, FaRegUser } from 'react-icons/fa';
import ServicesSlideSec from '../../components/ServicesSlideSec';
import MainBanner from '../../components/MainBanner';
import COLXXL10 from '../../components/COLXXL10';
import { useTranslation } from 'react-i18next';

const whyChooseData = [
  {
    icon: whyChooseIcon1,
    name: 'Reliable Professionals',
    description:
      'Only verified service experts are available for your requests.',
  },
  {
    icon: whyChooseIcon2,
    name: 'Fast Booking Process',
    description:
      'Skip the job search and get help instantly—no CVs, no back-and-forth.',
  },
  {
    icon: whyChooseIcon3,
    name: 'Custom Solutions',
    description:
      'Book for one-time needs or recurring tasks, based on your schedule.',
  },
];

const industrySecData = [
  {
    icon: industryicon1,
    name: 'Handyman',
    description: '2853 Staffs',
  },
  {
    icon: industryicon2,
    name: 'Cleaning Services',
    description: '2256 Staffs',
  },
  {
    icon: industryicon3,
    name: 'IT Support',
    description: '1408 Staffs',
  },
  {
    icon: industryicon4,
    name: 'Electrician',
    description: '1740 Staffs',
  },
  {
    icon: industryicon5,
    name: 'Personal Services',
    description: '3948 Staffs',
  },
  {
    icon: industryicon6,
    name: 'General Labor',
    description: '2984 Staffs',
  },
  {
    icon: industryicon7,
    name: 'Gardening',
    description: '4509 Staffs',
  },
  {
    icon: industryicon8,
    name: 'Painting & Decor',
    description: '1039 Staffs',
  },
];

const getStartedForCustomersData = [
  {
    number: 1,
    name: 'Post a Job',
    description:
      'Describe your task, add photos, and set your location—it only takes a minute.',
  },
  {
    number: 2,
    name: 'Compare Offers',
    description:
      'Professionals will send offers. Chat with up to 6 who’ve unlocked your job.',
  },
  {
    number: 3,
    name: 'Hire & Review',
    description:
      'Choose the right expert. Once the job is done, mark it complete and leave a review.',
  },
];
const getStartedForBusinessData = [
  {
    number: 1,
    name: 'Browse Services',
    description: 'View posted jobs that match your skills and location.',
  },
  {
    number: 2,
    name: 'Get Booked Instantly',
    description:
      'Pay to unlock job details. Submit your offer and wait for customer engagement.',
  },
  {
    number: 3,
    name: 'Respond to Requests',
    description:
      'Professionals will send offers. Chat with up to 6 who’ve unlocked your job.',
  },
];

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className='homePage'>
      <DefaultLayout>
        <MainBanner />

        <section className='home-aboutSec'>
          <div className='container'>
            <div className='row justify-content-center '>
              <COLXXL10>
                <div className='row align-items-center'>
                  <div className='col-lg-6 mb-lg-0 mb-3'>
                    <div className='home-aboutSec-img'>
                      <img
                        src={homeAboutImg}
                        className='img-fluid'
                        alt='Connect 24 About Image'
                      />
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='home__aboutSec-content'>
                      <div className='sec-head'>
                        <p className='sec-tag'>About us</p>
                        <h2>
                          Your Trusted Service{' '}
                          <span className='greenColor'>Platform</span>
                        </h2>
                        <p className='sec-description'>
                          At Connecta24, we connect customers with verified
                          professionals for home and personal services—like
                          repairs, cleaning, electrical work, and more.
                        </p>
                        <div className='check-list-group'>
                          {[
                            'Tailored services designed to meet your needs',
                            'Scalable, flexible solutions for every task',
                          ].map((item, index) => (
                            <div className='check-list-group-item' key={index}>
                              <div className='check-list-group-item-icon'>
                                <img
                                  src={greencheck}
                                  className='greenCheck-icon'
                                  alt='Icon'
                                />
                              </div>
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='home-aboutSec-textBoxes'>
                      {[
                        {
                          head: '12K',
                          description: 'Trusted Professionals',
                        },
                        {
                          head: '95%',
                          description: 'Jobs Fulfillment Rate',
                        },
                        {
                          head: '12K',
                          description: 'Jobs Filled',
                        },
                        {
                          head: '825+',
                          description: 'Satisfied Businesses',
                        },
                      ].map((item, index) => (
                        <div className='textBoxe' key={index}>
                          <h4>{item.head}</h4>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>

        <ServicesSlideSec />

        <section className='why-chooseSec'>
          <div className='container'>
            <div className='row justify-content-center'>
              <COLXXL10>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='sec-head'>
                      <p className='sec-tag'>Why Us</p>
                      <h2>Why Choose Us</h2>
                    </div>
                  </div>
                  {whyChooseData.map((item, index) => (
                    <div className='col-lg-4 mb-lg-0 mb-3' key={index}>
                      <WhyChooseBox
                        icon={item.icon}
                        name={item.name}
                        description={item.description}
                      />
                    </div>
                  ))}
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>

        <section className='categorySec'>
          <div className='container'>
            <div className='row justify-content-center'>
              <COLXXL10>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='sec-head'>
                      <p className='sec-tag sec-tag-white'>Category</p>
                      <h2>Need Help with a Task? We’ve Got You Covered</h2>
                    </div>
                  </div>
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>

        <section className='categoryCardSec'>
          <div className='container'>
            <div className='row justify-content-center'>
              <COLXXL10>
                <div className='row'>
                  <div className='col-lg-6 mb-lg-0 mb-3'>
                    <div className='category-card'>
                      <div className='category-card-content'>
                        <h4>Book Trusted Services Fast</h4>
                        <p>
                          Browse our service categories and connect instantly
                          with reliable local experts for cleaning, repairs, IT
                          help, and more.
                        </p>
                      </div>
                      <div className='category-card-img'>
                        <button className='customBtn btn-bgRed'>
                          Book a Service
                        </button>
                        <img
                          src={categoryimg1}
                          className='img-fluid'
                          alt='Category Card Image'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 mb-lg-0 mb-3'>
                    <div className='category-card'>
                      <div className='category-card-content'>
                        <h4>Offer Your Skills & Get Booked</h4>
                        <p>
                          Join Connecta24 and start receiving real-time requests
                          from local customers — grow your business with ease.
                        </p>
                      </div>
                      <div className='category-card-img'>
                        <button className='customBtn btn-bgGreen'>
                          Start Offering Services
                        </button>
                        <img
                          src={categoryimg2}
                          className='img-fluid'
                          alt='Category Card Image'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>

        <section className='industries-sec'>
          <div className='container'>
            <div className='row justify-content-center'>
              <COLXXL10>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='sec-head'>
                      <p className='sec-tag'>Industries</p>
                      <h2>Industries Served</h2>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='industry__boxes'>
                      {industrySecData.map((item, index) => (
                        <div className='industry__box' key={index}>
                          <div className='industry__box-icon'>
                            <img src={item.icon} alt='' />
                          </div>
                          <div className='industry__box-content'>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='text-center mt-4'>
                      <button className='customBtn btn-bgGreen'>
                        View All Categories
                      </button>
                    </div>
                  </div>
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>

        <section className='getStarted__sec'>
          <div className='container'>
            <div className='row justify-content-center'>
              <COLXXL10>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='sec-head'>
                      <h2>Getting Started</h2>
                    </div>
                  </div>

                  <div className='col-md-12'>
                    <Tabs
                      defaultActiveKey='forBusiness'
                      transition={false}
                      id='noanim-tab-example'
                      className='getStartedTabs'
                    >
                      {/* <Tab eventKey='forCustomers' title='For Customers'> */}
                      <Tab
                        eventKey='forCustomers'
                        title={
                          <>
                            <div className='btn__witchIcon'>
                              <FaRegUser />
                              For Customers
                            </div>
                          </>
                        }
                      >
                        <div className='row'>
                          {getStartedForCustomersData.map((item, index) => (
                            <div className='col-lg-4 mb-lg-0 mb-3' key={index}>
                              <div className='getStarted__box'>
                                <div className='getStarted__box-counter'>
                                  {item.number}
                                </div>
                                <div className='getStarted__box-content'>
                                  <h4>{item.name}</h4>
                                  <p>{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab>
                      {/* <Tab eventKey='forBusiness' title='For Business'> */}
                      <Tab
                        eventKey='forBusiness'
                        title={
                          <>
                            <div className='btn__witchIcon'>
                              <FaBusinessTime />
                              For Business
                            </div>
                          </>
                        }
                      >
                        <div className='row'>
                          {getStartedForBusinessData.map((item, index) => (
                            <div className='col-lg-4 mb-lg-0 mb-3' key={index}>
                              <div className='getStarted__box'>
                                <div className='getStarted__box-counter'>
                                  {item.number}
                                </div>
                                <div className='getStarted__box-content'>
                                  <h4>{item.name}</h4>
                                  <p>{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>

        <section className='newsletterSec'>
          <div className='container'>
            <div className='row justify-content-center'>
              <COLXXL10>
                <div className='newsletterSec__content'>
                  <h2>Subscribe Newsletter</h2>
                  <div className='newsletterSec__content-form'>
                    <form>
                      <InputGroup>
                        <Form.Control placeholder='Email Address' />
                        <Button
                          variant=''
                          className='customBtn btn-bgRed'
                          id='button-addon2'
                        >
                          Subscribe
                        </Button>
                      </InputGroup>
                    </form>
                  </div>
                  <p>You can unsubscribe at any time.</p>
                </div>
              </COLXXL10>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </div>
  );
};

export default Home;
