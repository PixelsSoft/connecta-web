import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import arrowIcon from '../../../assets/images/arrow-icon.png';

const Header = (props) => {
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
              Post A job
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/login'
              className='header__login headerLink'
            >
              <div className='header__btnWith-icon'>
                <span>Log In</span>
                <img src={arrowIcon} alt='Arrow Icon' />
              </div>
            </Nav.Link>
            <Nav.Link
              as={Link}
              className='header__signUp headerLink'
              to='/sign-up'
            >
              Sign up as a Professional
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
