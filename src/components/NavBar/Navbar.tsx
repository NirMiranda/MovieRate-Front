import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import WhiteLogo from "./LogoFiles/svg/White logo.svg"
import Login from "../Login/Login"
import Register from "../Register/Register"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircle';



function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav" style={{ backgroundColor: '#222222' }}>
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
                <NavLink className="nav-link" to="/About">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Profile">Profile</NavLink>

              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Movies">Explore</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Upcoming">Upcoming</NavLink>
              </li>
              <li className="nav-item">
              <AccountCircleOutlinedIcon/>
              </li>
              <li className="nav-item">
              <AccountCircleIcon />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ flex: "1" }}>
        <Outlet />
      </div>
    </div>
  );
}
export default Navbar;
