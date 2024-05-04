import { useEffect, useState } from "react";
import TrendingMovie from "./TrendingMovie";

function TrendingMovies_Series({ discoverItemsCallback, title }) {

    // sort type and value
    const filterType = "sort_by";
    const filterValue = "popularity.desc";

    // trendingMovies state
    const [trendingMovies, setTrendingMovies] = useState([]);
    //index of movie to display
    const [indexMovieToDisplay, setIndexMovieToDisplay] = useState([0, 5])

    useEffect(() => {

        // fecth discoverMovie with sort type and value when component mount
        const fecthTrendingMovies = async () => {
            const { convertedArray } = await discoverItemsCallback(filterType, filterValue, 1);

            setTrendingMovies(Array.from(convertedArray.values()));
        }
        fecthTrendingMovies();

        const interval = setInterval(() => {
            rotateMovieToDisplay();
        }, 10000);

        return () => {
            clearInterval(interval);
        };

    }, [])

    const rotateMovieToDisplay = () => {

        setIndexMovieToDisplay(prev => {
            const newIndexStart = prev[0] += 5;
            const newIndexEnd = prev[1] += 5;
            return [newIndexEnd > 20 ? 0 : newIndexStart, newIndexEnd > 20 ? 5 : newIndexEnd];
        });
    };

    const getMovieToDisplay = () => {
        const movieToDisplay = [...trendingMovies];
        return movieToDisplay.slice(indexMovieToDisplay[0], indexMovieToDisplay[1])
    }

    return (
        <div className="trendingMovies">
            <h2>{title}</h2>
            <div className="movieSection">
                {getMovieToDisplay().map(movie => (
                    <TrendingMovie key={movie.id} movie={movie} index={trendingMovies.findIndex(m => m.id == movie.id) + 1} />
                ))}
            </div>
        </div>
    )
}

export default TrendingMovies_Series;