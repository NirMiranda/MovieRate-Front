import { useEffect, useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';


interface LikeButtonProps {
    likes: number;
    reviewId: string;
}

const LikeButtonComponent: React.FC<LikeButtonProps> = ({ likes, reviewId }: LikeButtonProps) => {
    const [like, setLike] = useState(likes);
    const [isLike, setIsLike] = useState(false);
    useEffect(() => {
      // Check if the reviewId is in the likedReviews array in localStorage
      const likedReviews = JSON.parse(localStorage.getItem('likedReviews') || '[]');
      setIsLike(likedReviews.includes(reviewId));
    }, [reviewId]);
  
    const onLikeButtonClick = async () => {
      const updatedLike = like + (isLike ? -1 : 1);
      setLike(updatedLike);
      setIsLike(!isLike);
      const likedReviews = JSON.parse(localStorage.getItem('likedReviews') || '[]');
      const updatedLikedReviews = isLike
        ? likedReviews.filter((id: string) => id !== reviewId)
        : [...likedReviews, reviewId];
      localStorage.setItem('likedReviews', JSON.stringify(updatedLikedReviews));

    
      const updateLikes = async () => {
        const apiUrl = 'https://10.10.248.175/review/updateReview';
        try {
          await axios.put(
            apiUrl,
            {
              _id: reviewId,
              likes: updatedLike, // Use the current like value, not the updated state
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } catch (error) {
          console.error('Error updating review:', error);
        }
      };
    
      updateLikes();
    };

  

  return (
    <>
      <button
        className={"like-button " + (isLike ? "liked" : "")}
        onClick={onLikeButtonClick}
      >
        <ThumbUpOffAltIcon></ThumbUpOffAltIcon>{like}
      </button>
      <style>{`
        .like-button {
            font-size: 1rem;
            padding: 5px 10px;
            color:  #585858;
        }
        .liked {
            font-weight: bold;
            color: #1565c0;
          }
      `}</style>
    </>
  );
};

export default LikeButtonComponent