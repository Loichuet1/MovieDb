import { api_Key, url, language } from "../ContextFolder/Context"


export async function GetAllMovieGenre() {

    return GetAllWebRequest("/movie");
}


export async function GetAllSerieGenre() {

    return GetAllWebRequest("/tv")
}


export async function GetAllWebRequest(endpoint) {

    try {
        const response = await fetch(`${url}/genre${endpoint}/list?language=${language}&api_key=${api_Key}`)

        const data = await response.json();
        const genres = data.genres;

        return genres;

    } catch (error) {

    }


}