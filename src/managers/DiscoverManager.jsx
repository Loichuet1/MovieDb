// manage Discover Part of movie DB api
import { useCallback } from "react";
import { GetDiscoverMovies, GetDiscoverSeries } from "../services/DiscoverService"
import { utils } from "../utils/Utils";

function DiscoverManager() {

    const discoverMovies = useCallback(async (filterType, filterValue, choosenPage) => {

        try {
            const { page, results } = await GetDiscoverMovies(filterType, filterValue, choosenPage)
            const convertedArray = utils.convertToMap(results);

            return ({ page, convertedArray });
        }
        catch (error) {

            console.error(`An error did occur in ${this} : ${error}`)
        }

    }, [])

    const discoverSeries = useCallback(async (filterType, filterValue, choosenPage) => {

        try {
            const { page, results } = await GetDiscoverSeries(filterType, filterValue, choosenPage)
            const convertedArray = utils.convertToMap(results);

            return ({ page, convertedArray });

        } catch (error) {
            console.error(`An error did occur in ${this} : ${error}`)

        }
    }, [])

    return ({ discoverMovies, discoverSeries })
}

export default DiscoverManager;