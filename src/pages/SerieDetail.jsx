import { SerieAndMovieManagerContext, AccountManagerContext, UtilsContext } from "../main";
import { useState, useContext, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import SerieSaison from "../components/SerieSaison";
import SimilarSection from "../components/SimilarSection";
import Serie from "../components/Serie";

import '../style/SerieDetailStyle.scss'

export default function SerieDetail({ }) {

    const { id } = useParams();

    const { utils } = useContext(UtilsContext);

    const { accountManager } = useContext(AccountManagerContext);
    const { watchListTV, favoriteTV, addorRemoveFromFavorite, addorRemoveFromWatchList } = accountManager;

    const { serieManager } = useContext(SerieAndMovieManagerContext);
    const { fecthSerieById, fecthSimilarSeries } = serieManager

    // state for the list of similar series
    const [similarSectionOpen, setSimilarSectionOpen] = useState(false);

    // current serie detail 
    const [currentSerieDetail, setCurrentSerieDetail] = useState(null)

    const [similarSeries, setSimilarSeries] = useState(new Map());

    const bodyRef = useRef(null);

    useEffect(() => {

        const fetchSerieDetail = async () => {

            if (id) {
                try {
                    const result = await fecthSerieById(id);
                    setCurrentSerieDetail(result);
                } catch (error) {
                    console.error('Error fetching serie detail:', error);
                }
            }
        };

        const fecthSimilar = async () => {
            if (id) {
                try {
                    const { page, results } = await fecthSimilarSeries(id, 1);
                    console.log(results);
                    setSimilarSeries(utils.convertToMap(results));

                } catch (error) {
                    console.error('Error fetching similar series:', error);
                }
            }
        };
        fecthSimilar();
        fetchSerieDetail();

        //  close similar section when id change
        setSimilarSectionOpen(false);

    }, [id])

    useLayoutEffect(() => {
        // Scroll to top on mount
        if (bodyRef.current) {
            bodyRef.current.scrollTo(0, 0);
        }
    }, [id, currentSerieDetail]);

    return (
        <div >
            {currentSerieDetail &&
                (
                    <div className="bodyDetail" >

                        <img src={`https://image.tmdb.org/t/p/original${currentSerieDetail.backdrop_path}`} alt={currentSerieDetail.backdrop_path} />
                        <div className="infoContainer" ref={bodyRef}>
                            <h2>{currentSerieDetail.name}</h2>

                            <div className="dateAndTimeSection">
                                <p>{utils.truncate(currentSerieDetail.first_air_date, 4)}</p>
                                <p>.</p>
                                <p>{`${currentSerieDetail.number_of_seasons} ${currentSerieDetail.number_of_seasons > 1 ? "Saisons" : "Saison"}`}</p>
                                <p>.</p>
                                <p>{`Pays : ${currentSerieDetail?.production_countries[0]?.name}`}</p>
                                <p>.</p>
                                <p style={{ color: "#90fe6c" }}>{currentSerieDetail.vote_average.toFixed(1) * 10} %</p>

                            </div>

                            <div className="genreSection">
                                {currentSerieDetail.genres.map(genre => (
                                    <div
                                        key={genre.id}
                                        className="genreContainer">
                                        <p>{genre.name}</p>
                                    </div>
                                ))}
                            </div>

                            <h1>{currentSerieDetail.overview}</h1>

                            {watchListTV?.has(currentSerieDetail.id) ?

                                <button onClick={() => addorRemoveFromWatchList(currentSerieDetail.id, false, "tv")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                    Retirer de ma liste
                                </button>

                                :
                                <button onClick={() => addorRemoveFromWatchList(currentSerieDetail.id, true, "tv")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Ajouter à ma liste
                                </button>
                            }

                            <button onClick={() => setSimilarSectionOpen(!similarSectionOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                Voir similaire
                            </button>
                            <h1>Saisons</h1>
                            <div className="SaisonSection">
                                {currentSerieDetail?.seasons.filter(s => s.episode_count > 0).map(saison => (
                                    <SerieSaison key={saison.id} saison={saison} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            {similarSectionOpen && (
                <SimilarSection items={similarSeries} title={"Films similaires"} ComponentToUse={Serie} />
            )}
        </div>
    );
}