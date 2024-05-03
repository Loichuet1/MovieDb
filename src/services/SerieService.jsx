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
        console.error(`An error occurred: ${error} in ${this}`);
        throw error;
    }
}


export async function GetSerieById(id) {

    try {

        const response = await fetch(`${url}/tv/${id}?language=${language}&api_key=${api_Key}`)
        const result = await response.json();

        return result;

    } catch (error) {
        console.error(`An error occurred: ${error} in ${this}`);
        throw error;
    }
}

export async function GetSimilarSeries(id, choosenPage) {
    try {
        const { page, results } = await GetAllSeriesWebRequest(`/tv/${id}/similar`, choosenPage);
        return ({ page, results })
    }
    catch (error) {
        throw new Error(error);
    }
}