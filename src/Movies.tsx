import Moviecard from "./Moviecard";
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
  useEffect(() => {
    getaAllMovies()
  }, [])

  return (
    <>
      <h1>movies </h1>
      {movies && movies.map((movie) => {
        return <Moviecard data={movie} />
      })}
    </>
  );
}

export default Movies;
