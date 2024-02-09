// EditModal.tsx
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './EditModal.css';
import { ReviewType } from '../MovieReviews/MovieReviews';
import axios from 'axios';


interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  handleEdit: (editedReview: ReviewType) => void;
  review: ReviewType | null;
}

const EditModal: React.FC<EditModalProps> = ({ open, handleClose, handleEdit, review }) => {
  const [editedText, setEditedText] = useState<string>(review?.text || '');
  const [editedRating, setEditedRating] = useState<number>(review?.rating || 5);
  const [editedImage, setEditedImage] = useState<string>(review?.image || '');

  const handleSave = () => {
    if (review) {
      const editedReview = { ...review, text: editedText, rating: editedRating, image: editedImage };
      axios.post('https://193.106.55.175/review/updateReview', editedReview)
        .then((response) => {
          // Handle the updated review data returned from the server if needed
          const updatedReview = response.data;
          handleEdit(updatedReview);
          handleClose();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating review:', error);
          // Handle the error (e.g., show an error message to the user)
        });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="edit-modal-container">
      <div className="edit-modal-content">
        <h2 className='modalHeader'>Edit Review - {review?.movieId.movieName}</h2>
        <Box className="rating-slider-container">
          <div>Edit Rating:</div>
          <Slider
            value={editedRating}
            onChange={(event, newValue) => setEditedRating(newValue as number)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
          />
        </Box>
        <TextField
          label="Edit Review"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        <TextField
          label="Edit Image URL"
          variant="outlined"
          fullWidth
          value={editedImage}
          onChange={(e) => setEditedImage(e.target.value)}
          className='imageInput'
        />
        <div className="button-container">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
