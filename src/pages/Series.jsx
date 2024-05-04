
import { GenreManagerContext } from '../main';
import { DiscoverManagerContext } from "../main";
import { useContext, useEffect } from 'react';
import TrendingMovies_Series from '../components/TrendingMovies';
import Serie_MovieSectionWithApi from "../components/Serie_MovieSectionWithApi";
import Serie from '../components/Serie';
import FilterManager from '../managers/FilterManager';

function Series() {

    const { discovermanager } = useContext(DiscoverManagerContext);
    const { discoverSeries } = discovermanager;

    const { genreManager } = useContext(GenreManagerContext);
    const { serieGenres } = genreManager;

    const { filterButtonsDisplayed, setFilterButtonsDisplayed, filteredGenres, mapToDisplay, manageFilter } = FilterManager(serieGenres);

    useEffect(() => {
        // scroll back to top on mount
        window.scrollTo(0, 0)
    }, [])


    return (
        <div>
            <div className='movieSectionBody'>
                <TrendingMovies_Series discoverItemsCallback={discoverSeries} title={"Séries populaires du moment"} />

                <div className='filterTitle'>

                    <h2>Filtre par genres</h2>
                    <svg onClick={() => setFilterButtonsDisplayed(!filterButtonsDisplayed)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </div>
                {filterButtonsDisplayed && (
                    <div className='filterButtonSection'>

                        {Array.from(serieGenres.values()).map(genre => (
                            <button className={filteredGenres.find(g => g.id === genre.id) ? "selectedButton" : "button"} onClick={() => manageFilter(genre)} key={genre.id}>{genre.name}</button>
                        ))}
                    </div>)}

                <div className='bodyGenresMovies'>
                    {mapToDisplay().map(genre => (
                        <Serie_MovieSectionWithApi key={genre.id} genre={genre} ComponentToUse={Serie} discoverItemsCallback={discoverSeries} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Series;