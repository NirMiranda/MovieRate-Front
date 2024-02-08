import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button} from '@mui/material';


interface UpdateMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: string;
    onSuccess: () => void;
  }
  
  const UpdateMovieModal: React.FC<UpdateMovieModalProps> = ({ isOpen, onClose, movieId, onSuccess }) => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const storedUser = localStorage.getItem('user');
    const userId = storedUser ? JSON.parse(storedUser)._id : '';
    const [movieData, setMovieData] = useState({
        movieName: '',
        year: 2024,
        director: '',
        actors: '',
        genre: '',
        image: '',
        description: '',
        trailer: '',
        uploadedBy: userId,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieToUpdate = await axios.get(`https://10.10.248.175/movie/getMovieById/${movieId}`);
                const storedUser = localStorage.getItem('user');
                const userId = storedUser ? JSON.parse(storedUser)._id : '';

                setMovieData({
                    movieName: movieToUpdate.data.movieName,
                    year: movieToUpdate.data.year,
                    director: movieToUpdate.data.director,
                    actors: movieToUpdate.data.actors,
                    genre: movieToUpdate.data.genre,
                    image: movieToUpdate.data.image,
                    description: movieToUpdate.data.description,
                    trailer: movieToUpdate.data.trailer,
                    uploadedBy: userId,
                });
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen, movieId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
    
          try {
            const uploadResponse = await axios.post<{ url: string }>('https://10.10.248.175/file', formData);
            setMovieData((prevData) => ({
              ...prevData,
              image: uploadResponse.data.url,
            }));
          } catch (uploadError) {
            console.error('File upload failed:', uploadError);
          }
        }
      };

      const validateFields = () => {
        let isValid = true;
    
        const errors: string[] = [];
    
        if (!movieData.movieName) {
            errors.push('Movie Name is required');
        }
    
        if (movieData.year < 1980 || movieData.year > 2024) {
            errors.push('Year must be between 1980 and 2024');
        }
    
        if (!movieData.director) {
            errors.push('Director is required');
        }
    
        if (!movieData.actors ) {
            errors.push('Actors is required');
        }
    
        if (!movieData.genre) {
            errors.push('Genre is required');
        }
    
        if (!movieData.image) {
            errors.push('Image is required');
        }
    
        if (errors.length > 0) {
            // Display error messages using alert
            alert(errors.join('\n'));
            isValid = false;
        }
    
        return isValid;
    };

    const handleUpdate = async () => {
      const isValid = validateFields();
  
      if (isValid) {
        let actorsArray;
        if (Array.isArray(movieData.actors)) {
            actorsArray = movieData.actors.map(actor => actor.trim());
          } else if (typeof movieData.actors === 'string') {
            actorsArray = movieData.actors.split(',').map(actor => actor.trim());
          } else {
            console.error('Invalid actors format');  // Handle the case where actors is neither an array nor a string
            return;
          }
        const movieDataToUpdate = {
            ...movieData,
            actors: actorsArray,
            _id: movieId,  // Include movie ID in the request data
          };
        try {
          // Make an HTTP request to update the movie in the backend
          await axios.put('https://10.10.248.175/movie/updateMovie', movieDataToUpdate, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          // Handle the response as needed (e.g., log, display a success message)
  
          // Close the modal after successfully updating the movie
          onClose();
          onSuccess();
        } catch (error) {
          console.error('Error updating movie:', error);
          // Handle error (e.g., show an error message to the user)
        }
      }
    };
  
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className={"modal-content"}>
            <div className="modal-header" style={{color:'black'}}>Update Movie</div>
            <div className="modal-body">
                <label>Movie Name: <input type="text" name="movieName" value={movieData.movieName} onChange={handleChange} /></label>
                <label>Year: <input type="number" name="year" value={movieData.year} onChange={handleChange} /></label>
                <label>Director: <input type="text" name="director" value={movieData.director} onChange={handleChange} /></label>
                <label>Actors: <input type="text" name="actors" value={movieData.actors} onChange={handleChange} placeholder="Enter actors separated by commas" /></label>
                <label>Genre: <input type="text" name="genre" value={movieData.genre} onChange={handleChange} /></label>
                <label>Movie poster:         <input type="file" name="image" onChange={handleFileChange} /></label>
                <label>Description: <textarea name="description" value={movieData.description} onChange={handleChange} /></label>
                <label>Trailer URL: <input type="text" name="trailer" value={movieData.trailer} onChange={handleChange} /></label>
            </div>
            <div className="modal-buttons">
                {errorMessages.length > 0 && (
                    <div className="error-messages">
                        {errorMessages.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <Button onClick={handleUpdate}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        </Modal>
    );
  };
  
  export default UpdateMovieModal;