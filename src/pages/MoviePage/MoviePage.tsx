// src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Box, Button } from '@mui/material';
import MovieLogo from '../../components/movieLogo/MovieLogo';
import { movie } from '../MoviesPage/MoviesPage';
import YouTube from 'react-youtube';
import './MoviePage.css';
import OtherInfo from '../../components/otherInfo/otherInfo';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import AddReviewModal from '../../components/addReviewModal/addReviewModal';





function MoviePage() {
  const [isAddReviewModalOpen, setAddReviewModalOpen] = useState<boolean>(false);
  const [movieItem, setMovie] = useState<movie | undefined>(undefined);

  const movieId = useParams().id;
  const apiUrl = `https://10.10.248.175/movie/getMovieById/${movieId}`;
  const handleAddReviewClick = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      setAddReviewModalOpen(true);
    } else {
      // Display a message to log in
      alert('Please log in to add a review');
      // Alternatively, you can redirect to the login page or show a login modal
    }
  };


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

  const refetchMovie = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMovie(response.data);
    } catch (error) {
      console.error("Error refetching movie:", error);
    }
  };

  useEffect(() => {

    fetchMovie();
  }, []);
  return (

    <div className="moviePage">
      <div className='movieDetails'>
        <Box marginTop="4rem">
          <div className='uploader'>
        <h1 className='movieTitle' style={{ textAlign: 'center',marginBottom:'15px' }}>
            Uploaded By: {movieItem?.uploadedBy && movieItem?.uploadedBy.email}
          </h1>
          <div className='uploaderPhoto'>
          {movieItem?.uploadedBy && movieItem?.uploadedBy.photo && (
              <img
                src={movieItem.uploadedBy.photo}
                alt={`Profile of ${movieItem.uploadedBy.email}`}
                style={{ width: '100px', height: '100px', borderRadius: '50%',marginLeft:'10px' }}
              />
            )}
            </div>
          </div>

          <h1 className='movieTitle' style={{ textAlign: 'center' }}>{movieItem?.movieName}</h1>
          <div className="movieMedia">
            <div className="movieLogo">
              <MovieLogo data={movieItem as movie} />
            </div>
            <YouTube videoId={movieItem?.trailer} />
          </div>
          <OtherInfo
            genre={movieItem?.genre}
            description={movieItem?.description}
            year={movieItem?.year}
            director={movieItem?.director}
            actors={movieItem?.actors}
          />
        </Box>
      </div>
      <div className='reviews' style={{ justifyContent: 'center' }}>
        <h1 className='reviewsTitle' style={{ textAlign: 'center', marginTop: '20px' }}>Users Thoughts</h1>
        <MovieReviews reviews={movieItem?.reviews ?? []} />
        <div className='addReview'>
        {localStorage.getItem('refreshToken') ? (
          <Button variant="contained" onClick={handleAddReviewClick}>
            Add your review
          </Button>
        ) : (
          <p style={{color:'red',fontSize:'24px'}}>Please log in to add a review</p>
        )}
      </div>
      </div>
      <AddReviewModal
        open={isAddReviewModalOpen}
        handleClose={() => setAddReviewModalOpen(false)}
        movieItem={movieItem}
        refetchMovie={refetchMovie}
      />
    </div>
  );
}



export default MoviePage;
