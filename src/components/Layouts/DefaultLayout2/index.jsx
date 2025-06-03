import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import logo2 from '../../../assets/images/logo2.png';

const DefaultLayout2 = (props) => {
  return (
    <>
      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <Header logo={logo2} />
        <div className='flex-grow-1'>{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout2;
