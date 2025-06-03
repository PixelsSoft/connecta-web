import { Link, NavLink } from 'react-router-dom';
import RecruiterLayout from '../index';
import COLXXL10 from '../../../COLXXL10';

const sidebarLinks = [
  {
    path: '/recruiter/account-setting/contact-info',
    label: 'Contact information',
  },
  {
    path: '/recruiter/account-setting/manage-account',
    label: 'Manage account',
  },
  { path: '/recruiter/account-setting/notifications', label: 'Notifications' },
  { path: '/recruiter/account-setting/previous-jobs', label: 'Previous Jobs' },
  {
    path: '/recruiter/account-setting/change-password',
    label: 'Change Password',
  },
];

const RecruiterAccountSettingLayout = (props) => {
  return (
    <RecruiterLayout>
      <section className='accountSettings-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <COLXXL10>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='sec-head'>
                    <h2>Account Setting</h2>
                  </div>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-4'>
                  <div className='accountSettings-sideBar me-xl-5 me-lg-4'>
                    {sidebarLinks.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? 'accountSettings-sideBar-item active'
                            : 'accountSettings-sideBar-item'
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className='col-lg-9 col-md-8 col-sm-8'>
                  {props.children}
                </div>
              </div>
            </COLXXL10>
          </div>
        </div>
      </section>
    </RecruiterLayout>
  );
};

export default RecruiterAccountSettingLayout;
