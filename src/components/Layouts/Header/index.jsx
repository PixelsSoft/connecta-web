import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/images/logo.png';
import arrowIcon from '../../../assets/images/arrow-icon.png';

import loggedInIcon from '../../../assets/images/logged-in-icon.png';

import chatIcon from '../../../assets/images/chat-icon-green.png';
import profileSettingIcon from '../../../assets/images/profile-setting-icon.png';
import logoutIcon from '../../../assets/images/logout-icon.png';

const Header = (props) => {
  const { t } = useTranslation('common');
  
  return (
    <Navbar expand='lg' className='main-navbar'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img src={props.logo || logo} alt='My Virtual PI' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='navbar-nav' />

        <Navbar.Collapse id='navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link
              as={Link}
              to='/find-professionals'
              className='header__postJob-icon'
            >
              {t('buttons.postJob')}
            </Nav.Link>

            {/* Logged in user button */}

            <NavDropdown
              title={
                <>
                  <span>Hi John Doe</span>
                  <img src={loggedInIcon} alt='' />
                </>
              }
              id='user-nav-dropdown'
              className='user-dropdown'
            >
              <NavDropdown.Item
                as={Link}
                to='/chat'
                className='loggedInUser-textIcon'
              >
                <img src={chatIcon} alt='' />
                <span>{t('home.chat')}</span>
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to='/user/account-setting/profile-details'
                className='loggedInUser-textIcon'
              >
                <img src={profileSettingIcon} alt='' />
                <span>{t('home.profileSettings')}</span>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item
                as={Link}
                to='/login'
                className='loggedInUser-textIcon'
              >
                <img src={logoutIcon} alt='' />
                <span>{t('home.logout')}</span>
              </NavDropdown.Item>
            </NavDropdown>

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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
