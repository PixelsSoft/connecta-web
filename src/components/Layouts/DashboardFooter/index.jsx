import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo3.png';

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
      { name: 'For Workers', to: '' },
      { name: 'For Professionals', to: '' },
      { name: 'Contact Us', to: '' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'how it works', to: '' },
      { name: 'Features', to: '' },
      { name: 'pricing', to: '' },
      { name: 'download', to: '' },
    ],
  },
  {
    title: 'Useful links',
    links: [
      { name: 'FAQS', to: '' },
      { name: 'TERMS & CONDITIONS', to: '' },
      { name: 'PRIVACY POLICY', to: '' },
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

const DashboardFooter = () => {
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
      <section className='mainFooter dashboardFooter'>
        <div className='container'>
          <div className='row justify-content-end'>
            <div className='col-lg-12'>
              <div className='footer-head'>
                <h2>lets contact</h2>
              </div>
            </div>
            <div className='col-lg-4 mb-lg-0 mb-4'>
              <div className='homeFooter-about'>
                <div className='homeFooter-logo'>
                  <Link to={'/'}>
                    <img src={logo} alt='Connect 24 Logo' />
                  </Link>
                </div>
                <p className='homeFooter-about-description'>
                  Lorem Ipsum es simplemente el texto de relleno de las
                  imprentas y archivos de texto. Lorem Ipsum ha sido el texto
                  de.Lorem Ipsum es simplemente el texto de relleno de las
                </p>
                {/* <div className='homeFooter-stores'>
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
                </div> */}
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
                          onClick={() => handleLanguageChange('en', 'English')}
                        >
                          English
                        </button>
                      </li>
                      <li>
                        <button
                          className='footerLink'
                          onClick={() => handleLanguageChange('de', 'German')}
                        >
                          German
                        </button>
                      </li>
                      <li>
                        <button
                          className='footerLink'
                          onClick={() => handleLanguageChange('fr', 'French')}
                        >
                          French
                        </button>
                      </li>
                      <li>
                        <button
                          className='footerLink'
                          onClick={() => handleLanguageChange('it', 'Italian')}
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
      </section>
      <section className='footer__copyright-sec dashboardFooter__copyright-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-12'>
              <div className='footerCopyright__content'>
                <p>
                  Copyright © 2025{' '}
                  <span style={{ color: '#26472B' }}>Connecta24</span> All
                  rights reserved.
                </p>

                {/* <div className='footerSocial'>
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
                    </div> */}
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

export default DashboardFooter;
