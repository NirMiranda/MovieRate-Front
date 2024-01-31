import Moviecard from "../../components/MovieCard/Moviecard";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './MoviesPage.css';
import { UserType } from '../ProfilePage/Profile';

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
  const [moviestopten, setMoviestopten] = useState<movie[]>([]);
  const [newestmovies, setNewestmovies] = useState<movie[]>([]);
  const navigate = useNavigate();

  const [filteredMovies, setFilteredMovies] = useState<movie[]>([]);

  const [years, setYears] = useState<number[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

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
      setRatings(uniqueRatings);
    } catch (error) { console.error("Error fetching movies:", error); }
  };

  const getTop10Movies = async () => {
    try {
      const { data } = await axios.get("http://localhost:3003/movie/getAllMovies");
      const top10Movies = sortedMovies.slice(0, 10);
      setMoviestopten(top10Movies);
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
    getTop10Movies();
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
    setSelectedRating(null);
  };

  const handleDirectorSelect = (director: string | null) => {
    setSelectedDirector(director);
    setSelectedYear(null);
    setSelectedGenre(null);
    setSelectedRating(null);
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    setSelectedYear(null);
    setSelectedDirector(null);
    setSelectedRating(null);
  };

  const handleRatingSelect = (rating: number | null) => {
    setSelectedRating(rating);
    setSelectedYear(null);
    setSelectedDirector(null);
    setSelectedGenre(null);
  };

  return (
    <div className='MoviesPage'>
      <section className="lastmovies">
        <h2 className="lastMoviesh2"> Last movies :</h2>
        <div className="lastdivcarosel">
          <Carousel className="newestmovies">
            {newestmovies &&
              newestmovies.map((movie) => (
                <Carousel.Item className="carouselItem" key={movie._id} onClick={() => { if (movie._id) handleClick(movie._id); }}>
                  <img
                    className="imgcarosel"
                    src={movie.image}
                    alt={`Movie: ${movie.movieName}`}
                  />
                  <Carousel.Caption className="carouselCaption">
                    <h3 style={{ backgroundColor: 'rgb(43, 39, 48)', borderRadius: '30px' }}>
                      From: {movie.year}
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </section>
      <section className="top-ten">
        <h2>Top 10 by rating :</h2>
        <div>
          <Slider {...settings} className="slidertopten" >
            {moviestopten &&
              moviestopten.map((movie) => (
                <div className="card" key={movie._id}>
                  <img src={movie?.image} className="card-img" alt={`Movie: ${movie.movieName}`} onClick={() => { if (movie._id) handleClick(movie._id); }} />
                  <div className="card-caption">
                    <h4>From: {movie.year}</h4>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </section>
      <section className="all-movies">
        <h2>All movies :</h2>
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
          {filteredMovies.map((movie) => (
            <Moviecard
              key={movie._id}
              data={movie}
              style={{ paddingTop: '50px', borderRadius: '8px', boxSizing: 'border-box' }}
            />
          ))}
        </div>
      </section>
      <div>
      </div>
    </div>
  );
}

export default Movies;
