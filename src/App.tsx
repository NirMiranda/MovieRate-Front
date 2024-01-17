// src/App.tsx
import Navbar from './components/Register/NavBar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Movies from "./pages/MoviesPage/MoviesPage"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import About from './pages/AboutPage/AboutPage';
import Services from './pages/ServicesPage/ServicesPage';
import MoviePage from './pages/MoviePage/MoviePage';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navbar />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/moviePage/:id' element={<MoviePage />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />
      </Route>
    </>
  ))

function App() {
  return (
    <div style={{ flex: 1, backgroundColor: "rgb(25,25,25)" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
