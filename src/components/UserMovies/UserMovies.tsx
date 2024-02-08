import { useEffect, useState } from "react";
import axios from "axios";
import { movie } from "../../pages/MoviesPage/MoviesPage";
import "./UserMovies.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Modal, Button } from "react-bootstrap";
import { BsFillChatFill, BsPencil, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import UpdateMovieModal from "../editMovie/editMovie";

const UserMovies = ({ userId }: { userId: string }) => {
  const [movies, setMovies] = useState<movie[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState<string>("");
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [movieIdToUpdate, setMovieIdToUpdate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        if (userId) {
          const response = await axios.get<movie[]>(`https://10.10.248.175/user/getMoviesByUserId/${userId}`);
          setMovies(response.data);
        }
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    fetchUserMovies();
  }, [userId]);

  const chunkArray = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

  const handleCardClick = (movieId: string) => {
    navigate(`/moviePage/${movieId}`);
  };

  const handleDeleteClick = (event: React.MouseEvent, movieId: string) => {
    // Prevent event propagation to avoid navigation to the movie page
    event.stopPropagation();
    
    // Show the delete confirmation modal
    setMovieIdToDelete(movieId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    
    try {
      console.log(movieIdToDelete);
      
      await axios.delete(`https://10.10.248.175/movie/deleteMoviebyid/${movieIdToDelete}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieIdToDelete));
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };
  const handleEditClick = (event: React.MouseEvent, movieId: string) => {
    // Prevent event propagation to avoid navigation to the movie page
    event.stopPropagation();
    console.log("edit clicked");
    // Show the update modal
    setMovieIdToUpdate(movieId);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    // Close the update modal and refresh movie data
    setShowUpdateModal(false);
    window.location.reload();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div style={{ justifyContent: 'center', fontSize: '32px' }}>Your Movies</div>
      {movies.length === 0 ? (
        <p>You haven't uploaded any movies yet.</p>
      ) : (
        <Carousel
          controls
          indicators={true}
          interval={null}
          nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
          prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
        >
          {chunkArray([...movies], 3).map((movieGroup, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="MovieCardContainer">
                {movieGroup.map((movie, index) => (
                  <div key={index} className="MovieCard" onClick={() => handleCardClick(movie._id)}>
                    <BsPencil className="EditIcon" style={{ fontSize: '24px' }} onClick={(e) => handleEditClick(e, movie._id)} />
                    <BsTrash className="DeleteIcon" style={{ fontSize: '24px' }} onClick={(e) => handleDeleteClick(e, movie._id)} />
                    <img className="MovieCardImage" src={movie.image} alt={movie.movieName} />
                    <div className="MovieCardContent">
                      <p>{movie.movieName}</p>
                      <p>{movie.year}</p>
                      <div className="ReviewInfo">
                        <BsFillChatFill style={{ marginRight: '5px' }} />
                        <span>{movie.reviews.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <UpdateMovieModal
              isOpen={showUpdateModal}
              onClose={() => setShowUpdateModal(false)}
              movieId={movieIdToUpdate}
              onSuccess={handleUpdateSuccess}
            />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this movie?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserMovies;
