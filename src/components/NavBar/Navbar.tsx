import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
  }, []);

  

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav" style={{backgroundColor: '#1A1A1A'}}>
        <div className="container">
          <NavLink className="nav-link" to="/">
            <img src={WhiteLogo} alt="Logo" style={{ maxHeight: '50px', marginRight: '10px' }} />
          </NavLink>
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
                <NavLink className="nav-link" to="/About">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Movies">
                  Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Upcoming">
                  Upcoming
                </NavLink>
              </li>
              <div className='account-container'>
            <li className="nav-item account-icon">
              <div className="account-box">
              {user ? (
              // User is logged in
              <div className='userBtns'>
                <NavLink type='button' className="userProfile" to="/Profile">
                  User Profile
                </NavLink>
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
      <div style={{ flex: '1' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
