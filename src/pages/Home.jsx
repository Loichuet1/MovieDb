
import BannerMovie from "../components/BannerMovie";
import DisplayMovie from "../components/MovieComponents";
import Serie from "../components/Serie";
import Serie_MovieSection from "../components/Serie_MovieSection";
import { useEffect, useContext } from "react";
import { SerieAndMovieManagerContext } from "../main"
import { AccountManagerContext } from "../main";
import "../style/HomeSection.scss"


function Home({ }) {

    const itemPerPage = 5;

    const { serieManager, movieManager } = useContext(SerieAndMovieManagerContext);
    const { accountManager } = useContext(AccountManagerContext);

    const { fetchCurrentMovies, currentMovies, fetchPopularMovies, popularMovies, fetchTopRatedMovies, topRatedMovies, loading } = movieManager;
    const { fetchPopularSeries, popularSeries, fetchTopRatedSeries, topRatedSeries } = serieManager;
    const { watchListMovies, watchListTV } = accountManager;

    useEffect(() => {

        // fetch Movies
        fetchCurrentMovies(1);
        fetchPopularMovies(1);
        fetchTopRatedMovies(1);

        // fetch Series
        fetchPopularSeries();
        fetchTopRatedSeries();

        window.scrollTo(0, 0)

    }, []);

    return (
        <div >
            <div className="homeFlexbox">

                <BannerMovie movies={currentMovies} />

                <div className="sectionsHome">

                    {watchListMovies.size >= itemPerPage && (< Serie_MovieSection items={watchListMovies} ComponentToUse={DisplayMovie} itemPerPage={itemPerPage} title={"Ma liste de Films"} />)}
                    {watchListTV.size >= itemPerPage && (< Serie_MovieSection items={watchListTV} ComponentToUse={Serie} itemPerPage={itemPerPage} title={"Ma liste de Séries"} />)}

                    < Serie_MovieSection items={currentMovies} ComponentToUse={DisplayMovie} itemPerPage={itemPerPage} title={"Films du moment"} />
                    < Serie_MovieSection items={topRatedSeries} ComponentToUse={Serie} itemPerPage={itemPerPage} title={"Séries les mieux notées"} />
                    < Serie_MovieSection items={popularMovies} ComponentToUse={DisplayMovie} itemPerPage={itemPerPage} title={"Films populaires"} />
                    < Serie_MovieSection items={topRatedMovies} ComponentToUse={DisplayMovie} itemPerPage={itemPerPage} title={"Films les mieux notées"} />
                    < Serie_MovieSection items={popularSeries} ComponentToUse={Serie} itemPerPage={itemPerPage} title={"Séries populaires"} />

                </div>
            </div>
        </div>
    );
}

export default Home;