import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// import postedjobicon from '../../../assets/images/posted-job-icon.png';
import postedjobicon from '../../../../assets/images/posted-job-icon.png';
import chaticon from '../../../../assets/images/chat-icon.png';
import accountsettingicon from '../../../../assets/images/account-setting-icon.png';
import callicon from '../../../../assets/images/call-icon.png';
import COLXXL10 from '../../../COLXXL10';

const headerData = [
  {
    icon: postedjobicon,
    name: 'Posted Jobs',
    link: '',
  },
  {
    icon: chaticon,
    name: 'Chat',
    link: '',
  },
  {
    icon: accountsettingicon,
    name: 'Account Settings',
    link: '/recruiter/account-setting/contact-info',
  },
  {
    icon: callicon,
    name: 'Contact Center',
    Link: '/recruiter/contact-center',
  },
];

const RecruiterHeader = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);
  return (
    <div className='recruiterHeader'>
      <div className='container'>
        <div className='row justify-content-center'>
          <COLXXL10>
            <div className='row'>
              <div className='col-md-12'>
                <div className='recruiterHeader__tabs'>
                  {/* {headerData.map((item, index) => (
                    <Link to={item.link} key={index}>
                      <div className='btn__witchIcon'>
                        <img src={item.icon} alt='' />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))} */}
                  <Link
                    to='/recruiter/posted-jobs'
                    className={`${
                      isActive('/recruiter/posted-jobs') ? 'active' : ''
                    }`}
                  >
                    <div className={`btn__witchIcon`}>
                      <img src={postedjobicon} alt='' />
                      <span>Posted Jobs</span>
                    </div>
                  </Link>

                  <Link
                    to='/chat'
                    className={`${isActive('/chat') ? 'active' : ''}`}
                  >
                    <div className={`btn__witchIcon `}>
                      <img src={chaticon} alt='' />
                      <span>Chat</span>
                    </div>
                  </Link>

                  <Link
                    to='/recruiter/account-setting/contact-info'
                    className={`${
                      isActive('/recruiter/account-setting') ? 'active' : ''
                    }`}
                  >
                    <div className={`btn__witchIcon`}>
                      <img src={accountsettingicon} alt='' />
                      <span>Account Settings</span>
                    </div>
                  </Link>

                  <Link
                    to='/recruiter/contact-center'
                    className={`${
                      isActive('/recruiter/contact-center') ? 'active' : ''
                    }`}
                  >
                    <div className={`btn__witchIcon `}>
                      <img src={callicon} alt='' />
                      <span>Contact Center</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </COLXXL10>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHeader;
