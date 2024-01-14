// import { useState } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/baguetteBox.min.css';
import './assets/fonts/font-awesome.min.css';  
import Login from './Login';
import Register from './Register';

import DesignerImage from './assets/img/Designer.png';

function HomePage() {
  return (
    <html data-bs-theme="light" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <title>Home - Brand</title>
        <link rel="stylesheet" href="path/to/your/custom.css" />
      </head>
      <body
        className="fs-4 align-items-center align-content-center align-self-center mx-auto"
        id="page-top"
        data-bs-spy="scroll"
        data-bs-target="#mainNav"
        data-bs-offset="57"
      >
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
                  <a className="nav-link" href="#portfolio">Explore</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <header
          className="text-center text-white d-flex masthead"
          style={{
            margin: 0,
            padding: 0,
            backgroundImage: `url(${DesignerImage})`,
            backgroundSize: 'cover',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase">
                  <strong style={{ fontFamily: 'Merriweather' }}>
                    &nbsp;<span style={{ color: 'rgb(231, 7, 7)' }}>collect</span> and{' '}
                    <span style={{ color: 'rgb(235, 10, 10)' }}>share</span> your Movies.
                  </strong>
                </h1>
                <hr />
              </div>
            </div>
            <div className="col-lg-8 mx-auto">
              <Login/>
              <Register/>
            </div>
          </div>
        </header>
        <script src="./assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="./assets/js/baguetteBox.min.js"></script>
        <script src="./assets/js/creative.js"></script>
      </body>
    </html>
  );
}

export default HomePage;
