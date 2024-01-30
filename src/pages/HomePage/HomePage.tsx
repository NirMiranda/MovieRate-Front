import React, { useEffect, useState } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/baguetteBox.min.css';
import './assets/fonts/font-awesome.min.css';
import { Button } from 'react-bootstrap';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import Navbar from '../../components/NavBar/Navbar';
import UploadMovieModal from '../../components/UploadMovie/UploadMovie';

import DesignerImage from './assets/img/Designer.png';

function HomePage() {
  const [hideButtons, setHideButtons] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if refresh token is present in local storage
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      // Refresh token is present, hide the login and register buttons
      setHideButtons(true);
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserName(user.name);
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  return (
    <html data-bs-theme="light" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <title>Home - Brand</title>
        <link rel="stylesheet" />
      </head>
      <body
        className="fs-4 align-items-center align-content-center align-self-center mx-auto"
        id="page-top"
        data-bs-spy="scroll"
        data-bs-target="#mainNav"
        data-bs-offset="57"
      >
        <Navbar />

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
              {!hideButtons && (
                <>
                  <Login />
                  <Register />
                </>
              )}
              {hideButtons && (
                <div>
                  <h1>
                    Welcome <span style={{ color: 'rgb(231, 7, 7)' }}>{userName}</span>
                  </h1>
                  <Button onClick={handleOpenUploadModal} style={{marginRight:'4px'}}>Upload Movie</Button>
                  <Button href="/movies">Explore movies</Button>
                </div>
              )}
            </div>
          </div>
        </header>
        <script src="./assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="./assets/js/baguetteBox.min.js"></script>
        <script src="./assets/js/creative.js"></script>

        {/* Render the UploadMovieModal component when showUploadModal is true */}
        {showUploadModal && (
          <UploadMovieModal
            isOpen={showUploadModal}
            onClose={handleCloseUploadModal}
          />
        )}
      </body>
    </html>
  );
}

export default HomePage;
