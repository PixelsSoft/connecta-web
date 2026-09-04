import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import servicearrowicon from '../../assets/images/service-arrow-icon.png';
import { useTranslation } from 'react-i18next';
import ServiceSearch from '../ServiceSearch/ServiceSearch';
import { getPopularServiceQueries, resolveUiLanguage } from '../../utils/categoryIcons';
import '../ServiceSearch/ServiceSearch.css';

import bannerIconImg1 from '../../assets/images/banner-icon-img1.png';
import bannerIconImg2 from '../../assets/images/banner-icon-img2.png';
import bannerIconImg3 from '../../assets/images/banner-icon-img3.png';
import bannerIconImg4 from '../../assets/images/banner-icon-img4.png';
import bannerIconImg5 from '../../assets/images/banner-icon-img5.png';
import bannerIconImg6 from '../../assets/images/banner-icon-img6.png';

import COLXXL10 from '../COLXXL10';

const MainBanner = () => {
  const { t, i18n } = useTranslation();
  const [uiLang, setUiLang] = useState(() => resolveUiLanguage(i18n.language));
  const bannerPopular = getPopularServiceQueries(uiLang).slice(0, 6);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isProfessional = isAuthenticated && user?.user_type === 'professional';

  useEffect(() => {
    const syncLang = (event) => {
      const next = event?.detail?.lang || resolveUiLanguage(i18n.language);
      setUiLang(resolveUiLanguage(next));
    };
    window.addEventListener('connecta:language', syncLang);
    // Re-check after Google Translate applies html lang
    const timer = setInterval(() => {
      const resolved = resolveUiLanguage(i18n.language);
      setUiLang((prev) => (prev !== resolved ? resolved : prev));
    }, 1500);
    return () => {
      window.removeEventListener('connecta:language', syncLang);
      clearInterval(timer);
    };
  }, [i18n.language]);

  return (
    <section className='main-banner'>
      <div className='container position-relative'>
        <div className='row justify-content-center'>
          <COLXXL10>
            <div className='main__banner-content'>
              <h1>{t('home:banner.title')}</h1>
              <p>{t('home:banner.description')}</p>

              {!isProfessional && (
                <div className='main__banner-search'>
                  <span className='main__banner-search-label'>
                    {t('common:jobPosting.searchFirstTitle')}
                  </span>
                  <ServiceSearch
                    variant='banner'
                    placeholder={t('common:jobPosting.searchPlaceholder')}
                    popularQueries={bannerPopular}
                  />
                </div>
              )}

              <div className='main__banner-btns'>
                {isProfessional ? (
                  <Link
                    to='/recruiter/posted-jobs'
                    className='customBtn btn-bgRed btn__witchIcon '
                  >
                    <span>{t('common:buttons.browseLeads')}</span>
                    <img src={servicearrowicon} alt='Icon' />
                  </Link>
                ) : (
                  <Link
                    to='/find-professionals'
                    className='customBtn btn-bgRed btn__witchIcon '
                  >
                    <span>{t('common:buttons.browseCategories')}</span>
                    <img src={servicearrowicon} alt='Icon' />
                  </Link>
                )}
                <Link
                  to={isProfessional ? '/recruiter/account-setting/contact-info' : '/sign-up'}
                  className='customBtn btn-bgWhite'
                >
                  {isProfessional
                    ? t('common:home.profileSettings')
                    : t('common:buttons.offerServices')}
                </Link>
              </div>
            </div>
          </COLXXL10>
          <div className='col-md-12'>
            <div className='mainBanner-iconImgs'>
              <div className='mainBanner-iconImgs-1'>
                <div className='mainBanner-icon-container'>
                  <div className='mainBanner-icon-img'>
                    <img src={bannerIconImg1} alt='' />
                  </div>
                  <div className='mainBanner-icon-label'>Cleaner</div>
                </div>
                <div className='mainBanner-icon-container'>
                  <div className='mainBanner-icon-img'>
                    <img src={bannerIconImg2} alt='' />
                  </div>
                  <div className='mainBanner-icon-label'>Plumber</div>
                </div>
              </div>
              <div className='mainBanner-iconImgs-2'>
                <div className='mainBanner-icon-container'>
                  <div className='mainBanner-icon-img'>
                    <img src={bannerIconImg3} alt='' />
                  </div>
                  <div
                    className='mainBanner-icon-label'
                    style={{ backgroundColor: '#3EE4EF' }}
                  >
                    Electrician
                  </div>
                </div>
                <div className='mainBanner-icon-container'>
                  <div className='mainBanner-icon-img'>
                    <img src={bannerIconImg4} alt='' />
                  </div>
                  <div
                    className='mainBanner-icon-label'
                    style={{ backgroundColor: '#FF9A61' }}
                  >
                    Cleaner
                  </div>
                </div>
              </div>
              <div className='mainBanner-iconImgs-3'>
                <div className='mainBanner-icon-container'>
                  <div className='mainBanner-icon-img'>
                    <img src={bannerIconImg5} alt='' />
                  </div>
                  <div
                    className='mainBanner-icon-label'
                    style={{ backgroundColor: '#3EE4EF' }}
                  >
                    IT specialists
                  </div>
                </div>
                <div className='mainBanner-icon-container'>
                  <div className='mainBanner-icon-img'>
                    <img src={bannerIconImg6} alt='' />
                  </div>
                  <div
                    className='mainBanner-icon-label'
                    style={{ backgroundColor: '#C99FFF' }}
                  >
                    Gardener
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
