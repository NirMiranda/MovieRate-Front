// src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';
import MovieLogo from '../../components/movieLogo/MovieLogo';
import { movie } from '../MoviesPage/MoviesPage';
import YouTube from 'react-youtube';
import './MoviePage.css';



function MoviePage() {
  
  const [movieItem, setMovie] = useState<movie | undefined>(undefined);
  const movieId = useParams().id;
  const apiUrl = `http://localhost:3003/movie/getMovieById/${movieId}`;
  

  const fetchMovie = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMovie(()=>{
          return response.data;
      });
    } catch (error) {
      console.log(movieId);
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
    
    fetchMovie();
  }, []);
    return (
    <div className="moviePage">
      <div className='movieDetails'>
      <Box marginTop="4rem">
        <div className="movieMedia">
        <div className="movieLogo">
        <MovieLogo data={movieItem as movie} />
        </div>
        <YouTube videoId={movieItem?.trailer} />
        </div>
        <h1>{movieItem?.movieName}</h1>
        <p>{movieItem?.description}</p>
        <p>{movieItem?.year}</p>
        <p>{movieItem?.genre}</p>
        <p>{movieItem?.director}</p>
        <p>{movieItem?.actors}</p>
        <p>{movieItem?.ratingImdb}</p>
      </Box>
      </div>
      <div className='reviews'> 

      </div>
    </div>
    );
}



export default MoviePage;
