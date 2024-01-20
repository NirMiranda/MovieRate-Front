import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


const UnclickableLikeComponent: React.FC<UnclickableLikeProps> = ({ likes }) => {
    return(
        <>
            <ThumbUpOffAltIcon></ThumbUpOffAltIcon>{likes}
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
    )
}


export default UnclickableLikeComponent 