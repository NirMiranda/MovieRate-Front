// src/App.tsx
import Navbar from './components/NavBar/Navbar';
import SiteFooter from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import Movies from "./pages/MoviesPage/MoviesPage";
import About from './pages/AboutPage/AboutPage';
import Upcoming from './pages/UpcomingPage/UpcomingPage';
import MoviePage from './pages/MoviePage/MoviePage';
import ProfilePage from './pages/ProfilePage/Profile';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Socket from './components/socket/socket';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/moviePage/:id' element={<MoviePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/Upcoming' element={<Upcoming />} />
          </Routes>
        </div>
        <Socket />
        <SiteFooter />
      </div>
    </Router>
  );
}

export default App;
