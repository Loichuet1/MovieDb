import { useState, useCallback } from "react";
import { GetAllPlayingMovies, GetAllPopularMovies, GetAllTopRatedMovies, GetMovieById, GetTrailerById, GetSimilar } from "../services/MovieService"


function MovieManager() {

    const [currentMovies, setCurrentMovies] = useState(new Map());
    const [pageCurrentMovies, setPageCurrentMovies] = useState([]);

    const [popularMovies, setPopularMovies] = useState(new Map());
    const [pagePopularMovies, setPagePopularMovies] = useState([]);

    const [topRatedMovies, setTopRatedMovies] = useState(new Map());
    const [pagetopRatedMovies, setPagetopRatedMovies] = useState([]);

    const [loading, setloading] = useState(false);

    // map of detail movies
    const [detailMovies, setDetailMovies] = useState(new Map());


    const fetchCurrentMovies = useCallback(async (page) => {

        try {
            setloading(true);
            let responsePage, movies;

            ({ page: responsePage, results: movies } = await GetAllPlayingMovies(page));

            convertToMap(movies, setCurrentMovies);
            setPageCurrentMovies(responsePage);
            setloading(false);
        }
        catch (error) {
            setloading(false);
            console.error(error)
        }
    }, [pageCurrentMovies]);


    const fetchPopularMovies = useCallback(async (page) => {

        try {
            setloading(true);
            let responsePage, movies;

            ({ page: responsePage, results: movies } = await GetAllPopularMovies(page));

            convertToMap(movies, setPopularMovies);
            setPagePopularMovies(responsePage);
            setloading(false);

        }
        catch (error) {
            setloading(false);
            console.error(error)
        }
    }, [pagePopularMovies]);

    const fetchTopRatedMovies = useCallback(async (page) => {

        try {
            setloading(true);
            let responsePage, movies;

            ({ page: responsePage, results: movies } = await GetAllTopRatedMovies(page));

            convertToMap(movies, setTopRatedMovies);
            setPagetopRatedMovies(responsePage);
            setloading(false);

        }
        catch {
            setloading(false);
            console.error(error)
        }
    }, [pagetopRatedMovies])

    const fetchMovieById = useCallback(async (id) => {

        try {
            setloading(true);

            if (detailMovies.has(Number(id))) {
                return detailMovies.get(Number(id));
            }
            else {

                const result = await GetMovieById(id);
                const resultMap = new Map(detailMovies);
                resultMap.set(result.id, result);

                setDetailMovies(resultMap);
                return result;
            }
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setloading(false);
        }
    }, [detailMovies])


    const fetchTrailerById = useCallback(async (trailerId) => {

        try {
            setloading(true);

            const results = await GetTrailerById(trailerId);
            const firstTrailer = results.find(video => video.type === "Trailer")
            return firstTrailer;
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setloading(false);
        }
    }, [])

    const fecthSimilar = useCallback(async (id, page) => {
        try {
            setloading(true);

            let responsePage, similarMovies;

            ({ page: responsePage, results: similarMovies } = await GetSimilar(id, page));

            return ({ responsePage, similarMovies });
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setloading(false);
        }
    })


    const convertToMap = (moviesToConvert, callback) => {
        const newMovieMap = new Map();

        for (const movie of moviesToConvert) {

            newMovieMap.set(movie.id, movie);
        }
        callback(newMovieMap);
    }

    return ({ fetchCurrentMovies, currentMovies, fetchPopularMovies, popularMovies, fetchTopRatedMovies, topRatedMovies, fetchMovieById, fetchTrailerById, fecthSimilar, loading });
}

export default MovieManager;