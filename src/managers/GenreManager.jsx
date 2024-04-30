import { useCallback, useState } from "react";
import { GetAllMovieGenre, GetAllSerieGenre } from "../services/GenreService";

function GenreManager() {

    const [movieGenres, setMovieGenres] = useState(new Map())
    const [serieGenres, setSerieGenres] = useState(new Map())

    const fecthMovieGenres = useCallback(async () => {

        try {
            const genres = await GetAllMovieGenre();
            convertToMap(genres, setMovieGenres);
        }
        catch (error) {
            console.error(`An error did occur in ${this} : ${error}`)
        }
    })

    const fecthSerieGenres = useCallback(async () => {

        try {
            const genres = await GetAllSerieGenre();
            convertToMap(genres, setSerieGenres);
        }
        catch (error) {
            console.error(`An error did occur in ${this} : ${error}`)
        }
    })

    const getMovieGenreById = (id) => {

        return movieGenres.has(id) ? movieGenres.get(id).name : null;
    }

    const getSerieGenreById = (id) => {

        return serieGenres.has(id) ? serieGenres.get(id).name : null;
    }

    const convertToMap = (genreToConvert, callback) => {
        const newGenreMap = new Map();

        for (const genre of genreToConvert) {

            newGenreMap.set(genre.id, genre);
        }
        callback(newGenreMap);
    }

    return ({ fecthMovieGenres, fecthSerieGenres, getSerieGenreById, getMovieGenreById, movieGenres, serieGenres })
}


export default GenreManager;