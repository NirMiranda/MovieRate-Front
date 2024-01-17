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
  const [movies, setMovies] = useState<movie[]>([])
  const [startIndextop, setStartIndextop] = useState(0);
  const [startIndexAll, setStartIndexAll] = useState(0);
  const moviesPerPage = 4; // Number of movies to display at a time

  const getaAllMovies = async () => {
    const { data } = await axios.get("http://localhost:3003/movie/getAllMovies")
    setMovies(data)
  }
  const handleRightNarrowClickTop = () => {
    setStartIndextop((prevIndex) => (prevIndex + moviesPerPage) % movies.length);
  };
  const handleRightNarrowClickAll = () => {
    setStartIndexAll((prevIndex) => (prevIndex + moviesPerPage) % movies.length);
  };
  useEffect(() => { getaAllMovies() }, [])
  return (
    <div>
      <section className="top-ten" style={{ height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: "20px", }}>
            Top 10 by rating:
          </h2>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', }}>
          {movies && movies.slice(startIndextop, startIndextop + moviesPerPage).map((movie) => (<Moviecard key={movie._id} data={movie} style={{ margin: '0 10px', }} />))}
          <div className="Rightnarrow-topten" role="presentation" onClick={handleRightNarrowClickTop}>
            <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" color="white" className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation" style={{ marginTop: "175px" }}><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
          </div>
        </div>
      </section >
      <section className="all-movies" style={{ marginBottom: '50px', height: '500px' }}>
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: '0 10px', marginBottom: "20px", }}>
            All movies:
          </h2>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', marginBottom: '10px' }}>
          {movies && movies.slice(startIndexAll, startIndexAll + moviesPerPage).map((movie) => (<Moviecard key={movie._id} data={movie} style={{ margin: '0 10px', }} />))}
          <div className="Rightnarrow-allmovies" role="presentation" onClick={handleRightNarrowClickAll}>
            <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" color="white" className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation" style={{ marginTop: "175px" }}><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
          </div>
        </div>
      </section >
    </div >
  );
}

export default Movies;



