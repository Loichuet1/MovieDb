import { useCallback, useState } from "react";
import { GetAllGenre } from "../services/GenreService";

function GenreManager() {

    const [genre, setGenre] = useState(new Map())


    const fecthGenre = useCallback(async () => {

        try {
            const genre = await GetAllGenre();
            convertToMap(genre, setGenre);
        }
        catch {

        }
    })

    const getGenreById = (id) => {

        return genre.has(id) ? genre.get(id) : null;
    }


    const convertToMap = (genreToConvert, callback) => {
        const newGenreMap = new Map();

        for (const genre of genreToConvert) {

            newGenreMap.set(genre.id, genre.name);
        }
        callback(newGenreMap);
    }

    return ({ fecthGenre, getGenreById })

}


export default GenreManager;