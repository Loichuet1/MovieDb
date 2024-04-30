import { useEffect, useState, useContext } from "react";
import { UtilsContext } from '../main';
import { GenreManagerContext } from '../main';

function BannerMovie({ movies }) {

    const { utils } = useContext(UtilsContext);
    const { genreManager } = useContext(GenreManagerContext);

    const [bannerMovie, setBannerMovie] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        // init banner movie
        setBannerMovie(movies.values().next().value);

        const interval = setInterval(() => {
            rotateBannerMovie();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [movies]);

    useEffect(() => {

        if (movies && movies.size > 0) {
            const valuesArray = Array.from(movies.values());

            if (currentIndex >= valuesArray.length) {
                setCurrentIndex(0);
            }

            setBannerMovie(valuesArray[currentIndex]);
        }

    }, [currentIndex])


    const rotateBannerMovie = () => {

        if (movies && movies.size > 0) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    return (
        <div className="banner">
            {bannerMovie && (
                <div>
                    <img src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`} alt={`BannerImage${bannerMovie}`} />
                    <div className="infoContainer">

                        <h2>{bannerMovie.title}</h2>
                        <div className="infoFlexbox">
                            <h1 style={{ color: "#90fe6c" }}>{bannerMovie.vote_average.toFixed(1) * 10} %</h1>
                            <h1>{utils.truncate(bannerMovie.release_date, 4)}</h1>

                        </div>
                        <div className="descriptionSection">{bannerMovie.overview}</div>
                        <div className="genreSection">
                            {bannerMovie.genre_ids.map(genreId => (

                                <div key={genreId}
                                    className="block">
                                    <div
                                        className="genre">
                                        {genreManager.getMovieGenreById(genreId)}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BannerMovie;
