import Moviecard from "../../components/MovieCard/Moviecard";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewType } from "../../components/MovieReviews/movieReviews";
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
  reviews?: ReviewType[],
  trailer: string
}


function Movies() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [moviestopten, setMoviestopten] = useState<movie[]>([]);

  const getaAllMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:3003/movie/getAllMovies");
      setMovies(data);
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
  useEffect(() => { getaAllMovies(); }, []);
  useEffect(() => { getTop10Movies(); }, []);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <section className="top-ten" style={{ height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
            Top 10 by rating:
          </h2>
        </div>
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <Slider {...settings}>
            {moviestopten &&
              moviestopten.map((movie) => (
                <Moviecard key={movie._id} data={movie} style={{ margin: '0 10px' }} />
              ))}
          </Slider>
        </div>
      </section>
      <section className="all-movies" style={{ marginBottom: '50px', height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
            All movies:
          </h2>
        </div>
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <Slider {...settings}>
            {movies &&
              movies.map((movie) => (
                <Moviecard key={movie._id} data={movie} style={{ margin: '0 10px' }} />
              ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default Movies;