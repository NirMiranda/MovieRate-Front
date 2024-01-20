import Moviecard from "../../components/MovieCard/Moviecard";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';




export type movie = {
  _id?: string,
  movieName: string,
  year: number,
  director: string,
  actors: string[],
  genre: string,
  image: string,
  description: string,
  ratingImdb: number,
  reviews?: string[],
  trailer: string
}


function Movies() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [moviestopten, setMoviestopten] = useState<movie[]>([]);
  const [newestmovies, setNewestmovies] = useState<movie[]>([]);
  const navigate = useNavigate();
  // const [years, setYears] = useState<number[]>([]);
  // const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const getaAllMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:3003/movie/getAllMovies");
      setMovies(data);

      // // Extract unique years from movies
      // const uniqueYears = Array.from(new Set(data.map((movie: { year: any; }) => movie.year)));
      // setYears(uniqueYears);
    } catch (error) { console.error("Error fetching movies:", error); }
  };

  const getTop10Movies = async () => {
    try {
      const { data } = await axios.get("http://localhost:3003/movie/getAllMovies");
      const sortedMovies = data.sort((a: { ratingImdb: number; }, b: { ratingImdb: number; }) => b.ratingImdb - a.ratingImdb);
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => { getaAllMovies(); }, []);
  useEffect(() => { getTop10Movies(); }, []);
  useEffect(() => { getNewestMovies(); }, []);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const handleClick = (_id: string) => {
    navigate(`/moviePage/${_id}`);
  };
  // const filterMoviesByYear = (year: number) => {
  //   setSelectedYear(year);
  // };

  // const filteredMovies = selectedYear
  //   ? movies.filter((movie) => movie.year === selectedYear)
  //   : movies;

  return (
    <div style={{ width: '70%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '10px 10px 10px 10px' }}>
      <section className="lastmovies" style={{ height: '500px', marginTop: '200px' }}>
        <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
          Last movies :
        </h2>
        <div style={{ marginLeft: '60px', color: 'white', height: '400px', width: '1300px' }}>
          <Carousel>
            {newestmovies &&
              newestmovies.map((movie) => (
                <Carousel.Item>
                  <img src={movie.image} style={{ height: '350px', width: '1300px' }} onClick={() => { if (movie._id) handleClick(movie._id); }} />
                  <Carousel.Caption>
                    <h3 style={{ backgroundColor: 'rgb(43, 39, 48)', borderRadius: '30px' }}>From: {movie.year} , Imdb rating: {movie.ratingImdb}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </section >
      <section className="top-ten" style={{ height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
            Top 10 by rating :
          </h2>
        </div>
        <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: '10px', marginBottom: "50px", }}>
          <Slider {...settings}>
            {moviestopten &&
              moviestopten.map((movie) => (
                <Moviecard key={movie._id} data={movie} />
              ))}
          </Slider>
        </div>
      </section>
      <section className="all-movies" style={{ height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
            All movies :</h2>
        </div>
        {/* <div className="dropdown" style={{ marginLeft: '900px', marginBottom: '20px' }}>
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Year
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {years.map((year) => (
                <Dropdown.Item key={year} onClick={() => filterMoviesByYear(year)}>
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginLeft: "30px", marginRight: "80px", marginTop: '10px', marginBottom: "50px" }}>
          {movies.map((movie) => (
            <Moviecard key={movie._id} data={movie} style={{ padding: '20px', borderRadius: '8px', boxSizing: 'border-box' }} />
          ))}
        </div>
      </section>
    </div >
  );
}

export default Movies;