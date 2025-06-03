import React from 'react';
import Header from '../Header';
import UserHeader from './UserHeader';

const UserLayout = (props) => {
  return (
    <>
      <Header />
      <UserHeader />
      {props.children}
    </>
  );
};

export default UserLayout;
