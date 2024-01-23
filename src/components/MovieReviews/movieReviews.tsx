import { useState } from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { Box} from '@mui/material';
import './movieReviews.css';
import { movie } from '../../pages/MoviesPage/MoviesPage';
import CircularProgress from '@mui/joy/CircularProgress';
import ReviewModal from '../reviewModal/reviewModal';
import UnclickableLikeComponent  from '../unclickableLike/unclickableLike';
import Button from '@mui/material/Button';



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

function MovieReviews({ reviews }: MovieReviewsProps) {
  console.log(reviews);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const reviewsPerPage = REVIEWS_PER_ROW * MAX_ROWS;
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = Math.min(startIndex + reviewsPerPage, reviews.length);
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const handleMouseEnter = (reviewId: string) => {
    setHoveredReview(reviewId);
  };

  const handleMouseLeave = () => {
    setHoveredReview(null);
  };

  const handleExpandClick = (reviewId: string) => {
    setOpenModal(true);
    setSelectedReviewId(reviewId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReviewId(null);
  };

  const selectedReview = reviews.find((review) => review._id === selectedReviewId) || null;
  return (
    <div className='reviewsBox'>
      <div className='reviewItems'>
        {paginatedReviews.map((review) => (
          <div
            key={review._id}
            className={`ReviewItem`}
            onMouseEnter={() => handleMouseEnter(review._id)}
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
    </div>
  );
}

export default MovieReviews;