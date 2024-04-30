import { useState, useContext } from "react";
import { GenreManagerContext } from '../main';
import HomeItemsModal from "./HomeItemsModal";
import { EItemType } from "../Enumeration/EItemType";

function Serie({ item }) {

    const { genreManager } = useContext(GenreManagerContext);

    const [hoveredSerie, setHoveredSerie] = useState(false)

    const convertIdToGenre = (ids) => {

        const genres = [];

        for (const id of ids) {
            genres.push(genreManager.getSerieGenreById(id));
        }

        return genres;
    }

    return (
        <div className="movieAndSerie" onMouseEnter={() => setHoveredSerie(true)} onMouseLeave={() => setHoveredSerie(false)}>
            <img className="movieAndSerieImage" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.poster_path} />
            {hoveredSerie && (<HomeItemsModal item={item} genres={convertIdToGenre(item.genre_ids)} path={"serieDetail"} type={EItemType.SERIE} />)}
        </div>
    )
}

export default Serie;