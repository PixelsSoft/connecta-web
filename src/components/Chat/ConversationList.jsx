import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const ConversationList = ({ conversations, currentUserId, selectedConversation, onSelectConversation }) => {
  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find(id => id !== currentUserId);
    return conversation.participantsData?.[otherUserId] || {};
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h4 className="mb-0">Messages</h4>
      </div>
      
      <div className="conversation-list-body">
        {conversations.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-chat-dots" style={{ fontSize: '48px', color: '#dedede' }}></i>
            <p className="text-muted mt-3">No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => {
            const otherUser = getOtherUser(conversation);
            const unreadCount = conversation.unreadCount?.[currentUserId] || 0;
            const isSelected = selectedConversation?.id === conversation.id;
            
            return (
              <div
                key={conversation.id}
                className={`conversation-item ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="conversation-avatar">
                  {otherUser.avatar ? (
                    <img src={otherUser.avatar} alt={otherUser.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {otherUser.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  {unreadCount > 0 && (
                    <span className="unread-badge">{unreadCount}</span>
                  )}
                </div>
                
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h5 className="conversation-name">{otherUser.name || 'Unknown User'}</h5>
                    <span className="conversation-time">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <div className="conversation-preview">
                    <p className={unreadCount > 0 ? 'unread' : ''}>
                      {conversation.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
