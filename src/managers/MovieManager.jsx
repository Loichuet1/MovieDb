import { useState, useCallback, useEffect } from "react";
import { GetAllPlayingMovies, GetAllPopularMovies, GetAllTopRatedMovies } from "../services/MovieService"


function MovieManager() {

    const [currentMovies, setCurrentMovies] = useState(new Map());
    const [pageCurrentMovies, setPageCurrentMovies] = useState([]);

    const [popularMovies, setPopularMovies] = useState(new Map());
    const [pagePopularMovies, setPagePopularMovies] = useState([]);


    const [topRatedMovies, setTopRatedMovies] = useState(new Map());
    const [pagetopRatedMovies, setPagetopRatedMovies] = useState([]);

    const [loading, setloading] = useState(false);


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


    const convertToMap = (moviesToConvert, callback) => {
        const newMovieMap = new Map();

        for (const movie of moviesToConvert) {

            newMovieMap.set(movie.id, movie);
        }
        callback(newMovieMap);
    }

    return ({ fetchCurrentMovies, currentMovies, fetchPopularMovies, popularMovies, fetchTopRatedMovies, topRatedMovies, loading });
}

export default MovieManager;