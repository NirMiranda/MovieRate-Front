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
  const getaAllMovies = async () => {
    const { data } = await axios.get("http://localhost:3003/movie/getAllMovies")
    setMovies(data)
  }
  useEffect(() => { getaAllMovies() }, [])
  return (
    <div>
      <section className="top-ten" style={{ height: "500px" }}>
        <div style={{ marginLeft: "10px" }}>
          <h2 style={{ color: "white" }}>Top 10 by rating: </h2>
        </div>
        <div style={{ display: "flex" }}>{movies && movies.map((movie) => {
          return <Moviecard data={movie} />
        })}</div>
      </section>
      <section className="allmovies" style={{ height: "500px" }}>
        <div style={{ marginLeft: "10px" }}>
          <h2 style={{ color: "white" }}>All Movies: </h2>
        </div>
        <div style={{ display: "flex" }}>{movies && movies.map((movie) => {
          return <Moviecard data={movie} />
        })}</div>
      </section>
    </div >

  );
}

export default Movies;
