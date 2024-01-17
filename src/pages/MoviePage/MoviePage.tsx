// src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

interface MovieData {
  movieName: string;
  description: string;
  year: number;
  genre: string;
  director: string;
  actors: string[];
  ratingImdb: number;
  trailer: string;
}

function MoviePage() {

  const [movie, setMovie] = useState<MovieData | null>(null);
  const movieId = useParams().id;
  const apiUrl = `http://localhost:3003/movie/getMovieById/${movieId}`;


  const fetchMovie = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMovie(() => {
        return response.data;
      });
    } catch (error) {
      console.log(movieId);
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => { fetchMovie(); }, []);
  return (
    <div style={{ backgroundColor: 'black' }} >

      <h1>{movie?.movieName}</h1>
      <p>{movie?.description}</p>
      <p>{movie?.year}</p>
      <p>{movie?.genre}</p>
      <p>{movie?.director}</p>
      <p>{movie?.actors}</p>
      <p>{movie?.ratingImdb}</p>
      <p>{movie?.trailer}</p>

    </div>
  );
}



export default MoviePage;
