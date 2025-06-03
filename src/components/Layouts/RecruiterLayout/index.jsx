import React from 'react';
// import Header from '../Layouts/Header';
import Header from '../Header';
import RecruiterHeader from './RecruiterHeader';

const RecruiterLayout = (props) => {
  return (
    <>
      <Header />
      <RecruiterHeader />
      {props.children}
    </>
  );
};

export default RecruiterLayout;
