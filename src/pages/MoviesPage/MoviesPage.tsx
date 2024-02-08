import Moviecard from "../../components/MovieCard/Moviecard";
import axios from "axios";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Carousel, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './moviesPage.css';
import {UserType} from '../ProfilePage/Profile';

export type movie = {
  _id?: string,
  movieName: string,
  year: number,
  director: string,
  actors: string[],
  genre: string,
  image: string,
  description: string,
  reviews?: string[],
  trailer: string,
  uploadedBy?: UserType
}

function Movies() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [newestmovies, setNewestmovies] = useState<movie[]>([]);
  const navigate = useNavigate();

  const [filteredMovies, setFilteredMovies] = useState<movie[]>([]);

  const [years, setYears] = useState<number[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const handleClick = (_id: string) => { navigate(`/moviePage/${_id}`); };

  const getaAllMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:3003/movie/getAllMovies");
      setMovies(data);
      const sortedMovies = data.sort((a: { year: number; }, b: { year: number; }) => b.year - a.year);
      const uniqueYears = Array.from(new Set(sortedMovies.map((movie: movie) => movie.year)));
      const uniqueDirectors = Array.from(new Set(sortedMovies.map((movie: movie) => movie.director))).sort();
      const uniqueGenres = Array.from(new Set(sortedMovies.map((movie: movie) => movie.genre))).sort();
      setYears(uniqueYears);
      setDirectors(uniqueDirectors);
      setGenres(uniqueGenres);
    } catch (error) { console.error("Error fetching movies:", error); }
  };



  const getNewestMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:3003/movie/getAllMovies");
      const sortedMovies = data.sort((a: { year: number }, b: { year: number }) => b.year - a.year);
      const newestMovies = sortedMovies.slice(0, 10);
      setNewestmovies(newestMovies);
    } catch (error) { console.error("Error fetching movies:", error); }
  };

  useEffect(() => {
    getaAllMovies();
    getNewestMovies();
  }, []);

  useEffect(() => {
    if (selectedYear !== null) {
      const filtered = movies.filter((movie) => movie.year === selectedYear);
      setFilteredMovies(filtered);
    }
    else { setFilteredMovies(movies); }
  }, [selectedYear, movies]);

  useEffect(() => {
    if (selectedDirector !== null) {
      const filtered = movies.filter((movie) => movie.director === selectedDirector);
      setFilteredMovies(filtered);
    } else { setFilteredMovies(movies); }
  }, [selectedDirector, movies]);

  useEffect(() => {
    if (selectedGenre !== null) {
      const filtered = movies.filter((movie) => movie.genre === selectedGenre);
      setFilteredMovies(filtered);
    } else { setFilteredMovies(movies); }
  }, [selectedGenre, movies]);


  const handleYearSelect = (year: number | null) => {
    setSelectedYear(year);
    setSelectedDirector(null);
    setSelectedGenre(null);
  };

  const handleDirectorSelect = (director: string | null) => {
    setSelectedDirector(director);
    setSelectedYear(null);
    setSelectedGenre(null);
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    setSelectedYear(null);
    setSelectedDirector(null);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
const moviesPerPage = 9;

// Calculate the index of the first and last movie on the current page
const indexOfLastMovie = currentPage * moviesPerPage;
const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};



  return (
    <div className='MoviesPage'>
      <div className="page" style={{width:'65%',margin:'0 auto'}}>
      {newestmovies.length > 0 && (
      <section className="lastmovies" style={{padding:'4rem 0',marginTop:'15px'}}>
        <h2 className="lastMoviesh2" style={{textAlign:'center'}}> Latest movies</h2>
        <div className="lastdivcarosel"  style={{height:'400px'}}>
          <Carousel className="newestmovies" style={{height:'100%'}}>
            {newestmovies &&
              newestmovies.map((movie) => (
                <Carousel.Item className="carouselItem" interval={99999999} style={{backgroundImage: `url(${movie.image})`,height:'auto',backgroundColor:'grey',backgroundSize:'contain',backgroundBlendMode:'soft-light'}} key={movie._id} onClick={() => { if (movie._id) handleClick(movie._id)}}>
                  <img
                    className="imgcarosel"
                    src={movie.image}
                    alt={`Movie: ${movie.movieName}`}
                    style={{width:'70%',marginLeft:'15%',height:'400px'}}
                  />
                  <Carousel.Caption className="carouselCaption">
                    <h3 style={{ backgroundColor: 'rgb(43, 39, 48)', borderRadius: '30px' }}>
                      {movie.movieName} -
                      From {movie.year}
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </section>
            )}

      <section className="all-movies" style={{width:'65%',margin:'0 auto',padding:'0'}}>
      {filteredMovies.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '250px' }}>There are no movies in the site yet</p>
        ) : (
          <div>
        <h2 style={{textAlign:'center'}}>All Movies</h2>
        <div className="dropDowns">
          <Dropdown style={{ marginRight: '15px' }}>
            <Dropdown.Toggle id="dropdown-year">
              {selectedYear !== null ? `Year: ${selectedYear}` : "Select Year"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {years.map((year) => (
                <Dropdown.Item key={year} onClick={() => handleYearSelect(year)}>
                  {year}

                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={() => handleYearSelect(null)}>Clear</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ marginRight: '15px' }}>
            <Dropdown.Toggle id="dropdown-director">
              {selectedDirector !== null ? `Director: ${selectedDirector}` : "Select Director"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {directors.map((director) => (
                <Dropdown.Item key={director} onClick={() => handleDirectorSelect(director)}>
                  {director}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={() => handleDirectorSelect(null)}>Clear</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ marginRight: '15px' }}>
            <Dropdown.Toggle id="dropdown-genre">
              {selectedGenre !== null ? `Genre: ${selectedGenre}` : "Select Genre"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {genres.map((genre) => (
                <Dropdown.Item key={genre} onClick={() => handleGenreSelect(genre)}>
                  {genre}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={() => handleGenreSelect(null)}>Clear</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>   
        </div>
       
        <div className="Cards">
        {currentMovies.map((movie) => (
          <Moviecard
            key={movie._id}
            data={movie}
            style={{ paddingTop: '50px', borderRadius: '8px', boxSizing: 'border-box' }}
          />
        ))}
      </div>

      <div className="pagination-buttons" style={{justifyContent:'center',display:'flex',marginBottom:'20px'}}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1} style={{marginRight:'5px'}}>
          Prev
        </Button>
        <Button onClick={handleNextPage} disabled={indexOfLastMovie >= filteredMovies.length}>
          Next
        </Button>
      </div>
      </div>
        )}
      </section>
      </div>
    </div>
  );
}

export default Movies;
