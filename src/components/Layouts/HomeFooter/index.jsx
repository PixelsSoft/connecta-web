import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

import appleIcon from '../../../assets/images/apple-icon.png';
import playstoreIcon from '../../../assets/images/playstore-icon.png';

import facebookIcon from '../../../assets/images/facebook-icon.png';
import xIcon from '../../../assets/images/x-icon.png';
import linkedinIcon from '../../../assets/images/linkedin-icon.png';

import CustomModal from '../../../components/CustomModal';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const footerData = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', to: '/' },
      { name: 'About Us', to: '' },
      { name: 'Contact', to: '' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'How It Works', to: '' },
      { name: 'Book a Service', to: '' },
      { name: 'Become A Provider', to: '' },
      { name: 'FAQs', to: '' },
    ],
  },
  {
    title: 'Useful links',
    links: [
      { name: 'Terms & Conditions', to: '' },
      { name: 'Privacy Policy', to: '' },
    ],
  },
  // {
  //   title: 'Select Language',
  //   links: [
  //     { name: 'English', to: '' },
  //     { name: 'German', to: '' },
  //     { name: 'French', to: '' },
  //     { name: 'Italian', to: '' },
  //   ],
  // },
];

const HomeFooter = () => {
  const { t } = useTranslation();

  const [showLangModal, setShowLangModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');

  const handleLanguageChange = (langCode, langLabel) => {
    i18next.changeLanguage(langCode).then(() => {
      setSelectedLang(langLabel);
      setShowLangModal(true);
    });
  };
  return (
    <>
      <section className='mainFooter'>
        <div className='container'>
          <div className='row justify-content-end'>
            <div className='col-xxl-11'>
              <div className='row'>
                <div className='col-lg-4 mb-lg-0 mb-4'>
                  <div className='homeFooter-about'>
                    <div className='homeFooter-logo'>
                      <Link to={'/'}>
                        <img src={logo} alt='Connect 24 Logo' />
                      </Link>
                    </div>
                    <p className='homeFooter-about-description'>
                      Since 2024, Connecta24 has helped individuals and
                      businesses book trusted local professionals for home,
                      personal, and on-site services — fast, reliable, and
                      hassle-free.
                    </p>
                    <div className='homeFooter-stores'>
                      {[
                        {
                          icon: appleIcon,
                          description: 'Download on',
                          name: 'App Store',
                        },
                        {
                          icon: playstoreIcon,
                          description: 'Get it on',
                          name: 'Google Play',
                        },
                      ].map((item, index) => (
                        <a
                          href='javascript:;'
                          className='homeFooter-store'
                          key={index}
                        >
                          <div className='homeFooter-store-icon'>
                            <img src={item.icon} alt='' />
                          </div>
                          <div className='homeFooter-store-content'>
                            <p>{item.description}</p>
                            <h4>{item.name}</h4>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className='row'>
                    {footerData.map((item, index) => (
                      <div className='col-md-3 col-6 mb-md-0 mb-3' key={index}>
                        <div className='footer-links'>
                          <h2 className='footer-title'>{item.title}</h2>
                          <ul className='footer-links'>
                            {item.links.map((link, i) => (
                              <li key={i}>
                                <Link to={link.to} className='footerLink'>
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>Select Language</h2>
                        <ul className='footer-links'>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('en', 'English')
                              }
                            >
                              English
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('de', 'German')
                              }
                            >
                              German
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('fr', 'French')
                              }
                            >
                              French
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('it', 'Italian')
                              }
                            >
                              Italian
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='footer__copyright-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-10'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='footerCopyright__content'>
                    <p>
                      Copyright © 2025{' '}
                      <span style={{ color: '#26472B' }}>Connecta24</span> All
                      rights reserved.
                    </p>

                    <div className='footerSocial'>
                      <p>Follow Us On:</p>
                      <div className='footerSocial_links'>
                        <a href='javascript:;'>
                          <img src={facebookIcon} alt='' />
                        </a>
                        <a href='javascript:;'>
                          <img src={xIcon} alt='' />
                        </a>
                        <a href='javascript:;'>
                          <img src={linkedinIcon} alt='' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomModal
        show={showLangModal}
        handleClose={() => setShowLangModal(false)}
        title={t('languageModal.title')} // Optional title
        size='sm'
      >
        <p>{t('languageModal.message', { lang: selectedLang })}</p>
      </CustomModal>
    </>
  );
};

export default HomeFooter;
