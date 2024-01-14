// src/App.tsx
import Navbar from './Navbar';

function Movies() {
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
        <Navbar/>
        <header
          className="text-center text-white d-flex masthead"
          style={{
            margin: 0,
            padding: 0,
            backgroundSize: 'cover',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        </header>
        <script src="./assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="./assets/js/baguetteBox.min.js"></script>
        <script src="./assets/js/creative.js"></script>
      </body>
    </html>
  );
}

export default Movies;
