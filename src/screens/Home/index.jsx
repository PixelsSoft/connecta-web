import React, { useRef, useState } from 'react';
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

const whyChooseData = (t) => [
  {
    icon: whyChooseIcon1,
    name: t('home.reliableProfessionals'),
    description: t('home.reliableProfessionalsDesc'),
  },
  {
    icon: whyChooseIcon2,
    name: t('home.fastBookingProcess'),
    description: t('home.fastBookingProcessDesc'),
  },
  {
    icon: whyChooseIcon3,
    name: t('home.customSolutions'),
    description: t('home.customSolutionsDesc'),
  },
];

const industrySecData = (t) => [
  {
    icon: industryicon1,
    name: t('home.handyman'),
    description: '2853 Staff',
  },
  {
    icon: industryicon2,
    name: t('home.cleaningServices'),
    description: '2256 Staff',
  },
  {
    icon: industryicon3,
    name: t('home.itSupport'),
    description: '1408 Staff',
  },
  {
    icon: industryicon4,
    name: t('home.electrician'),
    description: '1740 Staff',
  },
  {
    icon: industryicon5,
    name: t('home.personalServices'),
    description: '3948 Staff',
  },
  {
    icon: industryicon6,
    name: t('home.generalLabor'),
    description: '2984 Staff',
  },
  {
    icon: industryicon7,
    name: t('home.gardening'),
    description: '4509 Staff',
  },
  {
    icon: industryicon8,
    name: t('home.paintingDecor'),
    description: '1039 Staff',
  },
  // ========================================================
  {
    icon: industryicon1,
    name: t('home.handyman'),
    description: '2853 Staff',
  },
  {
    icon: industryicon2,
    name: t('home.cleaningServices'),
    description: '2256 Staff',
  },
  {
    icon: industryicon3,
    name: t('home.itSupport'),
    description: '1408 Staff',
  },
  {
    icon: industryicon4,
    name: t('home.electrician'),
    description: '1740 Staff',
  },
  {
    icon: industryicon5,
    name: t('home.personalServices'),
    description: '3948 Staff',
  },
  {
    icon: industryicon6,
    name: t('home.generalLabor'),
    description: '2984 Staff',
  },
  {
    icon: industryicon7,
    name: t('home.gardening'),
    description: '4509 Staff',
  },
  {
    icon: industryicon8,
    name: t('home.paintingDecor'),
    description: '1039 Staff',
  },
];

const getStartedForCustomersData = (t) => [
  {
    number: 1,
    name: t('home.postJob'),
    description: t('home.postJobDesc'),
  },
  {
    number: 2,
    name: t('home.compareOffers'),
    description: t('home.compareOffersDesc'),
  },
  {
    number: 3,
    name: t('home.hireReview'),
    description: t('home.hireReviewDesc'),
  },
];
const getStartedForBusinessData = (t) => [
  {
    number: 1,
    name: t('home.browseServices'),
    description: t('home.browseServicesDesc'),
  },
  {
    number: 2,
    name: t('home.getBookedInstantly'),
    description: t('home.getBookedInstantlyDesc'),
  },
  {
    number: 3,
    name: t('home.respondToRequests'),
    description: t('home.respondToRequestsDesc'),
  },
];

const Home = () => {
  // const aboutRef = useRef(null);
  const { t } = useTranslation('common');

  const [showAll, setShowAll] = useState(false);

  const initialCount = 8;
  const displayedItems = showAll
    ? industrySecData(t)
    : industrySecData(t).slice(0, initialCount);

  const handleToggle = () => setShowAll((prev) => !prev);

  return (
    <div className='homePage'>
      <DefaultLayout>
        <MainBanner />

        <section className='home-aboutSec' id='home-about'>
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
                        <p className='sec-tag'>{t('home.aboutUs')}</p>
                        <h2>
                          {t('home.yourTrustedPlatform').split(' ').slice(0, -1).join(' ')}{' '}
                          <span className='greenColor'>{t('home.yourTrustedPlatform').split(' ').slice(-1)}</span>
                        </h2>
                        <p className='sec-description'>
                          {t('home.aboutDescription')}
                        </p>
                        <div className='check-list-group'>
                          {[
                            t('home.tailoredServices'),
                            t('home.scalableSolutions'),
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
                          description: t('home.trustedProfessionals'),
                        },
                        {
                          head: '95%',
                          description: t('home.jobsFulfillmentRate'),
                        },
                        {
                          head: '12K',
                          description: t('home.jobsFilled'),
                        },
                        {
                          head: '825+',
                          description: t('home.satisfiedBusinesses'),
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
                      <p className='sec-tag'>{t('home.whyUs')}</p>
                      <h2>{t('home.whyChooseUs')}</h2>
                    </div>
                  </div>
                  {whyChooseData(t).map((item, index) => (
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
                      <p className='sec-tag sec-tag-white'>{t('home.category')}</p>
                      <h2>{t('home.needHelpWithTask')}</h2>
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
                        <h4>{t('home.bookTrustedServices')}</h4>
                        <p>
                          {t('home.bookTrustedServicesDesc')}
                        </p>
                      </div>
                      <div className='category-card-img'>
                        <Link
                          to={'/find-professionals'}
                          className='customBtn btn-bgRed'
                        >
                          {t('buttons.bookService')}
                        </Link>
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
                        <h4>{t('home.offerYourSkills')}</h4>
                        <p>
                          {t('home.offerYourSkillsDesc')}
                        </p>
                      </div>
                      <div className='category-card-img'>
                        <Link to={'/sign-up'} className='customBtn btn-bgGreen'>
                          {t('buttons.offerServices')}
                        </Link>
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
                      <p className='sec-tag'>{t('home.industries')}</p>
                      <h2>{t('home.industriesServed')}</h2>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='industry__boxes'>
                      {displayedItems.map((item, index) => (
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
                      {/* <button className='customBtn btn-bgGreen'>
                        View All Categories
                      </button> */}
                      <button
                        className='customBtn btn-bgGreen'
                        onClick={handleToggle}
                      >
                        {showAll ? t('buttons.showLess') : t('buttons.viewAll')}
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
                      <h2>{t('home.gettingStarted')}</h2>
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
                              {t('home.forCustomers')}
                            </div>
                          </>
                        }
                      >
                        <div className='row'>
                          {getStartedForCustomersData(t).map((item, index) => (
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
                              {t('home.forBusiness')}
                            </div>
                          </>
                        }
                      >
                        <div className='row'>
                          {getStartedForBusinessData(t).map((item, index) => (
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
                  <h2>{t('home.subscribeNewsletter')}</h2>
                  <div className='newsletterSec__content-form'>
                    <form>
                      <InputGroup>
                        <Form.Control placeholder={t('home.emailAddress')} />
                        <Button
                          variant=''
                          className='customBtn btn-bgRed'
                          id='button-addon2'
                        >
                          {t('buttons.subscribe')}
                        </Button>
                      </InputGroup>
                    </form>
                  </div>
                  <p>{t('home.unsubscribeAnytime')}</p>
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
