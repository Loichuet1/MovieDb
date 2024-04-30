import { useCallback, useState } from "react";
import { GetPopularSeries, GetTopRatedSeries } from "../services/SerieService"


function SerieManager() {

    const [popularSeries, setPopularSeries] = useState(new Map())
    const [popularSeriesPage, setPopularSeriesPage] = useState(1)

    const [topRatedSeries, setTopRatedSeries] = useState(new Map())
    const [topRatedSeriesPage, setTopRatedSeriesPage] = useState(1)

    const fetchPopularSeries = useCallback(async () => {

        try {

            const { results, page } = await GetPopularSeries(popularSeriesPage);
            convertToMap(results, setPopularSeries)
            setPopularSeriesPage(page);

        } catch (error) {
            console.error(`An error did occur in ${this} : ${error}`)
        }

    }, [])


    const fetchTopRatedSeries = useCallback(async () => {

        try {

            const { results, page } = await GetTopRatedSeries(topRatedSeriesPage);
            convertToMap(results, setTopRatedSeries)
            setTopRatedSeriesPage(page);

        } catch (error) {
            console.error(`An error did occur in ${this} : ${error}`)
        }

    }, [])


    const convertToMap = (moviesToConvert, callback) => {
        const newMovieMap = new Map();

        for (const movie of moviesToConvert) {

            newMovieMap.set(movie.id, movie);
        }
        callback(newMovieMap);
    }

    return ({ fetchPopularSeries, popularSeries, fetchTopRatedSeries, topRatedSeries })

}

export default SerieManager;