import { useState } from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { Box} from '@mui/material';
import './movieReviews.css';
import { movie } from '../../pages/MoviesPage/MoviesPage';
import CircularProgress from '@mui/joy/CircularProgress';
import ReviewModal from '../reviewModal/reviewModal';
import UnclickableLikeComponent  from '../unclickableLike/unclickableLike';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import EditModal from '../EditModal/EditModal';


export type ReviewType = {
  _id: string;
  date: Date;
  reviewerId: UserType; // Adjust this as needed
  movieId: movie; // Adjust this as needed
  rating: number;
  likes?: number;
  image: string;
  text: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  reviews: ReviewType[];
  age: number;
};

interface MovieReviewsProps {
  reviews: ReviewType[];
}

const REVIEWS_PER_ROW = 3;
const MAX_ROWS = 3;

function fixDate(date: Date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateString = date.toLocaleDateString('en-US', options);
  const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return `${dateString}, ${timeString}`;
}

interface LocalStorageUser {
  _id: string;
}

function MovieReviews({ reviews }: MovieReviewsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const localStorageUser: LocalStorageUser | null = JSON.parse(localStorage.getItem('user') || 'null');

  const reviewsPerPage = REVIEWS_PER_ROW * MAX_ROWS;
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = Math.min(startIndex + reviewsPerPage, reviews.length);
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [hoveredReview2, setHoveredReview2] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const handleMouseEnter = (reviewId: string,reviewerId: string) => {
    setHoveredReview(reviewId);
    setHoveredReview2(reviewerId);
    console.log('hoveredReview2 on MoviePage:', reviewerId);
  };

  const handleMouseLeave = () => {
    setHoveredReview(null);
    setHoveredReview2(null);
  };

  const handleExpandClick = (reviewId: string) => {
    setOpenModal(true);
    setSelectedReviewId(reviewId);
  };

  const handleDeleteClick = (reviewId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete the review?");
  
    if (isConfirmed) {
      axios.delete(`https://10.10.248.175/review/deleteReview/${reviewId}`)
        .then(() => {
          window.location.reload();
        });
    }
  }; 
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const handleEditClick = (reviewId: string) => {
    setOpenEditModal(true);
    setSelectedReviewId(reviewId);
    
  };
  const handleEditReview = (editedReview: ReviewType) => {
    // Make the API call or handle the logic to save the edited review
    // Update the reviews array with the edited review
    const updatedReviews = reviews.map((review) =>
      review._id === editedReview._id ? editedReview : review
    );

    // Update the state with the new reviews
    // setReviews(updatedReviews);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReviewId(null);
  };
  const selectedReview = reviews.find((review) => review._id === selectedReviewId) || null;  

  if (reviews.length === 0) {
    return <div className="no-reviews-message" style={{color:'red',textAlign:'center',fontSize:'24px'}}>There are no reviews yet</div>;
  }

  return (
    <div className='reviewsBox'>
      <div className='reviewItems'>
        {paginatedReviews.map((review) => (
          <div
            key={review._id}
            className={`ReviewItem`}
            onMouseEnter={() => handleMouseEnter(review._id,review.reviewerId._id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`ContentContainer ${hoveredReview === review._id ? 'blurred' : ''}`}>
              <Box className="Box">
                <div className='messageIcon'><MessageOutlinedIcon style={{ color: 'black'}} /></div>
                <div className='reviewDetails'>
                  <div className='reviewer'>
                    Review by:<div className='reviwerName'>{review.reviewerId.name}</div>
                  </div>
                  <div className='reviewRating'>
                    Score: <CircularProgress size="lg" determinate value={review.rating*10}>{review.rating} / 10</CircularProgress>
                  </div>
                  <div className='reviewBottom'>
                    <div className='reviewDate'>{fixDate(new Date(review.date))}</div>
                    <div className='unclickableLike'><UnclickableLikeComponent likes={review.likes ?? 0}/></div>

                  </div>
                </div>
              </Box>
            </div>
            {hoveredReview === review._id && (
              <div className={`expandText ${selectedReviewId === review._id ? 'clickable' : ''}`}
                onClick={() => handleExpandClick(review._id)}>
                Expand
              </div>
            )}
            {hoveredReview === review._id && hoveredReview2 === localStorageUser?._id && (
              <div className='editDeleteButtons '>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleEditClick(review._id)}
              >
                <EditIcon />
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleDeleteClick(review._id)}
              >
                <DeleteIcon />
              </Button>
            </div>
              )}
          </div>
        ))}
      </div>

      {reviews.length > reviewsPerPage && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
          <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= reviews.length}
          >
            Next Page
          </Button>
        </div>
      )}

      {/* Use the ReviewModal component */}
      <ReviewModal open={openModal} handleClose={handleCloseModal} review={selectedReview} />
      <EditModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        handleEdit={handleEditReview}
        review={selectedReview}
      />
    </div>
  );
}

export default MovieReviews;