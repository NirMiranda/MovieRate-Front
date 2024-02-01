import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import WhiteLogo from './LogoFiles/svg/White logo.svg';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';
import Logout from '../Logout/Logout';


function Navbar() {
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
    
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav" style={{backgroundColor: '#1A1A1A'}}>
      <div className="container">
        <Link className="nav-link" to="/">
          <img src={WhiteLogo} alt="Logo" style={{ maxHeight: '50px', marginRight: '10px' }} />
        </Link>
        <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
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
                      <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
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
    </nav>
  );
}

export default Navbar;
