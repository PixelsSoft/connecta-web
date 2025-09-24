import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

import appleIcon from '../../../assets/images/apple-icon.png';
import playstoreIcon from '../../../assets/images/playstore-icon.png';

import facebookIcon from '../../../assets/images/facebook-icon.png';
import xIcon from '../../../assets/images/x-icon.png';
import linkedinIcon from '../../../assets/images/linkedin-icon.png';

import CustomModal from '../../../components/CustomModal';

import { useTranslation } from 'react-i18next';
import { applyGoogleTranslateLanguage } from '../../../utils/googleTranslate';

const HomeFooter = () => {
  const { t } = useTranslation(['common', 'home']);

  const [showLangModal, setShowLangModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');

  const handleLanguageChange = (lang) => {
    applyGoogleTranslateLanguage(lang);
  };

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                      {t('home.footerDescription')}
                    </p>
                    <div className='homeFooter-stores'>
                      {[
                        {
                          icon: appleIcon,
                          description: t('home.downloadOn'),
                          name: t('home.appStore'),
                        },
                        {
                          icon: playstoreIcon,
                          description: t('home.getItOn'),
                          name: t('home.googlePlay'),
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
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('navigation.quickLinks')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <Link to={'/'} className='footerLink'>
                              {t('navigation.home')}
                            </Link>
                          </li>
                          <li>
                            <a
                              // to={''}
                              href='javascript:;'
                              className='footerLink'
                              onClick={() => {
                                const el =
                                  document.getElementById('home-about');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              {t('navigation.aboutUs')}
                            </a>
                          </li>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('navigation.contactUs')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('navigation.support')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <Link to={'/'} className='footerLink'>
                              {t('navigation.howItWorks')}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={'/find-professionals'}
                              className='footerLink'
                            >
                              {t('buttons.bookService')}
                            </Link>
                          </li>
                          <li>
                            <Link to={'/sign-up'} className='footerLink'>
                              {t('buttons.signUpProfessional')}
                            </Link>
                          </li>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('navigation.faqs')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('navigation.termsConditions')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('navigation.termsConditions')}
                            </Link>
                          </li>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('navigation.privacyPolicy')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('home.selectLanguage')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() => handleLanguageChange('en')}
                            >
                              {t('home.english')}
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() => handleLanguageChange('de')}
                            >
                              {t('home.german')}
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() => handleLanguageChange('fr')}
                            >
                              {t('home.french')}
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() => handleLanguageChange('it')}
                            >
                              {t('home.italian')}
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
                      {t('home.copyright')}{' '}
                      <span style={{ color: '#26472B' }}>Connecta24</span> {t('home.allRightsReserved')}
                    </p>

                    <div className='footerSocial'>
                      <p>{t('home.followUsOn')}</p>
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

      {/* Language modal removed for Google Translate flow */}
    </>
  );
};

export default HomeFooter;
