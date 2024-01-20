// src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';
import MovieLogo from '../../components/movieLogo/MovieLogo';
import { movie } from '../MoviesPage/MoviesPage';
import YouTube from 'react-youtube';
import './MoviePage.css';
import OtherInfo from '../../components/otherInfo/otherInfo';
import MovieReviews,{ReviewType} from '../../components/movieReviews/movieReviews';




function MoviePage() {
  
  const [movieItem, setMovie] = useState<movie | undefined>(undefined);
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

  useEffect(() => {
    
    fetchMovie();
  }, []);
    return (

    <div className="moviePage">
      <div className='movieDetails'>
      <Box marginTop="4rem">
        <h1 className='movieTitle' style={{textAlign:'center'}}>{movieItem?.movieName}</h1>
        <div className="movieMedia">
        <div className="movieLogo">
        <MovieLogo data={movieItem as movie} />
        </div>
        <YouTube videoId={movieItem?.trailer}/>
        </div>
        <OtherInfo
            genre={movieItem?.genre}
            description={movieItem?.description}
            year={movieItem?.year}
            director={movieItem?.director}
            actors={movieItem?.actors}
            ratingImdb={movieItem?.ratingImdb}
          />
      </Box>
      </div>
      <div className='reviews' style={{justifyContent:'center'}}> 
         <h1 className='reviewsTitle' style={{textAlign:'center'}}>User Reviews</h1>
          <MovieReviews reviews={movieItem?.reviews ?? []}/>

      </div>
    </div>
    );
}



export default MoviePage;
