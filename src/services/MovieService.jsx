
import { api_Key, url, language } from "../ContextFolder/Context"


export async function GetAllPlayingMovies(choosenPage) {

    try {
        const { page, results } = await GetAllWebRequest("/movie/now_playing", choosenPage)
        return ({ page, results })
    }
    catch (error) {

        throw new Error(error);
    }
}


export async function GetAllPopularMovies(choosenPage) {

    try {
        const { page, results } = await GetAllWebRequest("/movie/popular", choosenPage);
        return ({ page, results })
    }
    catch (error) {

        throw new Error(error);
    }
}

export async function GetAllTopRatedMovies(choosenPage) {

    try {
        const { page, results } = await GetAllWebRequest("/movie/top_rated", choosenPage);
        return ({ page, results })

    }
    catch (error) {
        throw new Error(error);

    }
}

async function GetAllWebRequest(endpoint, choosenPage) {

    try {
        const response = await fetch(`${url}${endpoint}?api_key=${api_Key}&page=${choosenPage}&language=${language}`);
        const data = await response.json();

        const page = data.page;
        const results = data.results;

        return ({ page, results })
    }
    catch (error) {

        throw new Error(error);
    }
}

export async function GetMovieById(id) {
    try {
        const response = await fetch(`${url}/movie/${id}?language=${language}&api_key=${api_Key}`)
        const result = await response.json();

        return (result)
    }
    catch (error) {
        throw new Error(error);
    }
}

export async function GetTrailerById(trailerId) {
    try {
        const response = await fetch(`${url}/movie/${trailerId}/videos?language=en-US&api_key=${api_Key}`)
        const data = await response.json();
        const results = data.results;
        return (results)
    }
    catch (error) {
        throw new Error(error);
    }
}


export async function GetSimilar(id, choosenPage) {
    try {
        const { page, results } = await GetAllWebRequest(`/movie/${id}/similar`, choosenPage);
        return ({ page, results })

    }
    catch (error) {
        throw new Error(error);

    }

}
