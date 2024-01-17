import Moviecard from "../../components/MovieCard/Moviecard";
import axios from "axios";
import { useState, useEffect } from "react";
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

  const [startIndextop, setStartIndextop] = useState(0);
  const [startIndexAll, setStartIndexAll] = useState(0);
  const moviesPerPage = 4;

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

  const handleRightNarrowClickTop = () => {
    setStartIndextop((prevIndex) => (prevIndex + moviesPerPage) % movies.length);
  };

  const handleLeftNarrowClickTop = () => {
    setStartIndextop((prevIndex) => (prevIndex - moviesPerPage + movies.length) %
      movies.length);
  };

  const handleRightNarrowClickAll = () => {
    setStartIndexAll((prevIndex) => (prevIndex + moviesPerPage) % movies.length);
  };

  const handleLeftNarrowClickAll = () => {
    setStartIndexAll((prevIndex) => (prevIndex - moviesPerPage + movies.length) %
      movies.length);
  };
  useEffect(() => { getaAllMovies(); }, []);
  useEffect(() => { getTop10Movies(); }, []);

  return (
    <div>
      <section className="top-ten" style={{ height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
            Top 10 by rating:
          </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <div className="Leftnarrow-topten" role="presentation"
            onClick={handleLeftNarrowClickTop}>
            <svg width="60" height="60" color="white"
              xmlns="http://www.w3.org/2000/svg"
              className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
              style={{ marginTop: '150px' }}>
              <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
            </svg>
          </div>
          {moviestopten && moviestopten.slice(startIndextop, startIndextop + moviesPerPage).map((movie) => (<Moviecard key={movie._id} data={movie} style={{ margin: '0 10px' }} />))}
          <div className="Rightnarrow-topten" role="presentation" onClick={handleRightNarrowClickTop}>
            <svg width="60" height="60" color="white"
              xmlns="http://www.w3.org/2000/svg"
              className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
              style={{ marginTop: '150px' }}>
              <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z" />
            </svg>
          </div>
        </div>
      </section>
      <section className="all-movies" style={{ marginBottom: '50px', height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: '20px' }}>
            All movies:</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', marginBottom: '10px', }}>
          <div className="Leftnarrow-allmovies" role="presentation" onClick={handleLeftNarrowClickAll}>
            <svg width="60" height="60" color="white"
              xmlns="http://www.w3.org/2000/svg"
              className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
              style={{ marginTop: '150px' }}>
              <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
            </svg>
          </div>
          {movies && movies.slice(startIndexAll, startIndexAll + moviesPerPage).map((movie) => (<Moviecard key={movie._id} data={movie} style={{ margin: '0 10px' }} />))}
          <div className="Rightnarrow-allmovies" role="presentation" onClick={handleRightNarrowClickAll}>
            <svg width="60" height="60" color="white"
              xmlns="http://www.w3.org/2000/svg"
              className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
              style={{ marginTop: '150px' }}>
              <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movies;



