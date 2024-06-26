import { useState, useContext } from "react";
import HomeItemsModal from "./HomeItemsModal";
import { GenreManagerContext } from '../main';
import { EItemType } from "../Enumeration/EItemType";

function DisplayMovie({ item }) {

    const { genreManager } = useContext(GenreManagerContext);

    const [hoveredMovie, setHoveredMovie] = useState(false)

    const convertIdToGenre = (ids) => {

        const genres = [];

        for (const id of ids) {
            genres.push(genreManager.getMovieGenreById(id));
        }

        return genres;
    }


    return (
        <div className="movieAndSerie" onMouseEnter={() => setHoveredMovie(true)} onMouseLeave={() => setHoveredMovie(false)}>
            <img className="movieAndSerieImage" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.poster_path} />
            {hoveredMovie && (<HomeItemsModal item={item} genres={convertIdToGenre(item.genre_ids)} path={"movieDetail"} type={EItemType.MOVIE} />)}
        </div>
    );
}

export default DisplayMovie;