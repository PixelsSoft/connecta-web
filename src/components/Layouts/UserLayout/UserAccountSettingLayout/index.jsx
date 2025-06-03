import { Link, NavLink } from 'react-router-dom';
import RecruiterLayout from '../index';
import COLXXL10 from '../../../COLXXL10';

const sidebarLinks = [
  {
    path: '/user/account-setting/profile-details',
    label: 'Profile Details',
  },
  {
    path: '/user/account-setting/company-details',
    label: 'Company Details',
  },
  { path: '/user/account-setting/manage-account', label: 'Manage account' },
  { path: '/user/account-setting/notifications', label: 'Notifications' },
  {
    path: '/user/account-setting/applied-jobs',
    label: 'Applied Jobs',
  },
  {
    path: '/user/account-setting/payment-method',
    label: 'Payment Method',
  },
];

const UserAccountSettingLayout = (props) => {
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

export default UserAccountSettingLayout;
