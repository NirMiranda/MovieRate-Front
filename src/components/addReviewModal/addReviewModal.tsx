// src/components/addReviewModal.tsx
import React, { useState } from 'react';
import { Modal, Button, TextField, Box, Slider } from '@mui/material';
import { ReviewType } from './movieReviews'; // Adjust the import path based on your actual file structure
import { movie } from '../../pages/MoviesPage/MoviesPage'; // Adjust the import path based on your actual file structure
import './addReviewModal.css';
import axios from 'axios';

interface AddReviewModalProps {
    open: boolean;
    handleClose: () => void;
    movieItem: movie | undefined; // Pass movie details as a prop
    refetchMovie: () => void; // Add this prop

}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ open, handleClose, movieItem, refetchMovie  }) => {
    const [rating, setRating] = useState<number | null>(5); // Default to 5, or any other default value
    const [image, setImage] = useState<string>('');
    const [reviewText, setReviewText] = useState<string>('');

    const handleReviewSubmit = async () => {
        try {
            const newReview: ReviewType = {
                date: new Date(),
                reviewerId: '65b001da7a78e66d488d3023', // You need to replace this with the actual user ID
                movieId: movieItem?._id || '', // You need to replace this with the actual movie ID
                rating: rating,
                image: image,
                text: reviewText,
            };
    
            // Make an AJAX request to your backend server
            await axios.post('http://localhost:3003/review/addReview', newReview, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            refetchMovie();
    
            // After successfully submitting the review, you can update the MovieReviews component
            // Reset the form or close the modal after submitting the review
            handleClose();

        } catch (error) {
            console.error('Error submitting review:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <div className='modalTitle'>Let us know your thoughts about {movieItem?.movieName}</div>
                <div className='slider'>
                    Choose score:
                    <Slider
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue as number)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                /></div>
                <TextField
                    label="Your Review"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className='textInput'
                    style={{ width: '340px',height: '125px' }}
                />
                <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    style={{ marginTop: '1rem',marginBottom: '1rem' }}
                />
                <div className='submitButton'>
                <Button variant="contained" onClick={handleReviewSubmit}>
                    Submit Review
                </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddReviewModal;
