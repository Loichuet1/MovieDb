import { useCallback, useState } from "react";
import { GetAllGenre } from "../services/GenreService";

function GenreManager() {

    const [genres, setGenre] = useState(new Map())


    const fecthGenre = useCallback(async () => {

        try {
            const genre = await GetAllGenre();
            convertToMap(genre, setGenre);
        }
        catch {

        }
    })

    const getGenreById = (id) => {

        return genres.has(id) ? genres.get(id).name : null;
    }


    const convertToMap = (genreToConvert, callback) => {
        const newGenreMap = new Map();

        for (const genre of genreToConvert) {

            newGenreMap.set(genre.id, genre);
        }
        callback(newGenreMap);
    }

    return ({ fecthGenre, getGenreById, genres })

}


export default GenreManager;