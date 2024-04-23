
import { api_Key, url } from "../ContextFolder/Context"


export async function GetAllPlayingMovies(choosenPage) {

    try {
        const { page, results } = await WebRequest("/movie/now_playing", choosenPage)
        return ({ page, results })
    }
    catch (error) {

        throw new Error(error);
    }
}


export async function GetAllPopularMovies(choosenPage) {

    try {
        const { page, results } = await WebRequest("/movie/popular", choosenPage);
        return ({ page, results })
    }
    catch (error) {

        throw new Error(error);
    }
}

export async function GetAllTopRatedMovies(choosenPage) {

    try {
        const { page, results } = await WebRequest("/movie/top_rated", choosenPage);
        return ({ page, results })

    }
    catch (error) {
        throw new Error(error);

    }
}


async function WebRequest(endpoint, choosenPage) {

    try {
        const response = await fetch(`${url}${endpoint}?api_key=${api_Key}&page=${choosenPage}`);
        const data = await response.json();

        const page = data.page;
        const results = data.results;

        return ({ page, results })
    }
    catch (error) {

        throw new Error(error);
    }
}