import { api_Key, url, language } from "../ContextFolder/Context"


export async function GetAllGenre() {

    const response = await fetch(`${url}/genre/movie/list?language=${language}&api_key=${api_Key}`)
    const data = await response.json();

    const genres = data.genres;

    return genres;


}