// ReviewModal.js
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import { ReviewType } from '../MovieReviews/MovieReviews';
import './reviewModal.css';
import LikeButtonComponent from '../likeButton/likeButton';

interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  review: ReviewType | null;
}

function ReviewModal({ open, handleClose, review }: ReviewModalProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      {review && (
        <>
          <DialogContent>
            <div className='dialogContent'>
                <LikeButtonComponent likes={review.likes ?? 0} reviewId={review._id} />
                <div className='modalTop'>
              <div className='reviewerName'>
                Review by: {review.reviewerId.name}
              </div>
              <div className='reviewScore'>
                Score:{' '}
                <CircularProgress size="lg" determinate value={review.rating * 10}>
                  {review.rating} / 10
                </CircularProgress>
              </div>
              </div>
              <div className='reviewText'>
                My thoughts: {<br></br>} {review.text}
              </div>
              {review.reviewerId.name}'s photo: {review.image && (
                <div className='reviewImage'>
                  <img src={review.image} alt='Review' style={{ width: '150px', height: '150px' }}/>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions style={{justifyContent:'space-between'}}>
            <div className='reviewDate'>
                Date: {new Date(review.date).toLocaleString()}
            </div>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default ReviewModal;
