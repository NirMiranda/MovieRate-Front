import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import WhiteLogo from './LogoFiles/svg/White logo.svg';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';
import Logout from '../Logout/Logout';


function NavigationBar() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for changes to the user variable in LocalStorage
    const storageEventListener = (e: StorageEvent) => {
      if (e.key === 'user') {
        setUser(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', storageEventListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, []);

  return (
    <><nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="container">
        <Link className="nav-link" to="/">
          {/* add me a div  */}

          <img src={WhiteLogo} alt="Logo" style={{ maxHeight: '50px', marginRight: '10px' }} />
        </Link>
        <button
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          className="navbar-toggler navbar-toggler-right"
          type="button"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-align-justify"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Movies">
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Upcoming">
                Upcoming
              </Link>
            </li>
            <div className='account-container'>
              <li className="nav-item account-icon">
                <div className="account-box">
                  {user ? (
                    // User is logged in
                    <div className='userBtns'>
                      <Link type='button' className="userProfile" to="/Profile">
                        User Profile
                      </Link>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Logout />
                      </div>
                    </div>
                  ) : (
                    // User is not logged in
                    <div className='userBtns'>
                      <Login />
                      <Register />
                    </div>
                  )}
                </div>
                <AccountCircleIcon className="account-icon" />
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav><Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <img src={WhiteLogo} alt="Logo" style={{ maxHeight: '50px', marginRight: '10px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive" style={{ justifyContent: 'end', marginRight: '60px' }}>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/About" className='white-link'>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/Movies" className='white-link'>
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/Latest" className="white-link">
              Holywood
            </Nav.Link>
            <div className="account-container">
              <Nav.Item className="nav-item account-icon">
                <div className="account-box">
                  {user ? (
                    <div className="userBtns">
                      <Link type="button" className="userProfile" to="/Profile">
                        User Profile
                      </Link>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Logout />
                      </div>
                    </div>
                  ) : (
                    <div className="userBtns">
                      <Login />
                      <Register />
                    </div>
                  )}
                </div>
                <AccountCircleIcon className="account-icon" style={{ marginBottom: '10px' }} />
              </Nav.Item>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar></>
  );
}

export default NavigationBar;
