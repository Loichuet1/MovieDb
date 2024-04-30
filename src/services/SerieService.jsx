import { api_Key, url, language } from "../ContextFolder/Context"

export async function GetPopularSeries(choosenPage) {

    return GetAllSeriesWebRequest('/tv/popular', choosenPage);
}

export async function GetTopRatedSeries(choosenPage) {

    return GetAllSeriesWebRequest('/tv/top_rated', choosenPage);
}

async function GetAllSeriesWebRequest(endpoint, choosenPage) {
    try {
        const response = await fetch(`${url}${endpoint}?language=${language}&page=${choosenPage}&api_key=${api_Key}`);
        const data = await response.json();

        const page = data.page;
        const results = data.results;

        return { results, page };
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        throw error;
    }
}