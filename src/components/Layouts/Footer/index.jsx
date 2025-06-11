import React from 'react';

import footerContentIcon1 from '../../../assets/images/footerContentIcon-1.png';
import footerContentIcon2 from '../../../assets/images/footerContentIcon-2.png';
import footerContentIcon3 from '../../../assets/images/footerContentIcon-3.png';

const footerContentData = [
  {
    icon: footerContentIcon1,
    description: 'Get Started Now - Post Your Job for Free',
  },
  {
    icon: footerContentIcon2,
    description: 'Over 237,000 Verified Professionals at Your Service',
  },
  {
    icon: footerContentIcon3,
    description:
      '825,000+ Satisfied Clients trust Connect24 for quality service',
  },
];

const Footer = () => {
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
