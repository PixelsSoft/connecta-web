import React, { useState, useEffect } from 'react';
import './index.css';
import { BiSearch } from 'react-icons/bi';

import chatheadicon from '../../assets/images/chat-head-icon.png';
import menuIcon from '../../assets/images/menu-icon.png';
import sendIcon from '../../assets/images/send-icon.png';
import attachIcon from '../../assets/images/attach-icon.png';

import chatusericon1 from '../../assets/images/chat-user-icon1.png';
import chatusericon2 from '../../assets/images/chat-user-icon2.png';
import chatusericon3 from '../../assets/images/chat-user-icon3.png';
import chatusericon4 from '../../assets/images/chat-user-icon4.png';
import chatusericon5 from '../../assets/images/chat-user-icon5.png';
import { IoIosClose } from 'react-icons/io';
import { LuMenu } from 'react-icons/lu';

const chatUsersData = [
  {
    id: 1,
    image: chatusericon1,
    name: 'Michell Flintoff',
    message: 'You: Yesterdy was great...',
    lastOnline: '15 minutes',
  },
  {
    id: 2,
    image: chatusericon2,
    name: 'Bianca Anderson',
    message: 'Nice looking dress you...',
    lastOnline: '30 minutes',
  },
  {
    id: 3,
    image: chatusericon3,
    name: 'Andrew Johnson',
    message: 'Sent a photo',
    lastOnline: '2 hours',
  },
  {
    id: 4,
    image: chatusericon4,
    name: 'Mark Strokes',
    message: 'Lorem ispusm text sud...',
    lastOnline: '5 days',
  },
  {
    id: 5,
    image: chatusericon5,
    name: 'Mark, Stoinus & Rishvi..',
    message: 'Lorem ispusm text ...',
    lastOnline: '5 days',
  },
  {
    id: 6,
    image: chatusericon1,
    name: 'Bianca Anderson',
    message: 'Nice looking dress you...',
    lastOnline: '30 minutes',
  },
  // Add more users as needed

  // {
  //   id: 1,
  //   image: chatusericon1,
  //   name: 'Michell Flintoff',
  //   message: 'You: Yesterdy was great...',
  //   lastOnline: '15 minutes',
  // },
  // {
  //   id: 2,
  //   image: chatusericon2,
  //   name: 'Bianca Anderson',
  //   message: 'Nice looking dress you...',
  //   lastOnline: '30 minutes',
  // },
  // {
  //   id: 3,
  //   image: chatusericon3,
  //   name: 'Andrew Johnson',
  //   message: 'Sent a photo',
  //   lastOnline: '2 hours',
  // },
  // {
  //   id: 4,
  //   image: chatusericon4,
  //   name: 'Mark Strokes',
  //   message: 'Lorem ispusm text sud...',
  //   lastOnline: '5 days',
  // },
  // {
  //   id: 5,
  //   image: chatusericon5,
  //   name: 'Mark, Stoinus & Rishvi..',
  //   message: 'Lorem ispusm text ...',
  //   lastOnline: '5 days',
  // },
  // {
  //   id: 6,
  //   image: chatusericon1,
  //   name: 'Bianca Anderson',
  //   message: 'Nice looking dress you...',
  //   lastOnline: '30 minutes',
  // },

  // {
  //   id: 1,
  //   image: chatusericon1,
  //   name: 'Michell Flintoff',
  //   message: 'You: Yesterdy was great...',
  //   lastOnline: '15 minutes',
  // },
  // {
  //   id: 2,
  //   image: chatusericon2,
  //   name: 'Bianca Anderson',
  //   message: 'Nice looking dress you...',
  //   lastOnline: '30 minutes',
  // },
  // {
  //   id: 3,
  //   image: chatusericon3,
  //   name: 'Andrew Johnson',
  //   message: 'Sent a photo',
  //   lastOnline: '2 hours',
  // },
  // {
  //   id: 4,
  //   image: chatusericon4,
  //   name: 'Mark Strokes',
  //   message: 'Lorem ispusm text sud...',
  //   lastOnline: '5 days',
  // },
  // {
  //   id: 5,
  //   image: chatusericon5,
  //   name: 'Mark, Stoinus & Rishvi..',
  //   message: 'Lorem ispusm text ...',
  //   lastOnline: '5 days',
  // },
  // {
  //   id: 6,
  //   image: chatusericon1,
  //   name: 'Bianca Anderson',
  //   message: 'Nice looking dress you...',
  //   lastOnline: '30 minutes',
  // },

  // {
  //   id: 1,
  //   image: chatusericon1,
  //   name: 'Michell Flintoff',
  //   message: 'You: Yesterdy was great...',
  //   lastOnline: '15 minutes',
  // },
  // {
  //   id: 2,
  //   image: chatusericon2,
  //   name: 'Bianca Anderson',
  //   message: 'Nice looking dress you...',
  //   lastOnline: '30 minutes',
  // },
  // {
  //   id: 3,
  //   image: chatusericon3,
  //   name: 'Andrew Johnson',
  //   message: 'Sent a photo',
  //   lastOnline: '2 hours',
  // },
  // {
  //   id: 4,
  //   image: chatusericon4,
  //   name: 'Mark Strokes',
  //   message: 'Lorem ispusm text sud...',
  //   lastOnline: '5 days',
  // },
  // {
  //   id: 5,
  //   image: chatusericon5,
  //   name: 'Mark, Stoinus & Rishvi..',
  //   message: 'Lorem ispusm text ...',
  //   lastOnline: '5 days',
  // },
  // {
  //   id: 6,
  //   image: chatusericon1,
  //   name: 'Bianca Anderson',
  //   message: 'Nice looking dress you...',
  //   lastOnline: '30 minutes',
  // },
];

