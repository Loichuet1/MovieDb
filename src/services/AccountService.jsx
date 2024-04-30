import { api_Key, url, language, accountId, Authorization } from "../ContextFolder/Context"


export async function GetWatchList(type) {

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
        const { results, totalPages } = await WatchlistRequestPerPage(1, type, options);

        // copy results array into return array
        totalWatchList = [...results];

        // // Loop for each pages and add result to totalWatchList
        for (let i = 2; i <= totalPages; i++) {

            const { results } = await WatchlistRequestPerPage(i, type, options);
            totalWatchList = [...totalWatchList, ...results];

        }
        return (totalWatchList)
    }
    catch (error) {

        console.error(`error in GetWatchList : ${error}`)
    }
}


async function WatchlistRequestPerPage(choosenPage, type, options) {
    try {

        console.log(choosenPage, type, options)

        const response = await fetch(`${url}/account/${accountId}/watchlist/${type}?language=${language}&page=${choosenPage}&sort_by=created_at.asc&api_key=${api_Key}`, options)
        const data = await response.json();

        const results = data.results;
        const totalPages = data.total_pages;

        return ({ results, totalPages })
    }
    catch (error) {

        console.error(`error in test : ${error}`)
    }
}

export async function GetFavorite(type) {

    try {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: Authorization
            }
        };

        // init an array that will contains all the results of the api
        let totalFavorite = [];

        // call WatchListRequestPerPage with first page and get page, results, totalPages, totalPages will be used to iterate over the number of pages
        const { results, totalPages } = await FavoriteRequestPerPage(1, type, options);

        // copy results array into return array
        totalFavorite = [...results];

        // // Loop for each pages and add result to totalWatchList
        for (let i = 2; i <= totalPages; i++) {

            const { results } = await FavoriteRequestPerPage(i, type, options);
            totalFavorite = [...totalFavorite, ...results];

        }
        return (totalFavorite)
    }
    catch (error) {

        console.error(`error in GetWatchList : ${error}`)
    }
}

async function FavoriteRequestPerPage(choosenPage, type, options) {
    try {

        console.log(choosenPage, type, options)

        const response = await fetch(`${url}/account/${accountId}/favorite/${type}?language=${language}&page=${choosenPage}&sort_by=created_at.asc&api_key=${api_Key}`, options)
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

    console.info(id, bool, mediaType);

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