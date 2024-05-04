import { api_Key, url, language } from "../ContextFolder/Context"

export async function GetDiscoverMovies(filterType, filterValue, chosenPage) {

    return await GetDiscoverItems(filterType, filterValue, chosenPage, "/movie")
}

export async function GetDiscoverSeries(filterType, filterValue, chosenPage) {

    return await GetDiscoverItems(filterType, filterValue, chosenPage, "/tv")
}

async function GetDiscoverItems(filterType, filterValue, chosenPage, endpoint) {

    try {

        if (!filterType || !filterValue || isNaN(chosenPage)) {
            throw new Error("Invalid parameters provided.");
        }

        const response = await fetch(`${url}/discover${endpoint}?language=${language}&page=${chosenPage}&${filterType}=${filterValue}&api_key=${api_Key}`)
        const data = await response.json();

        const page = data.page;
        const results = data.results;

        return ({ page, results })

    } catch (error) {
        console.error(`An error occurred in GetDiscoverItems: ${error}`);
        throw error;
    }
}
