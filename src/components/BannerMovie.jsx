import { useEffect, useState } from "react";


function BannerMovie({ movies, genreManager }) {


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
            //console.log(currentIndex);
            const valuesArray = Array.from(movies.values());

            if (currentIndex >= valuesArray.length) {
                // Reset to the first item if currentIndex exceeds the length of the array
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

    const truncate = (string, n) => {
        return string.slice(0, n);
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
                            <h1>{truncate(bannerMovie.release_date, 4)}</h1>

                        </div>
                        <div className="descriptionSection">{bannerMovie.overview}</div>
                        <div className="genreSection">
                            {bannerMovie.genre_ids.map(genreId => (

                                <div key={genreId}
                                    className="block">
                                    <div
                                        className="genre">
                                        {genreManager.getGenreById(genreId)}
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
