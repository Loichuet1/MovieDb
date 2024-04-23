import { api_Key, url } from "../ContextFolder/Context"


export async function GetAllGenre() {

    const response = await fetch(`${url}/genre/movie/list?language=fr&api_key=${api_Key}`)
    const data = await response.json();

    const genres = data.genres;

    return genres;


}