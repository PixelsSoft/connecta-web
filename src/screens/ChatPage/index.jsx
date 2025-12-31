import React from 'react';
import RecruiterLayout from '../../components/Layouts/RecruiterLayout';
import UserLayout from '../../components/Layouts/UserLayout';
import ChatLayout from '../../components/ChatLayout';
import { useAuth } from '../../context/AuthContext';

const ChatPage = () => {
  const { userRole } = useAuth();
  // Use professional role to determine layout (professional = RecruiterLayout, user = UserLayout)
  const Layout = userRole === 'professional' ? RecruiterLayout : UserLayout;
  return (
    <Layout>
      <ChatLayout />
    </Layout>
  );
};

export default ChatPage;
