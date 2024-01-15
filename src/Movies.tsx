// src/App.tsx

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Movies() {
  const navigate = useNavigate()

  return (
    <>
      <h1>movies </h1>
      <Button className="btn" onClick={() => { navigate("/Movie/Idan") }}>go to movie</Button>
    </>
  );
}

export default Movies;
