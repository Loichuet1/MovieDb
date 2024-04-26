

function TrendingMovie({ movie, index }) {


    return (
        <div className="trendingMoviecard">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.poster_path} />
            <div className="classement"><p>{index}</p></div>

        </div>
    )
}

export default TrendingMovie;