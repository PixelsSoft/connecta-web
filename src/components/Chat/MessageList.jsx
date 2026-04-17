import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';

const MessageList = ({ messages, currentUserId, onDeleteMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, 'HH:mm');
    } catch (error) {
      return '';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const today = new Date();
      const messageDate = new Date(date);
      
      if (messageDate.toDateString() === today.toDateString()) {
        return 'Today';
      }
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (messageDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      }
      
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return '';
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const dateKey = formatDate(message.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="message-list">
      {Object.keys(messageGroups).length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-chat-text" style={{ fontSize: '48px', color: '#dedede' }}></i>
          <p className="text-muted mt-3">No messages yet. Start the conversation!</p>
        </div>
      ) : (
        Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date}>
            <div className="message-date-divider">
              <span>{date}</span>
            </div>
            {msgs.map((message) => {
              const isOwn = message.senderId === currentUserId;
              
              return (
                <div
                  key={message.id}
                  className={`message-wrapper ${isOwn ? 'own' : 'other'}`}
                >
                  <div className="message-bubble">
                    {message.type === 'text' && (
                      <p className="message-text">{message.message}</p>
                    )}
                    
                    {message.type === 'image' && (
                      <div className="message-image">
                        <img src={message.fileUrl} alt="Shared image" />
                        {message.message && <p className="message-text mt-2">{message.message}</p>}
                      </div>
                    )}
                    
                    {message.type === 'file' && (
                      <div className="message-file">
                        <i className="bi bi-file-earmark"></i>
                        <a href={message.fileUrl} target="_blank" rel="noopener noreferrer">
                          {message.message || 'Download File'}
                        </a>
                      </div>
                    )}
                    
                    <div className="message-meta">
                      <span className="message-time">{formatTime(message.timestamp)}</span>
                      {isOwn && (
                        <span className="message-status">
                          {message.read ? (
                            <i className="bi bi-check-all text-primary"></i>
                          ) : (
                            <i className="bi bi-check"></i>
                          )}
                        </span>
                      )}
                    </div>
                    
                    {isOwn && (
                      <button
                        className="message-delete"
                        onClick={() => onDeleteMessage(message.id)}
                        title="Delete message"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
