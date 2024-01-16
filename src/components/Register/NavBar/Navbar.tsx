import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="#page-top">MOVIES</a>
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
                <NavLink className="nav-link" to="/Services">Services</NavLink>

              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Movies">Explore</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
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
