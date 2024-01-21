// UpcomingMovies.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Upcoming.css'

function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const omdbApiKey = '5f251ef1';
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=upcoming`);
        const upcomingMoviesData = response.data.Search;
        setUpcomingMovies(upcomingMoviesData);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <h2>Upcoming Movies</h2>
      <ul>
        {upcomingMovies.map((movie) => (
          <>
            <li>{movie.Title}</li>

          </>
        ))}
      </ul>
    </div>
  );
}

export default Upcoming;
