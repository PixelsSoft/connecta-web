import React from 'react';
import RecruiterLayout from '../../components/Layouts/RecruiterLayout';
import UserLayout from '../../components/Layouts/UserLayout';
import ChatLayout from '../../components/ChatLayout';

const ChatPage = () => {
  const role = 'recruiter'; // This should be dynamically set based on user role
  const Layout = role === 'recruiter' ? RecruiterLayout : UserLayout;
  return (
    <Layout>
      <ChatLayout />
    </Layout>
  );
};

export default ChatPage;
