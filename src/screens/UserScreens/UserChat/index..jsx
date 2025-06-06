import React from 'react';
import UserLayout from '../../../components/Layouts/UserLayout';
import ChatLayout from '../../../components/ChatLayout';

const UserChat = () => {
  return (
    <div className='chatScreen-page'>
      <UserLayout>
        <ChatLayout />
      </UserLayout>
    </div>
  );
};

export default UserChat;
