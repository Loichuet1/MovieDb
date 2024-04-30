import { useCallback, useState } from "react";
import { GetWatchList, PostFavorite, PostWatchList, GetFavorite } from "../services/AccountService"

function AccountManager() {

    const [watchListMovies, setWatchListMovies] = useState(new Map())
    const [watchListTV, setWatchListTV] = useState(new Map())

    const [favoriteMovies, setFavoriteMovies] = useState(new Map())
    const [favoriteTV, setFavoriteTV] = useState(new Map())

    // getWatchList for tv series
    const getWatchListTV = useCallback(() => {

        try {
            getWatchList("tv", setWatchListTV);
        }
        catch (error) {

            console.error(`error in getWatchListTV : ${error}`)
        }
    }, [])

    // getWatchList for movies
    const getWatchListMovies = useCallback(() => {

        try {
            getWatchList("movies", setWatchListMovies);
        }
        catch (error) {

            console.error(`error in getWatchListTV : ${error}`)
        }
    }, [])

    // generique getWatchList with type and useState set ass entries
    const getWatchList = useCallback(async (type, callbackSetMap) => {

        try {
            const totalWatchList = await GetWatchList(type)
            convertToMap(totalWatchList, callbackSetMap)
        }
        catch (error) {

            console.error(`error in getWatchList : ${error}`)
        }

    }, [])

    // add or remove from watchlist. Entries id to add bool remove or add mediaType which watchlist to ad too
    const addorRemoveFromWatchList = useCallback(async (id, bool, mediaType) => {

        try {
            await PostWatchList(id, bool, mediaType);

            //get the updated watchList
            await getWatchListTV();
            await getWatchListMovies();

        }
        catch (error) {

            console.error(`error in addorRemoveFromFavorite : ${error}`)
        }
    }, [])

    // add or remove from favorite. Entries id to add bool remove or add mediaType which favorite to ad too
    const addorRemoveFromFavorite = useCallback(async (id, bool, mediaType) => {

        try {
            await PostFavorite(id, bool, mediaType);


            //get the updated favorite list
            await getFavoriteTV();
            await getFavoriteMovies();
        }
        catch (error) {

            console.error(`error in addorRemoveFromFavorite : ${error}`)
        }
    }, [])

    const getFavoriteTV = useCallback(() => {

        try {
            getFavorite("tv", setFavoriteTV);
        }
        catch (error) {
            console.error(`error in ${this} : ${error}`)
        }
    }, [])

    const getFavoriteMovies = useCallback(() => {

        try {
            getFavorite("movies", setFavoriteMovies);
        }
        catch (error) {
            console.error(`error in ${this} : ${error}`)
        }
    }, [])


    const getFavorite = useCallback(async (type, callbackSetMap) => {

        try {
            const totalFavorite = await GetFavorite(type);
            convertToMap(totalFavorite, callbackSetMap)

        }
        catch (error) {
            console.error(`error in ${this} : ${error}`)
        }
    }, [])


    // convert return array to map
    const convertToMap = (moviesToConvert, callback) => {
        const newMovieMap = new Map();

        for (const movie of moviesToConvert) {

            newMovieMap.set(movie.id, movie);
        }
        callback(newMovieMap);
    }

    return ({ getWatchListMovies, getWatchListTV, getFavoriteMovies, getFavoriteTV, watchListMovies, watchListTV, favoriteTV, favoriteMovies, addorRemoveFromFavorite, addorRemoveFromWatchList });

}

export default AccountManager;