import { api_Key, url, language, accountId, Authorization } from "../ContextFolder/Context"


export async function GetWatchList() {

    try {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: Authorization
            }
        };

        // init an array that will contains all the results of the api
        let totalWatchList = [];

        // call WatchListRequestPerPage with first page and get page, results, totalPages, totalPages will be used to iterate over the number of pages
        const { results, totalPages } = await WatchListRequestPerPage(1, options);

        // copy results array into return array
        totalWatchList = [...results];

        // // Loop for each pages and add result to totalWatchList
        for (let i = 2; i <= totalPages; i++) {

            const { results } = await WatchListRequestPerPage(i, options);
            totalWatchList = [...totalWatchList, ...results];

        }
        return (totalWatchList)
    }
    catch (error) {

        console.error(`error in GetWatchList : ${error}`)
    }
}


async function WatchListRequestPerPage(choosenPage, options) {
    try {

        const response = await fetch(`${url}/account/${accountId}/watchlist/movies?language=${language}&page=${choosenPage}&sort_by=created_at.asc&api_key=${api_Key}`, options)
        const data = await response.json();

        const results = data.results;
        const totalPages = data.total_pages;

        return ({ results, totalPages })
    }
    catch (error) {

        console.error(`error in test : ${error}`)
    }

}

export async function PostFavorite(id, bool, mediaType) {

    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: Authorization
            },
            body: JSON.stringify({ media_type: mediaType, media_id: id, favorite: bool })
        };


        const response = await fetch(`${url}/account/${accountId}/favorite`, options);
        const data = await response.json();
    }

    catch (error) {
        console.error(`error in PostFavorite : ${error}`)
    }
}

export async function PostWatchList(id, bool, mediaType) {

    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: Authorization
            },
            body: JSON.stringify({ media_type: mediaType, media_id: id, watchlist: bool })
        };

        const response = await fetch(`${url}/account/${accountId}/watchlist`, options);
        const data = await response.json();
    }

    catch (error) {
        console.error(`error in PostWatchList : ${error}`)
    }
}