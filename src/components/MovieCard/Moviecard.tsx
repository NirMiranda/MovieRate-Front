import { movie } from "../../pages/MoviesPage/MoviesPage";
import { useNavigate } from "react-router-dom";
type m = {
    data: movie
}

function Moviecard({ data }: m) {
    const navigate = useNavigate()
    const handleClick = (_id: string) => {
        navigate(`/moviePage/${_id}`)
    }
    return (
        <>
            <div onClick={() => {
                if (data._id)
                    handleClick(data._id)
            }}
                style={{ flex: "1", marginTop: "40px", marginBottom: "40px", marginLeft: "100px", marginRight: "100px" }} >
                <div className="card bg-dark text-white" style={{ flex: "1", height: "350px", width: "250px", borderColor: "black" }}>
                    <img src={data?.image} className="card-img" alt="Stony Beach" style={{ flex: "1", height: "350px", width: "250px" }} />
                    <div className="card-img-overlay">
                        <p className="movieRate" style={{
                            position: "absolute",
                            bottom: "30px"
                        }} >Imdb Rate: {data?.ratingImdb}</p>
                        <p className="movieYear" style={{
                            position: "absolute",
                            bottom: "0px"
                        }} >From: {data?.year}</p>
                    </div>
                </div>
            </div >
        </>
    );
}
export default Moviecard;
