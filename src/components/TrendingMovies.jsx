import { useContext, useEffect, useState } from "react";
import { DiscoverManagerContext } from '../main';
import TrendingMovie from "./TrendingMovie";

function Trendingmovies() {

    // sort type and value
    const filterType = "sort_by";
    const filterValue = "popularity.desc";

    // context
    const { discovermanager } = useContext(DiscoverManagerContext);
    const { discoverMovies } = discovermanager;

    // trendingMovies state
    const [trendingMovies, setTrendingMovies] = useState([]);
    //index of movie to display
    const [indexMovieToDisplay, setIndexMovieToDisplay] = useState([0, 5])

    useEffect(() => {

        // fecth discoverMovie with sort type and value when component mount
        const fecthTrendingMovies = async () => {
            const { page, convertedArray } = await discovermanager?.discoverMovies(filterType, filterValue, 1);

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
            <h2>Top 20 film du moment</h2>
            <div className="movieSection">
                {getMovieToDisplay().map(movie => (
                    <TrendingMovie key={movie.id} movie={movie} index={trendingMovies.findIndex(m => m.id == movie.id) + 1} />
                ))}
            </div>
        </div>
    )
}

export default Trendingmovies;