// src/App.tsx
import Navbar from './Navbar';
import HomePage from './HomePage';
import Movies from "./Movies"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import About from './About';
import Services from './Services';
import MoviePage from './MoviePage';



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
    <div style={{ flex: 1 }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
