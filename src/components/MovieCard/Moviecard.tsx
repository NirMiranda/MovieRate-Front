import { movie } from '../../pages/MoviesPage/MoviesPage';
import { useNavigate } from 'react-router-dom';

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
        <div onClick={() => { if (data._id) handleClick(data._id); }} style={{ ...style, margin: '0 20px', marginBottom: '30px', }}>
            <div className="card bg-dark text-white"
                style={{ flex: '1', height: '350px', width: '250px', borderColor: 'black', }}>
                <img src={data?.image} className="card-img" alt="Movie Poster" style={{ flex: '1', height: '350px', width: '250px' }} />
                <div className="card-img-overlay">
                    <p className="movieRate" style={{ position: 'absolute', bottom: '30px' }}>
                        Imdb Rate: {data?.ratingImdb}
                    </p>
                    <p className="movieYear" style={{ position: 'absolute', bottom: '0px' }}>
                        From: {data?.year}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Moviecard;

