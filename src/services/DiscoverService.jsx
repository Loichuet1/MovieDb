import { api_Key, url, language } from "../ContextFolder/Context"

export async function GetDiscoverMovies(filterType, filterValue, choosenPage) {

    try {
        const response = await fetch(`${url}/discover/movie?language=${language}&page=${choosenPage}&${filterType}=${filterValue}&api_key=${api_Key}`)
        const data = await response.json();

        const page = data.page;
        const results = data.results;

        return ({ page, results })

    } catch (error) {
        console.error(`An erro dis occur in ${this} : ${error}`)
    }
}
