import React from 'react';
import { Link } from 'react-router-dom';
import servicearrowicon from '../../assets/images/service-arrow-icon.png';

import { useTranslation } from 'react-i18next';

import bannerIconImg1 from '../../assets/images/banner-icon-img1.png';
import bannerIconImg2 from '../../assets/images/banner-icon-img2.png';
import bannerIconImg3 from '../../assets/images/banner-icon-img3.png';
import bannerIconImg4 from '../../assets/images/banner-icon-img4.png';
import bannerIconImg5 from '../../assets/images/banner-icon-img5.png';
import bannerIconImg6 from '../../assets/images/banner-icon-img6.png';

import COLXXL10 from '../COLXXL10';

const MainBanner = () => {
  const { t } = useTranslation();
  return (
    <section className='main-banner'>
      <div className='container position-relative'>
        <div className='row justify-content-center'>
          <COLXXL10>
            <div className='main__banner-content'>
              <h1>{t('home:banner.title')}</h1>
              <p>{t('home:banner.description')}</p>
              <div className='main__banner-btns'>
                <Link
                  to={'/find-professionals'}
                  className='customBtn btn-bgRed btn__witchIcon '
                >
                  <span>{t('common:buttons.bookService')}</span>
                  <img src={servicearrowicon} alt='Icon' />
                </Link>
                <Link to={'/sign-up'} className='customBtn btn-bgWhite'>
                  {t('common:buttons.offerServices')}
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
