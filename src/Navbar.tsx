import { Link } from 'react-router-dom';



function Navbar() {
  return (
    <>
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
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./Movies.tsx">Explore</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  );
}


export default Navbar;
