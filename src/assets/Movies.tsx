
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Moviecard from "./Moviecard";

function Movies() {
  const navigate = useNavigate()

  return (
    <>
      <h1>movies </h1>
      <Moviecard />
      <Button className="btn" onClick={() => { navigate("/Movie/Idan") }}>go to movie</Button>
    </>
  );
}

export default Movies;
