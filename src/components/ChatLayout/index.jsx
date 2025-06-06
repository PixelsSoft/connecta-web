import React, { useState, useEffect } from 'react';
import './index.css';
import { BiSearch } from 'react-icons/bi';

import chatheadicon from '../../assets/images/chat-head-icon.png';

import chatusericon1 from '../../assets/images/chat-user-icon1.png';
import chatusericon2 from '../../assets/images/chat-user-icon2.png';
import chatusericon3 from '../../assets/images/chat-user-icon3.png';
import chatusericon4 from '../../assets/images/chat-user-icon4.png';
import chatusericon5 from '../../assets/images/chat-user-icon5.png';

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
];

const ChatLayout = () => {
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

  return (
    <section className='chatSection d-flex flex-column'>
      <div className='container d-flex flex-column flex-grow-1'>
        <div className='chat-layout'>
          <div
            className={`chat-layout__sidebar ${sidebarOpen ? 'open' : ''} ${
              !isMobile ? 'visible' : ''
            }`}
          >
            <div className='chat-layout__header'>
              <div>
                <img
                  src={chatheadicon}
                  className='chat-layout__header-icon'
                  alt=''
                />
                {/* <h5>Chat List</h5> */}
                {isMobile && (
                  <button onClick={() => setSidebarOpen(false)}>Close</button>
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
            <div>
              <div className='userChat-detail-head'>
                <div className=''>
                  {isMobile && (
                    <button onClick={() => setSidebarOpen(true)}>☰</button>
                  )}
                  <div className='userChat-detail-headUser'>
                    <div className='userChat-detail-headUser-img'>
                      <img src={chatusericon1} alt='' />
                    </div>
                    <p>Away</p>
                  </div>
                  {isTablet && (
                    <button onClick={() => setActiveSection('job')}>
                      Details
                    </button>
                  )}
                </div>
              </div>
              <div className='userChat-detail-content'>
                <div className='userChat-detail-content-left'>
                  <div class='message left'>
                    <div className='userChat-detail-headUser-img'>
                      <img src={chatusericon3} alt='' />
                    </div>
                    <div>
                      <p>Andrew, 2 hours ago</p>
                      <div class='bubble'>
                        If I don't like something, I’ll stay away from it.
                      </div>
                    </div>
                  </div>
                </div>

                <div className='userChat-detail-content-right'>
                  <div class='message right'>
                    <div className='message-rightDiv'>
                      <p>2 hours ago</p>
                      <div class='bubble'>
                        If I don't like something, I’ll stay away from it.
                      </div>
                    </div>
                  </div>
                </div>

                <div className='userChat-detail-content-left'>
                  <div class='message left'>
                    <div className='userChat-detail-headUser-img'>
                      <img src={chatusericon3} alt='' />
                    </div>
                    <div>
                      <p>Andrew, 2 hours ago</p>
                      <div class='bubble'>
                        I want more detailed information.
                      </div>
                    </div>
                  </div>
                </div>

                <div className='userChat-detail-content-right'>
                  <div class='message right'>
                    <div className='message-rightDiv'>
                      <p>2 hours ago</p>
                      <div class='bubble'>
                        If I don't like something, I’ll stay away from it.
                      </div>
                      <div class='bubble'>
                        They got there early, and they got really good seats.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='chat-layout__chat-inputBar'></div>
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
                <button onClick={() => setActiveSection('chat')}>Back</button>
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
