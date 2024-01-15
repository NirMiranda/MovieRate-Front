
function Moviecard() {


    const movieYear = 1995
    const movieName = "Iron swords"
    const movieInfo = "This is an action movie about Nir and Dorin in the Israel gaza war. When Ilay kill all the arabs and we winn the war."
    return (
        <>
            <div style={{ flex: "1", marginTop: "40px", marginBottom: "40px", marginLeft: "100px", marginRight: "100px" }}>
                <div className="card bg-dark text-white" style={{ flex: "1", height: "350px", width: "250px", borderColor: "black" }}>
                    <img src="https://mdbcdn.b-cdn.net/img/new/slides/017.webp" className="card-img" alt="Stony Beach" style={{ flex: "1", height: "350px", width: "250px" }} />
                    <div className="card-img-overlay">
                        <h5 className="movieName">{movieName}</h5>
                        <p className="movieInfo" style={{ marginTop: "20px" }}>{movieInfo}</p>
                        <p className="movieYear" style={{
                            position: "absolute",
                            bottom: "0px"
                        }} >From: {movieYear}</p>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Moviecard;
