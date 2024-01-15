

import { useParams } from "react-router-dom";

function Movie() {
    const { id } = useParams()
    return (
        <>
            <h1> {id} </h1>
        </>
    );
}

export default Movie;