const ChatLayout = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const [activeSection, setActiveSection] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      setIsTablet(window.innerWidth <= 1199);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Handle text message
    if (message.trim()) {
      console.log('Text Message:', message);
    }

    // Handle file upload
    if (file) {
      console.log('File uploaded:', file.name);
    }

    // Clear input after submit
    setMessage('');
    setFile(null);
    e.target.reset(); // resets file input visually
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
                {/* <h5>Chat List</h5> */}
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
                  />
                </div>
              </div>
            </div>
            <div className='chat-layout__body'>
              <div className='chat-layout__sidebar-filter'>
                <select
                  aria-label='Default select example'
                  defaultValue='Recent Chats'
                  onChange={(e) => e.target.value}
                >
                  <option value='Recent Chats'>Recent Chats</option>
                  <option value='1'>Chat One</option>
                  <option value='2'>Chat Two</option>
                  <option value='3'>Chat Three</option>
                </select>
              </div>
              <div className='chat-layout__body-users'>
                {chatUsersData.map((item, index) => (
                  <div className='chatUserBox' key={index}>
                    <div className='chatUserBox__profile'>
                      <img src={item.image} alt='' />
                    </div>
                    <div className='chatUserBox__content'>
                      <div className='chatUserBox__content-header'>
                        <h5>{item.name}</h5>
                        <span className='chatUserBox__content-headerTime'>
                          {item.lastOnline}
                        </span>
                      </div>
                      <p>{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='chat-layout__chat'>
            <div className='userChat-detail-head'>
              <div className='d-flex justify-content-between align-items-center gap-2'>
                {isMobile && (
                  <button
                    className='theme-menu-icon'
                    onClick={() => setSidebarOpen(true)}
                  >
                    {/* <img src={menuIcon} alt='' /> */}
                    <LuMenu />
                  </button>
                )}
                <div className='userChat-detail-headUser'>
                  <div className='userChat-detail-headUser-img'>
                    <img src={chatusericon1} alt='' />
                  </div>
                  <p>Away</p>
                </div>
              </div>
              {isTablet && (
                <button
                  className='theme-menu-icon'
                  onClick={() => setActiveSection('job')}
                >
                  {/* <img src={menuIcon} alt='' /> */}
                  <LuMenu />
                </button>
              )}
            </div>
            <div className='userChat-detail-content'>
              <div className='userChat-detail-content-left'>
                <div className='message left'>
                  <div className='userChat-detail-headUser-img'>
                    <img src={chatusericon3} alt='' />
                  </div>
                  <div>
                    <p>Andrew, 2 hours ago</p>
                    <div className='bubble'>
                      If I don't like something, I’ll stay away from it.
                    </div>
                  </div>
                </div>
              </div>
              <div className='userChat-detail-content-right'>
                <div className='message right'>
                  <div className='message-rightDiv'>
                    <p>2 hours ago</p>
                    <div className='bubble'>
                      If I don't like something, I’ll stay away from it.
                    </div>
                  </div>
                </div>
              </div>
              <div className='userChat-detail-content-left'>
                <div className='message left'>
                  <div className='userChat-detail-headUser-img'>
                    <img src={chatusericon3} alt='' />
                  </div>
                  <div>
                    <p>Andrew, 2 hours ago</p>
                    <div className='bubble'>
                      I want more detailed information.
                    </div>
                  </div>
                </div>
              </div>
              <div className='userChat-detail-content-right'>
                <div className='message right'>
                  <div className='message-rightDiv'>
                    <p>2 hours ago</p>
                    <div className='bubble'>
                      If I don't like something, I’ll stay away from it.
                    </div>
                    <div className='bubble'>
                      They got there early, and they got really good seats.
                    </div>
                  </div>
                </div>
              </div>
              <div className='userChat-detail-content-left'>
                <div className='message left'>
                  <div className='userChat-detail-headUser-img'>
                    <img src={chatusericon3} alt='' />
                  </div>
                  <div>
                    <p>Andrew, 2 hours ago</p>
                    <div className='bubble'>
                      I want more detailed information.
                    </div>
                  </div>
                </div>
              </div>
              <div className='userChat-detail-content-right'>
                <div className='message right'>
                  <div className='message-rightDiv'>
                    <p>2 hours ago</p>
                    <div className='bubble'>
                      If I don't like something, I’ll stay away from it.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='chat-layout__chat-inputBar'>
              <form onSubmit={handleSendMessage}>
                <div className='chat-input-form'>
                  <div className='chat-input-form-inputFields'>
                    <input
                      type='text'
                      className='chat-input'
                      placeholder='Type your message...'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <label className='chat-file-upload'>
                      <input
                        type='file'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <span role='img' aria-label='Attach file'>
                        <img src={attachIcon} alt='' />
                      </span>
                    </label>
                  </div>
                  <button type='submit' className='chat-send-btn'>
                    <img src={sendIcon} alt='Send' />
                  </button>
                </div>
              </form>
            </div>
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
                <h4>Bathroom Fitting job</h4>
                <p className='chatJobBox-date'>Posted Date : 02/20/2025</p>
                <h5>Overview</h5>
                <p className='chatJobBox-desc'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore
                </p>
                <button className='customBtn w-100'>See Full Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatLayout;
