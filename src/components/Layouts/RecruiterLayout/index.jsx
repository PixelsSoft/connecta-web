import React from 'react';
// import Header from '../Layouts/Header';
import Header from '../Header';
import RecruiterHeader from './RecruiterHeader';

import logo2 from '../../../assets/images/logo2.png';

const RecruiterLayout = (props) => {
  return (
    <>
      <Header logo={logo2} />
      <RecruiterHeader />
      {props.children}
    </>
  );
};

export default RecruiterLayout;
