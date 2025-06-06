import React from 'react';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import ChatLayout from '../../../components/ChatLayout';

const RecruiterChat = () => {
  return (
    <div className='chatScreen-page'>
      <RecruiterLayout>
        <ChatLayout />
      </RecruiterLayout>
    </div>
  );
};

export default RecruiterChat;
