import { useCallback, useState } from "react";
import { GetWatchList, PostFavorite, PostWatchList } from "../services/AccountService"

function AccountManager() {


    const [watchList, setWatchList] = useState(new Map())

    const getWatchList = useCallback(async () => {

        try {
            const totalWatchList = await GetWatchList()
            convertToMap(totalWatchList, setWatchList)
        }
        catch (error) {

            console.error(`error in getWatchList : ${error}`)
        }
    }, [])

    const addorRemoveFromFavorite = useCallback(async (id, bool, mediaType) => {

        try {
            await PostFavorite(id, bool, mediaType)
        }
        catch (error) {

            console.error(`error in addorRemoveFromFavorite : ${error}`)
        }
    }, [])


    const addorRemoveFromWatchList = useCallback(async (id, bool, mediaType) => {

        try {
            await PostWatchList(id, bool, mediaType);

            //get the updated watchList
            await getWatchList(1);
        }
        catch (error) {

            console.error(`error in addorRemoveFromFavorite : ${error}`)
        }
    }, [])

    const convertToMap = (moviesToConvert, callback) => {
        const newMovieMap = new Map();

        for (const movie of moviesToConvert) {

            newMovieMap.set(movie.id, movie);
        }
        callback(newMovieMap);
    }

    return ({ getWatchList, watchList, addorRemoveFromFavorite, addorRemoveFromWatchList });

}

export default AccountManager;