import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import './index.css';
import { BiSearch } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import { LuMenu } from 'react-icons/lu';

import chatheadicon from '../../assets/images/chat-head-icon.png';
import sendIcon from '../../assets/images/send-icon.png';
import attachIcon from '../../assets/images/attach-icon.png';
import chatusericon1 from '../../assets/images/chat-user-icon1.png';

import {
  getOrCreateConversation,
  sendMessage,
  uploadFile,
  subscribeToMessages,
  subscribeToConversations,
  markMessagesAsRead,
} from '../../services/chatService';


const ChatLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const messagesEndRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [activeSection, setActiveSection] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1199);
  
  // Firebase state
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(!location.state?.userId); // Don't load if coming from "Start Chat"
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [firebaseError, setFirebaseError] = useState(false);
  const [firebaseSynced, setFirebaseSynced] = useState(false); // Track if conversation is synced with Firebase

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      setIsTablet(window.innerWidth <= 1199);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subscribe to user's conversations
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    let unsubscribe;
    
    const loadConversations = async () => {
      try {
        unsubscribe = subscribeToConversations(user.id.toString(), (convos) => {
          setConversations(convos);
          setLoading(false);
          setFirebaseError(false);
        });
      } catch (error) {
        if (error.message?.includes('Missing or insufficient permissions')) {
          toast.error('Firestore permissions error! Check console for fix.', { duration: 5000 });
        }
        
        setFirebaseError(true);
        setLoading(false);
        
        if (!location.state?.userId && !error.message?.includes('permissions')) {
          toast.error('Chat connection failed. Please try again.');
        }
      }
    };

    // Load conversations in background (non-blocking)
    loadConversations();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.id, location.state?.userId]);

  useEffect(() => {
    if (!location.state?.userId || !user) {
      return;
    }
    
    const otherUserId = location.state.userId.toString();
    const conversationId = [user.id.toString(), otherUserId].sort().join('_');
    
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
      jobDetails: location.state.jobDetails || null,
    };

    setSelectedConversation(tempConversation);
    setLoading(false);
    setFirebaseError(false);
    
    setConversations(prev => {
      const exists = prev.find(c => c.id === conversationId);
      if (!exists) return [tempConversation, ...prev];
      return prev;
    });

    const syncWithFirebase = async () => {
      try {
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
          },
          location.state.jobDetails || null
        );
        setFirebaseSynced(true);
        toast.success(`Chat with ${location.state.userName} is ready!`);
      } catch (error) {
        setFirebaseSynced(false);
        toast.error('Failed to connect to chat. Please refresh the page.');
      }
    };
    
    syncWithFirebase();
  }, [location.state?.userId, user?.id]);

  // Subscribe to messages when conversation is selected
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    let unsubscribe;
    
    try {
      unsubscribe = subscribeToMessages(selectedConversation.id, (msgs) => {
        setMessages(msgs);
        scrollToBottom();
      });

      markMessagesAsRead(selectedConversation.id, user.id.toString());
    } catch (error) {
      setFirebaseError(true);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedConversation, user?.id]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setFirebaseSynced(true); // Existing conversations are already synced
    markMessagesAsRead(conversation.id, user.id.toString());
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!selectedConversation) {
      toast.error('Please select a conversation');
      return;
    }

    // Check if conversation is synced with Firebase (only for new conversations from "Start Chat")
    if (location.state?.userId && !firebaseSynced) {
      toast.error('Chat is connecting... Please wait a moment and try again.');
      return;
    }

    // Handle file upload
    if (file) {
      setSending(true);
      try {
        const fileUrl = await uploadFile(file, selectedConversation.id);
        const fileType = file.type.startsWith('image/') ? 'image' : 'file';
        
        await sendMessage(
          selectedConversation.id,
          user.id.toString(),
          user.name,
          message.trim() || file.name,
          fileType,
          fileUrl
        );
        
        setFile(null);
        setMessage('');
        e.target.reset();
      } catch (error) {
        toast.error('Failed to send file');
      } finally {
        setSending(false);
      }
      return;
    }

    // Handle text message
    if (message.trim()) {
      setSending(true);
      try {
        await sendMessage(
          selectedConversation.id,
          user.id.toString(),
          user.name,
          message.trim(),
          'text'
        );
        setMessage('');
      } catch (error) {
        toast.error('Failed to send message');
      } finally {
        setSending(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const getOtherUser = (conversation) => {
    if (!conversation) return null;
    const otherUserId = conversation.participants.find(id => id !== user.id.toString());
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

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);
      
      if (diffInHours < 24) {
        return formatDistanceToNow(date, { addSuffix: true });
      }
      return date.toLocaleDateString();
    } catch (error) {
      return '';
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const otherUser = getOtherUser(conv);
    return otherUser.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedOtherUser = getOtherUser(selectedConversation);

  return (
    <section className='chatSection'>
      <div className='container h-100'>
        <div className='chat-layout'>
          <div
            className={`chat-layout__sidebar ${sidebarOpen ? 'open' : ''} ${
              !isMobile ? 'visible' : ''
            }`}
          >
            <div className='chat-layout__header'>
              <div className='chat-layout__header-title'>
                <img
                  src={chatheadicon}
                  className='chat-layout__header-icon'
                  alt=''
                />
                {isMobile && (
                  <button
                    className='chat-menu-icon'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <IoIosClose />
                  </button>
                )}
              </div>
              <div className='travelForWork-search-box mt-0 mb-0'>
                <div className='input-group input-group-btn'>
                  <button className='btn' type='button' id='button-addon2'>
                    <BiSearch />
                  </button>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search contacts'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='chat-layout__body'>
              <div className='chat-layout__sidebar-filter'>
                <select
                  aria-label='Default select example'
                  defaultValue='Recent Chats'
                >
                  <option value='Recent Chats'>Recent Chats</option>
                </select>
              </div>
              <div className='chat-layout__body-users'>
                {loading ? (
                  <div className='text-center py-4'>
                    <div className='spinner-border spinner-border-sm' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className='text-center py-4 text-muted'>
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => {
                    const otherUser = getOtherUser(conversation);
                    const unreadCount = conversation.unreadCount?.[user.id.toString()] || 0;
                    const isSelected = selectedConversation?.id === conversation.id;
                    
                    return (
                      <div
                        className={`chatUserBox ${isSelected ? 'active' : ''}`}
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className='chatUserBox__profile'>
                          {otherUser.avatar ? (
                            <img src={otherUser.avatar} alt={otherUser.name} />
                          ) : (
                            <img src={chatusericon1} alt={otherUser.name} />
                          )}
                          {unreadCount > 0 && (
                            <span className='unread-badge'>{unreadCount}</span>
                          )}
                        </div>
                        <div className='chatUserBox__content'>
                          <div className='chatUserBox__content-header'>
                            <h5>{otherUser.name || 'Unknown User'}</h5>
                            <span className='chatUserBox__content-headerTime'>
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className={unreadCount > 0 ? 'font-weight-bold' : ''}>
                            {conversation.lastMessage || 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          
          <div className='chat-layout__chat'>
            {firebaseError ? (
              <div className='d-flex align-items-center justify-content-center h-100'>
                <div className='text-center p-4' style={{ maxWidth: '650px' }}>
                  <i className='bi bi-shield-exclamation text-danger' style={{ fontSize: '64px' }}></i>
                  <h4 className='mt-3'>Firestore Permissions Error</h4>
                  <p className='text-muted'>Security rules are blocking access to the database.</p>
                  <div className='alert alert-danger mt-3 text-start'>
                    <strong>🔧 Quick Fix (2 minutes):</strong>
                    <ol className='mb-0 mt-2' style={{ fontSize: '14px' }}>
                      <li>Go to <a href='https://console.firebase.google.com/project/connecta24-b27c0/firestore/rules' target='_blank' rel='noopener noreferrer'><strong>Firestore Rules</strong></a></li>
                      <li>Replace all rules with: <code>allow read, write: if true;</code></li>
                      <li>Click <strong>"Publish"</strong> button</li>
                      <li>Wait 30 seconds</li>
                      <li>Click "Refresh Page" button below</li>
                    </ol>
                  </div>
                  <div className='alert alert-info mt-3 text-start'>
                    <strong>Complete Rules Code:</strong>
                    <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', borderRadius: '5px', textAlign: 'left' }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                    </pre>
                    <small>
                      <strong>Note:</strong> This allows all access for development. 
                      See <code>FIX_PERMISSIONS_NOW.md</code> for production rules.
                    </small>
                  </div>
                  <button 
                    className='btn btn-primary mt-3'
                    onClick={() => window.location.reload()}
                  >
                    🔄 Refresh Page
                  </button>
                </div>
              </div>
            ) : loading ? (
              <div className='d-flex align-items-center justify-content-center h-100'>
                <div className='text-center'>
                  <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                  <p className='mt-3'>Loading conversations...</p>
                </div>
              </div>
            ) : selectedConversation ? (
              <>
                <div className='userChat-detail-head'>
                  <div className='d-flex justify-content-between align-items-center gap-2'>
                    {isMobile && (
                      <button
                        className='theme-menu-icon'
                        onClick={() => setSidebarOpen(true)}
                      >
                        <LuMenu />
                      </button>
                    )}
                    <div className='userChat-detail-headUser'>
                      <div className='userChat-detail-headUser-img'>
                        {selectedOtherUser.avatar ? (
                          <img src={selectedOtherUser.avatar} alt={selectedOtherUser.name} />
                        ) : (
                          <img src={chatusericon1} alt={selectedOtherUser.name} />
                        )}
                      </div>
                      <p>{selectedOtherUser.name || 'Unknown User'}</p>
                    </div>
                  </div>
                  {isTablet && (
                    <button
                      className='theme-menu-icon'
                      onClick={() => setActiveSection('job')}
                    >
                      <LuMenu />
                    </button>
                  )}
                </div>
                
                <div className='userChat-detail-content'>
                  {messages.length === 0 ? (
                    <div className='text-center py-5 text-muted'>
                      <i className='bi bi-chat-text' style={{ fontSize: '48px', color: '#dedede' }}></i>
                      <p className='mt-3'>No messages yet. Start the conversation!</p>
                      {location.state?.userId && (
                        <small>Say hello to {selectedOtherUser.name}!</small>
                      )}
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isOwn = msg.senderId === user.id.toString();
                      
                      return (
                        <div
                          key={msg.id}
                          className={isOwn ? 'userChat-detail-content-right' : 'userChat-detail-content-left'}
                        >
                          <div className={`message ${isOwn ? 'right' : 'left'}`}>
                            {!isOwn && (
                              <div className='userChat-detail-headUser-img'>
                                {selectedOtherUser.avatar ? (
                                  <img src={selectedOtherUser.avatar} alt={selectedOtherUser.name} />
                                ) : (
                                  <img src={chatusericon1} alt={selectedOtherUser.name} />
                                )}
                              </div>
                            )}
                            <div className={isOwn ? 'message-rightDiv' : ''}>
                              <p>{msg.senderName}, {formatMessageTime(msg.timestamp)}</p>
                              
                              {msg.type === 'text' && (
                                <div className='bubble'>{msg.message}</div>
                              )}
                              
                              {msg.type === 'image' && (
                                <div className='bubble'>
                                  <img 
                                    src={msg.fileUrl} 
                                    alt='Shared' 
                                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                                  />
                                  {msg.message && <p className='mt-2'>{msg.message}</p>}
                                </div>
                              )}
                              
                              {msg.type === 'file' && (
                                <div className='bubble'>
                                  <a href={msg.fileUrl} target='_blank' rel='noopener noreferrer'>
                                    📎 {msg.message}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className='chat-layout__chat-inputBar'>
                  <form onSubmit={handleSendMessage}>
                    <div className='chat-input-form'>
                      <div className='chat-input-form-inputFields'>
                        <input
                          type='text'
                          className='chat-input'
                          placeholder={
                            location.state?.userId && !firebaseSynced
                              ? 'Connecting to chat...'
                              : file
                              ? `File: ${file.name}`
                              : 'Type your message...'
                          }
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          disabled={sending || (location.state?.userId && !firebaseSynced)}
                        />
                        <label className='chat-file-upload'>
                          <input
                            type='file'
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept='image/*,.pdf,.doc,.docx,.txt'
                            disabled={sending || (location.state?.userId && !firebaseSynced)}
                          />
                          <span role='img' aria-label='Attach file'>
                            <img src={attachIcon} alt='' />
                          </span>
                        </label>
                      </div>
                      <button 
                        type='submit' 
                        className='chat-send-btn' 
                        disabled={sending || (!message.trim() && !file) || (location.state?.userId && !firebaseSynced)}
                      >
                        {sending ? '...' : <img src={sendIcon} alt='Send' />}
                      </button>
                    </div>
                    {location.state?.userId && !firebaseSynced && (
                      <div className='text-center mt-2'>
                        <small className='text-muted'>
                          <span className='spinner-border spinner-border-sm me-2' role='status'></span>
                          Connecting to chat server...
                        </small>
                      </div>
                    )}
                  </form>
                </div>
              </>
            ) : (
              <div className='d-flex align-items-center justify-content-center h-100'>
                <div className='text-center text-muted'>
                  <i className='bi bi-chat-dots' style={{ fontSize: '64px' }}></i>
                  <h4 className='mt-3'>Select a conversation</h4>
                  <p>Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
          
          <div
            className={`chat-layout__job ${
              isTablet
                ? activeSection === 'job'
                  ? 'mobile-slide-in'
                  : 'hidden'
                : ''
            }`}
          >
            <div className='job-layout__header'>
              {isTablet && (
                <button
                  className='chat-menu-icon'
                  onClick={() => setActiveSection('chat')}
                >
                  <IoIosClose />
                </button>
              )}
            </div>
            <div className='chat-layout__body'>
              <div className='chatJobBox'>
                <h4>Job Details</h4>
                {selectedConversation?.jobDetails || location.state?.jobDetails ? (
                  <>
                    <h5>{(selectedConversation?.jobDetails || location.state?.jobDetails)?.title || 'Job Title'}</h5>
                    <p className='chatJobBox-desc'>
                      {(selectedConversation?.jobDetails || location.state?.jobDetails)?.description || 'Job description will be displayed here.'}
                    </p>
                    {(selectedConversation?.jobDetails || location.state?.jobDetails)?.budget && (
                      <p><strong>Budget:</strong> ${(selectedConversation?.jobDetails || location.state?.jobDetails).budget}</p>
                    )}
                    {(selectedConversation?.jobDetails || location.state?.jobDetails)?.location && (
                      <p><strong>Location:</strong> {(selectedConversation?.jobDetails || location.state?.jobDetails).location}</p>
                    )}
                    {(selectedConversation?.jobDetails || location.state?.jobDetails)?.category && (
                      <p><strong>Category:</strong> {(selectedConversation?.jobDetails || location.state?.jobDetails).category}</p>
                    )}
                  </>
                ) : (
                  <p className='chatJobBox-desc'>
                    Job details will be displayed here when you start a chat from a job posting.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatLayout;
