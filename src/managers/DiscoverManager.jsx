// manage Discover Part of movie DB api
import { useCallback } from "react";
import { GetDiscoverMovies } from "../services/DiscoverService"

function DiscoverManager() {


    const discoverMovies = useCallback(async (filterType, filterValue, choosenPage) => {

        try {
            const { page, results } = await GetDiscoverMovies(filterType, filterValue, choosenPage)
            return ({ page, results });

        }
        catch (error) {

            console.error(`An error did occur in ${this} : ${error}`)
        }

    }, [])


    return ({ discoverMovies })

}

export default DiscoverManager;