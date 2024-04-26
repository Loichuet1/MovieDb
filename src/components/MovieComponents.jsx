import { useState, useContext } from "react";
import MovieModal from "./ModalMovie";
import { Link } from "react-router-dom";
import { GenreManagerContext } from '../main';

function DisplayMovie({ movie }) {

    const { genreManager } = useContext(GenreManagerContext);

    const [hoveredMovie, setHoveredMovie] = useState(false)

    const convertIdToGenre = (ids) => {

        const genres = [];

        for (const id of ids) {
            genres.push(genreManager.getGenreById(id));
        }

        return genres;
    }


    return (
        <div className="movie" onMouseEnter={() => setHoveredMovie(true)} onMouseLeave={() => setHoveredMovie(false)}>
            <Link className="link" to={`/movieDetail/${movie.id}`}></Link>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.poster_path} />
            {hoveredMovie && (<MovieModal movie={movie} genres={convertIdToGenre(movie.genre_ids)} />)}
        </div>
    );
}

export default DisplayMovie;