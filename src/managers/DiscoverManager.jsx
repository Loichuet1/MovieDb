// manage Discover Part of movie DB api
import { useCallback } from "react";
import { GetDiscoverMovies } from "../services/DiscoverService"

function DiscoverManager() {

    const discoverMovies = useCallback(async (filterType, filterValue, choosenPage) => {

        try {
            const { page, results } = await GetDiscoverMovies(filterType, filterValue, choosenPage)
            const convertedArray = convertToMap(results);

            return ({ page, convertedArray });
        }
        catch (error) {

            console.error(`An error did occur in ${this} : ${error}`)
        }

    }, [])

    const convertToMap = (moviesToConvert) => {
        const newMovieMap = new Map();

        for (const movie of moviesToConvert) {

            newMovieMap.set(movie.id, movie);
        }
        return newMovieMap;
    }

    return ({ discoverMovies })
}

export default DiscoverManager;