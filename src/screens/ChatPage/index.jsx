import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserLayout from '../../components/Layouts/UserLayout';
import RecruiterLayout from '../../components/Layouts/RecruiterLayout';
import ConversationList from '../../components/Chat/ConversationList';
import MessageList from '../../components/Chat/MessageList';
import MessageInput from '../../components/Chat/MessageInput';
import {
  getOrCreateConversation,
  sendMessage,
  uploadFile,
  subscribeToMessages,
  subscribeToConversations,
  markMessagesAsRead,
  deleteMessage,
} from '../../services/chatService';
import './ChatPage.css';

const ChatPage = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(!location.state?.userId); // Don't load if coming from "Start Chat"
  const [sendingMessage, setSendingMessage] = useState(false);

  // Determine layout based on user type
  const Layout = user?.user_type === 'professional' ? RecruiterLayout : UserLayout;

  // Subscribe to user's conversations
  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = subscribeToConversations(user.id.toString(), (convos) => {
      setConversations(convos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id]);

  // Handle incoming conversation from navigation state
  useEffect(() => {
    const initializeChat = async () => {
      if (!location.state?.userId || !user) {
        console.log('⏭️ No userId in navigation state');
        return;
      }

      console.log('🚀 START CHAT clicked - User ID:', location.state.userId);
      console.log('📋 Navigation state:', location.state);

      try {
        const otherUserId = location.state.userId.toString();
        
        // Create conversation ID
        const conversationId = [user.id.toString(), otherUserId].sort().join('_');
        
        // Create temporary conversation for immediate display (optimistic UI)
        const tempConversation = {
          id: conversationId,
          participants: [user.id.toString(), otherUserId],
          participantsData: {
            [user.id.toString()]: {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              avatar: user.avatar || null,
              userType: user.user_type,
            },
            [otherUserId]: {
              id: otherUserId,
              name: location.state.userName || 'User',
              email: location.state.userEmail || '',
              avatar: location.state.userAvatar || null,
              userType: location.state.userType || 'customer',
            },
          },
          lastMessage: null,
          lastMessageTime: new Date(),
          unreadCount: { [user.id.toString()]: 0, [otherUserId]: 0 },
        };

        // Set conversation IMMEDIATELY
        console.log('✅ Setting conversation immediately:', conversationId);
        setSelectedConversation(tempConversation);
        setLoading(false);
        
        // Add to conversations list if not exists
        setConversations(prev => {
          const exists = prev.find(c => c.id === conversationId);
          if (!exists) {
            console.log('➕ Adding to conversations list');
            return [tempConversation, ...prev];
          }
          return prev;
        });

        // Now sync with Firebase in background
        console.log('🔄 Syncing with Firebase...');
        await getOrCreateConversation(
          user.id.toString(),
          otherUserId,
          {
            name: user.name,
            email: user.email,
            avatar: user.avatar || null,
            userType: user.user_type,
          },
          {
            name: location.state.userName || 'User',
            email: location.state.userEmail || '',
            avatar: location.state.userAvatar || null,
            userType: location.state.userType || 'customer',
          }
        );
        console.log('✅ Firebase sync complete');
        toast.success(`Chat with ${location.state.userName} started!`);
      } catch (error) {
        console.error('❌ Error initializing chat:', error);
        toast.error('Failed to start conversation');
      }
    };

    // Run immediately when component mounts with userId
    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.userId, user?.id]);

  // Subscribe to messages when conversation is selected
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    const unsubscribe = subscribeToMessages(selectedConversation.id, (msgs) => {
      setMessages(msgs);
    });

    // Mark messages as read
    markMessagesAsRead(selectedConversation.id, user.id.toString());

    return () => unsubscribe();
  }, [selectedConversation, user?.id]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    markMessagesAsRead(conversation.id, user.id.toString());
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedConversation || !messageText.trim()) return;

    setSendingMessage(true);
    try {
      await sendMessage(
        selectedConversation.id,
        user.id.toString(),
        user.name,
        messageText,
        'text'
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSendFile = async (file) => {
    if (!selectedConversation) return;

    try {
      // Upload file to Firebase Storage
      const fileUrl = await uploadFile(file, selectedConversation.id);
      
      // Determine file type
      const fileType = file.type.startsWith('image/') ? 'image' : 'file';
      
      // Send message with file
      await sendMessage(
        selectedConversation.id,
        user.id.toString(),
        user.name,
        file.name,
        fileType,
        fileUrl
      );
    } catch (error) {
      console.error('Error sending file:', error);
      throw error;
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!selectedConversation) return;
    
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(selectedConversation.id, messageId);
        toast.success('Message deleted');
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      }
    }
  };

  const getOtherUser = () => {
    if (!selectedConversation) return null;
    const otherUserId = selectedConversation.participants.find(id => id !== user.id.toString());
    return selectedConversation.participantsData?.[otherUserId] || {};
  };

  const otherUser = getOtherUser();

  if (loading) {
    return (
      <Layout>
        <div className="chat-container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading conversations...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="chat-container">
        <div className="chat-wrapper">
          {/* Conversations Sidebar */}
          <div className="chat-sidebar">
            <ConversationList
              conversations={conversations}
              currentUserId={user.id.toString()}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
            />
          </div>

          {/* Chat Area */}
          <div className="chat-main">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-header-user">
                    <div className="chat-avatar">
                      {otherUser.avatar ? (
                        <img src={otherUser.avatar} alt={otherUser.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {otherUser.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="chat-user-info">
                      <h5>{otherUser.name || 'Unknown User'}</h5>
                      <span className="user-type-badge">
                        {otherUser.userType === 'professional' ? 'Professional' : 'Customer'}
                      </span>
                    </div>
                  </div>
                  <div className="chat-header-actions">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/profile/${otherUser.id}`)}
                      title="View Profile"
                    >
                      <i className="bi bi-person"></i>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <MessageList
                  messages={messages}
                  currentUserId={user.id.toString()}
                  onDeleteMessage={handleDeleteMessage}
                />

                {/* Message Input */}
                <MessageInput
                  onSendMessage={handleSendMessage}
                  onSendFile={handleSendFile}
                  disabled={sendingMessage}
                />
              </>
            ) : (
              <div className="chat-empty-state">
                <i className="bi bi-chat-dots" style={{ fontSize: '64px', color: '#dedede' }}></i>
                <h4 className="mt-3">Select a conversation</h4>
                <p className="text-muted">Choose a conversation from the list to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
