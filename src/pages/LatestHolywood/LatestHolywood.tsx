import { useState, useEffect } from 'react';
import axios from 'axios';
import './LatestHolywood.css';

function Latest() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const apiKey = 'eb15da7eae1cb245d85ee2a253f29d43';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
        const upcomingMoviesData = response.data.results;

        // Sort upcoming movies by release date
        upcomingMoviesData.sort((b, a) => new Date(a.release_date) - new Date(b.release_date));

        // Group movies by release month and year
        const groupedMovies = upcomingMoviesData.reduce((acc, movie) => {
          const releaseDate = new Date(movie.release_date);
          const key = `${releaseDate.toLocaleString('default', { month: 'long' })}, ${releaseDate.getFullYear()}`;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(movie);

          return acc;
        }, {});

        setUpcomingMovies(groupedMovies);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="upcoming-container">
      <h1 className="upcoming-heading">Recently released movies</h1>
      {Object.keys(upcomingMovies).map((group) => (
        <div className='groupDiv' key={group}>
          <h2 className="group-heading"><strong>{group}</strong></h2>

          {upcomingMovies[group].map((movie) => (
            <div className="eachMovie" key={movie.id}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              )}
              <div className="movie-details">
                <h3 className="movie-title"><strong>{movie.title}</strong></h3>
                <h5>Summary :</h5>
                <p className="movie-summary"> {movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Latest;
