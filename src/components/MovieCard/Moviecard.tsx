import { movie } from '../../pages/MoviesPage/MoviesPage';
import { useNavigate } from 'react-router-dom';
import { BsFillChatFill } from 'react-icons/bs';


type MoviecardProps = {
    data: movie;
    style?: React.CSSProperties;
};

function Moviecard({ data, style }: MoviecardProps) {
    const navigate = useNavigate();

    const handleClick = (_id: string) => {
        navigate(`/moviePage/${_id}`);
    };

    return (
        <div onClick={() => { if (data._id) handleClick(data._id); }} style={{ ...style, margin: '0', marginBottom: '30px', }}>
            <div className="card bg-dark text-white"
                style={{ flex: '1', height: '350px', width: '250px', borderColor: 'black', marginLeft: '10px', marginRight: '10px' }}>
                <div className="reviewInfo" style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 1 }}>
                <BsFillChatFill style={{ fontSize: '24px' }} />
                <span style={{fontSize:'24px'}}>{data?.reviews?.length}</span>
                </div>
                <img src={data?.image} className="card-img" alt="Movie Poster" style={{ flex: '1', height: '350px', width: '250px' }} />
                <div className="card-img-overlay">
                    <p className="movieYear" style={{ position: 'absolute', bottom: '0px' ,textAlign:'center'}}>
                        {data?.movieName} -
                        From: {data?.year}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Moviecard;

