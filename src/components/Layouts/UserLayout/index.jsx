import React from 'react';
import Header from '../Header';
import UserHeader from './UserHeader';
import logo2 from '../../../assets/images/logo2.png';

const UserLayout = (props) => {
  return (
    <>
      <Header logo={logo2} />
      <UserHeader />
      {props.children}
    </>
  );
};

export default UserLayout;
