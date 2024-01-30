import { useEffect, useState } from "react";
import axios from "axios";
import { movie } from "../../pages/MoviesPage/MoviesPage";
import "./UserMovies.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom


interface MovieCardProps {
  movie: movie;
}

const UserMovies = ({ userId }: { userId: string }) => {
    const [movies, setMovies] = useState<movie[]>([]);
    const navigate = useNavigate(); // Initialize useNavigate
  
    useEffect(() => {
      const fetchUserMovies = async () => {
        try {
          if (userId) {
            const response = await axios.get<movie[]>(`http://localhost:3003/user/getMoviesByUserId/${userId}`);
            setMovies(response.data);
          }
        } catch (error) {
          console.error('Error fetching user movies:', error);
        }
      };
  
      fetchUserMovies();
    }, [userId]);
  
    // Function to chunk the movies array into groups of 3
    const chunkArray = (arr: any[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

      const handleCardClick = (movieId: string) => {
        navigate(`/moviePage/${movieId}`);
      };
  
      return (
        <div>
          <div style={{justifyContent:'center',fontSize:'32px'}}>User's Movies</div>
          {movies.length === 0 ? (
            <p>You haven't uploaded any movies yet.</p>
          ) : (
            <Carousel
              controls
              indicators={true}
              interval={null} // Disable automatic sliding
              nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
              prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
            >
              {chunkArray([...movies], 3).map((movieGroup, groupIndex) => (
                <Carousel.Item key={groupIndex}>
                  <div className="MovieCardContainer">
                    {movieGroup.map((movie, index) => (
                      <div key={index} className="MovieCard" onClick={() => handleCardClick(movie._id)}>
                        <img className="MovieCardImage" src={movie.image} alt={movie.movieName} />
                        <div className="MovieCardContent">
                          <p>{movie.movieName}</p>
                          <p>{movie.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      );
    };
    
    export default UserMovies;