import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { UtilsContext } from '../main';
import { AccountManagerContext } from '../main';
import DisplayMovie from "../components/MovieComponents";

import SimilarSection from "../components/SimilarSection"

import '../style/MovieDetailStyle.scss'

function MovieDetail({ movieManager }) {

    const { id } = useParams();
    const { utils } = useContext(UtilsContext);

    //account Manager
    const { accountManager } = useContext(AccountManagerContext);
    const { watchListMovies, addorRemoveFromFavorite, addorRemoveFromWatchList } = accountManager;

    const [similarSectionOpen, setSimilarSectionOpen] = useState(false);

    const [currentMovieDetail, setCurrentMovieDetail] = useState(null);
    const [trailer, setTrailer] = useState(null);

    const [similarMovies, setSimilarMovies] = useState(new Map());


    useEffect(() => {

        const fetchMovie = async () => {
            if (id) {
                try {
                    const movieDetails = await movieManager.fetchMovieById(id);
                    setCurrentMovieDetail(movieDetails);
                } catch (error) {
                    console.error('Error fetching movie:', error);
                }
            }
        };

        const fetchTrailer = async () => {
            if (id) {
                try {
                    const movieTrailer = await movieManager.fetchTrailerById(id);
                    setTrailer(movieTrailer);
                } catch (error) {
                    console.error('Error fetching movie trailer:', error);
                }
            }
        };

        const fecthSimilarMovies = async () => {
            if (id) {
                try {
                    const { page, results } = await movieManager.fecthSimilar(id, 1);
                    setSimilarMovies(utils.convertToMap(results));
                } catch (error) {
                    console.error('Error fetching similar movies:', error);
                }
            }
        };

        fecthSimilarMovies();
        fetchMovie();
        fetchTrailer();

    }, [id]);

    useEffect(() => {
        setSimilarSectionOpen(false);
    }, [id])

    const openYouTubeLink = () => {
        const url = trailer?.key ? `https://www.youtube.com/watch?v=${trailer.key}` : 'https://www.youtube.com';
        window.open(url, '_blank');
    };

    return (
        <div>
            {currentMovieDetail &&
                (
                    <div className="bodyDetail">

                        <img src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} alt={currentMovieDetail.backdrop_path} />
                        <div className="infoContainer">
                            <h2>{currentMovieDetail.title}</h2>

                            <div className="dateAndTimeSection">
                                <p>{utils.truncate(currentMovieDetail.release_date, 4)}</p>
                                <p>.</p>
                                <p>{`Durée : ${utils.convertTime(currentMovieDetail.runtime)}`}</p>
                                <p>.</p>
                                <p>{`Pays : ${currentMovieDetail?.production_countries[0]?.name}`}</p>
                                <p>.</p>
                                <p style={{ color: "#90fe6c" }}>{currentMovieDetail.vote_average.toFixed(1) * 10} %</p>

                            </div>

                            <div className="genreSection">
                                {currentMovieDetail.genres.map(genre => (
                                    <div
                                        key={genre.id}
                                        className="genreContainer">
                                        <p>{genre.name}</p>
                                    </div>
                                ))}
                            </div>

                            <h1>{currentMovieDetail.overview}</h1>

                            <button onClick={openYouTubeLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                </svg>
                                Regarder la bande annonce
                            </button>

                            {watchListMovies?.has(currentMovieDetail.id) ?

                                <button onClick={() => addorRemoveFromWatchList(currentMovieDetail.id, false, "movie")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                    Retirer de ma liste
                                </button>

                                :
                                <button onClick={() => addorRemoveFromWatchList(currentMovieDetail.id, true, "movie")}>
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
                        </div>
                    </div>
                )}

            {similarSectionOpen && (
                <SimilarSection items={similarMovies} title={"Films similaires"} ComponentToUse={DisplayMovie} />
            )}
        </div>
    );
}

export default MovieDetail;