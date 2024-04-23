
import BannerMovie from "../components/BannerMovie";
import DisplayMovie from "../components/MovieComponents";
import { useEffect } from "react";

import "../style/HomeSection.scss"


function Home({ managers }) {

    const { fetchCurrentMovies, currentMovies, fetchPopularMovies, popularMovies, fetchTopRatedMovies, topRatedMovies, loading } = managers.movieManager;


    useEffect(() => {
        fetchCurrentMovies(1);
        fetchPopularMovies(1);
        fetchTopRatedMovies(1);

    }, []);

    return (
        <div >
            <div className="homeFlexbox">

                <BannerMovie movies={currentMovies} genreManager={managers.genreManager} />

                <div>
                    <h2>Film du Moment</h2>
                    <div className="currentMovieSection" >
                        {Array.from(currentMovies.values()).map(item => (
                            <DisplayMovie key={item.id} movie={item} genreManager={managers.genreManager} />
                        ))}
                    </div>
                </div>
                <div>

                    <h2>Film recommandé</h2>
                    <div className="currentMovieSection" >
                        {Array.from(popularMovies.values()).map(item => (
                            <DisplayMovie key={item.id} movie={item} genreManager={managers.genreManager} />
                        ))}
                    </div>
                </div>
                <div>

                    <h2>Film les mieux notés</h2>
                    <div className="currentMovieSection" >
                        {Array.from(topRatedMovies.values()).map(item => (
                            <DisplayMovie key={item.id} movie={item} genreManager={managers.genreManager} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;