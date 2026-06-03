import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../../store/slices/authSlice';

import logo from '../../../assets/images/logo.png';
import arrowIcon from '../../../assets/images/arrow-icon.png';

import loggedInIcon from '../../../assets/images/logged-in-icon.png';

import chatIcon from '../../../assets/images/chat-icon-green.png';
import profileSettingIcon from '../../../assets/images/profile-setting-icon.png';
import logoutIcon from '../../../assets/images/logout-icon.png';

const Header = (props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate('/');
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.fullName) return user.fullName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Get profile settings link based on role
  const getProfileSettingsLink = () => {
    if (user?.user_type === 'professional') {
      return '/recruiter/account-setting/contact-info';
    }
    return '/user/account-setting/profile-details';
  };

  // Get chat link based on role
  const getChatLink = () => {
    return '/chat';
  };

  const isProfessional = isAuthenticated && user?.user_type === 'professional';

  return (
    <Navbar expand='lg' className='main-navbar'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img src={props.logo || logo} alt='My Virtual PI' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='navbar-nav' />

        <Navbar.Collapse id='navbar-nav'>
          <Nav className='ms-auto'>
            {isProfessional ? (
              <Nav.Link
                as={Link}
                to='/recruiter/posted-jobs'
                className='header__postJob-icon'
              >
                {t('buttons.browseLeads')}
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to='/find-professionals'
                className='header__postJob-icon'
              >
                {t('buttons.postJob')}
              </Nav.Link>
            )}

            {/* Show user dropdown if logged in, otherwise show login/signup buttons */}
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <>
                    <span>Hi {getUserDisplayName()}</span>
                    <img src={loggedInIcon} alt='' />
                  </>
                }
                id='user-nav-dropdown'
                className='user-dropdown'
              >
                <NavDropdown.Item
                  as={Link}
                  to={getChatLink()}
                  className='loggedInUser-textIcon'
                >
                  <img src={chatIcon} alt='' />
                  <span>{t('home.chat')}</span>
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={getProfileSettingsLink()}
                  className='loggedInUser-textIcon'
                >
                  <img src={profileSettingIcon} alt='' />
                  <span>{t('home.profileSettings')}</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className='loggedInUser-textIcon'
                  style={{ cursor: 'pointer' }}
                >
                  <img src={logoutIcon} alt='' />
                  <span>{t('home.logout')}</span>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to='/login'
                  className='header__login headerLink'
                >
                  <div className='header__btnWith-icon'>
                    <span>{t('buttons.login')}</span>
                    <img src={arrowIcon} alt='Arrow Icon' />
                  </div>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className='header__signUp headerLink'
                  to='/sign-up'
                >
                  {t('buttons.signUpProfessional')}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
