import { Link, NavLink } from 'react-router-dom';
import RecruiterLayout from '../index';
import COLXXL10 from '../../../COLXXL10';
import { useTranslation } from 'react-i18next';

const RecruiterAccountSettingLayout = (props) => {
  const { t } = useTranslation('common');
  
  const sidebarLinks = [
    {
      path: '/recruiter/account-setting/contact-info',
      label: t('recruiter.contactInformation'),
    },
    {
      path: '/recruiter/account-setting/manage-account',
      label: t('recruiter.manageAccount'),
    },
    { path: '/recruiter/account-setting/notifications', label: t('recruiter.notifications') },
    { path: '/recruiter/account-setting/previous-jobs', label: t('recruiter.previousJobs') },
    {
      path: '/recruiter/account-setting/change-password',
      label: t('recruiter.changePassword'),
    },
  ];
  return (
    <RecruiterLayout>
      <section className='accountSettings-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <COLXXL10>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='sec-head'>
                    <h2>{t('recruiter.accountSetting')}</h2>
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
