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
  
    const onLikeButtonClick = async () => {
      setLike(like + (isLike ? -1 : 1));
      setIsLike(!isLike);
    };
  
    useEffect(() => {
      const updateLikes = async () => {
        const apiUrl = 'http://localhost:3003/review/updateReview';
        try {
            await axios.post(
            apiUrl,
            {
              _id: reviewId,
              likes: like,
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
  
      // Call the updateLikes function when 'like' changes
      updateLikes();
    }, [like, reviewId]); // Trigger the effect when 'like' or 'reviewId' changes
  

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