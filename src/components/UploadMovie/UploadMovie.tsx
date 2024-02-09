// UploadMovieModal.tsx

import React, { useState } from 'react';
import Modal from 'react-modal';
import './UploadMovie.css';
import axios from 'axios';
import { Button, TextField, Box, Slider } from '@mui/material';


interface UploadMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: string;
}

const UploadMovieModal: React.FC<UploadMovieModalProps> = ({ isOpen, onClose }) => {
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

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
            const uploadResponse = await axios.post<{ url: string }>('https://193.106.55.175/file', formData);
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

        if (!movieData.actors) {
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

    const handleSave = async () => {
        const isValid = validateFields();

        if (isValid) {
            // Split actors string into an array
            const actorsArray = movieData.actors.split(',').map(actor => actor.trim());

            // Prepare the data to be sent to the backend
            const movieDataToSend = {
                ...movieData,
                actors: actorsArray,
            };

            try {
                // Make an HTTP request to save the movie in the backend
                const response = await axios.post('https://193.106.55.175/movie/postMovie', movieDataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Handle the response as needed (e.g., log, display a success message)

                // Close the modal after successfully saving the movie
                onClose();
                window.location.reload();
            } catch (error) {
                console.error('Error saving movie:', error);
                // Handle error (e.g., show an error message to the user)
            }
        }
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className={"modal-content"}>
            <div className="modal-header" style={{color:'black'}}>Add Movie</div>
            <div className="modal-body">
                <label>Movie Name: <input type="text" name="movieName" value={movieData.movieName} onChange={handleChange} /></label>
                <label>Year: <input type="number" name="year" value={movieData.year} onChange={handleChange} /></label>
                <label>Director: <input type="text" name="director" value={movieData.director} onChange={handleChange} /></label>
                <label>Actors: <input type="text" name="actors" value={movieData.actors} onChange={handleChange} placeholder="Enter actors separated by commas" /></label>
                <label>Genre: <input type="text" name="genre" value={movieData.genre} onChange={handleChange} /></label>
                <label>Movie poster: <input type="file" name="image" onChange={handleFileChange} /></label>
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
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        </Modal>
    );
};

export default UploadMovieModal;
