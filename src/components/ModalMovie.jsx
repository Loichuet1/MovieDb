

function MovieModal({ movie, genres }) {

    const truncate = (string, n) => {
        return string.slice(0, n);
    }

    return (
        <div className="modal">
            <div className="modalBody" >
                <h2>{movie.title}</h2>
                <div className="infoFlexboxModal">
                    <h1 style={{ color: "#90fe6c" }}>{movie.vote_average.toFixed(1) * 10} % </h1>
                    <h1>{truncate(movie.release_date, 4)}</h1>

                </div>
                <div className="modalGenreSection">
                    {genres.map(genre => (

                        <div
                            key={genre}
                            className="modalGenreBlock">
                            <h1>
                                {genre}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieModal;