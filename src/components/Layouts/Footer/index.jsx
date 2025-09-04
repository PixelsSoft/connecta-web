import React from 'react';
import { useTranslation } from 'react-i18next';

import footerContentIcon1 from '../../../assets/images/footerContentIcon-1.png';
import footerContentIcon2 from '../../../assets/images/footerContentIcon-2.png';
import footerContentIcon3 from '../../../assets/images/footerContentIcon-3.png';

const Footer = () => {
  const { t } = useTranslation('common');

  const footerContentData = [
    {
      icon: footerContentIcon1,
      description: t('footer.getStartedNow'),
    },
    {
      icon: footerContentIcon2,
      description: t('footer.verifiedProfessionals'),
    },
    {
      icon: footerContentIcon3,
      description: t('footer.satisfiedClients'),
    },
  ];

  return (
    <section className='footer-sec'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='footer-sec-content'>
              {footerContentData.map((item, index) => (
                <div
                  className={`footer-sec-contentDiv footer-sec-contentDiv-${
                    index + 1
                  }`}
                  key={index}
                >
                  <div className='footerContentDiv-icon'>
                    <img src={item.icon} alt='' />
                  </div>
                  <h4>{item.description}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
