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
                      {t('common:home.footerDescription')}
                    </p>
                    <div className='homeFooter-stores'>
                      {[
                        {
                          icon: appleIcon,
                          description: t('common:home.downloadOn'),
                          name: t('common:home.appStore'),
                        },
                        {
                          icon: playstoreIcon,
                          description: t('common:home.getItOn'),
                          name: t('common:home.googlePlay'),
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
                        <h2 className='footer-title'>{t('common:navigation.quickLinks')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <Link to={'/'} className='footerLink'>
                              {t('common:navigation.home')}
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
                              {t('common:navigation.aboutUs')}
                            </a>
                          </li>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('common:navigation.contactUs')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('common:navigation.support')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <Link to={'/'} className='footerLink'>
                              {t('common:navigation.howItWorks')}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={'/find-professionals'}
                              className='footerLink'
                            >
                              {t('common:buttons.bookService')}
                            </Link>
                          </li>
                          <li>
                            <Link to={'/sign-up'} className='footerLink'>
                              {t('common:buttons.signUpProfessional')}
                            </Link>
                          </li>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('common:navigation.faqs')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('common:navigation.termsConditions')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('common:navigation.termsConditions')}
                            </Link>
                          </li>
                          <li>
                            <Link to={''} className='footerLink'>
                              {t('common:navigation.privacyPolicy')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-3 col-6 mb-md-0 mb-3'>
                      <div className='footer-links'>
                        <h2 className='footer-title'>{t('common:home.selectLanguage')}</h2>
                        <ul className='footer-links'>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('en', t('common:home.english'))
                              }
                            >
                              {t('common:home.english')}
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('de', t('common:home.german'))
                              }
                            >
                              {t('common:home.german')}
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('fr', t('common:home.french'))
                              }
                            >
                              {t('common:home.french')}
                            </button>
                          </li>
                          <li>
                            <button
                              className='footerLink'
                              onClick={() =>
                                handleLanguageChange('it', t('common:home.italian'))
                              }
                            >
                              {t('common:home.italian')}
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
                      {t('common:home.copyright')}{' '}
                      <span style={{ color: '#26472B' }}>Connecta24</span> {t('common:home.allRightsReserved')}
                    </p>

                    <div className='footerSocial'>
                      <p>{t('common:home.followUsOn')}</p>
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
        title={t('common:languageModal.title')} // Optional title
        size='sm'
      >
        <p>{t('common:languageModal.message', { lang: selectedLang })}</p>
      </CustomModal>
    </>
  );
};

export default HomeFooter;
