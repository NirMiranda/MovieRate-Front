// src/App.tsx

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Movies() {
  const navigate = useNavigate()

  return (
    <>
      <h1>movies </h1>
      <Button className="btn" onClick={() => { navigate("/MoviePage/65a56dc5bc9b7f4e16e33b0f") }}>go to movie</Button>
    </>
  );
}

export default Movies;
