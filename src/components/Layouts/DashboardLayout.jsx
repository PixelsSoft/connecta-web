import React from 'react';
import { useSelector } from 'react-redux';
import RecruiterLayout from './RecruiterLayout';
import UserLayout from './UserLayout';

/**
 * Smart layout component that renders the appropriate layout based on user type
 * - Professional users get RecruiterLayout
 * - Customer users get UserLayout
 */
const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  // Determine which layout to use based on user_type
  const Layout = user?.user_type === 'professional' ? RecruiterLayout : UserLayout;
  
  return <Layout>{children}</Layout>;
};

export default DashboardLayout;
