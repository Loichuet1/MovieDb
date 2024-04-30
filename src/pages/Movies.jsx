
import { GenreManagerContext } from '../main';
import { useContext, useEffect, useState } from 'react';
import Trendingmovies from '../components/TrendingMovies';
import MovieByGenre from '../components/MovieByGenre';
import '../style/MoviesSectionStyle.scss'


function Movies() {

    const { genreManager } = useContext(GenreManagerContext);
    const { movieGenres } = genreManager;

    const [filteredGenres, setFilteredGenres] = useState([]);
    const [filterButtonsDisplayed, setFilterButtonsDisplayed] = useState(false);

    const manageFilter = (genre) => {

        const indexExist = filteredGenres.findIndex(g => g.id === genre.id);

        let updatedFilter = [...filteredGenres];

        // if do not exist add it
        if (indexExist === -1) {

            updatedFilter.push(genre);
        }
        // esle remove it
        else {

            updatedFilter.splice(indexExist, 1);
        }

        setFilteredGenres(updatedFilter);
    };

    // according to filteredGenres length display all genres or filteredGenres
    const mapToDisplay = () => {
        return filteredGenres.length === 0 ? Array.from(movieGenres.values()) : filteredGenres;
    }

    useEffect(() => {
        // scroll back to top on mount
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='movieSectionBody'>
            <Trendingmovies />

            <div className='filterTitle'>

                <h2>Filtre par genres</h2>
                <svg onClick={() => setFilterButtonsDisplayed(!filterButtonsDisplayed)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </div>
            {filterButtonsDisplayed && (
                <div className='filterButtonSection'>

                    {Array.from(movieGenres.values()).map(genre => (
                        <button className={filteredGenres.find(g => g.id === genre.id) ? "selectedButton" : "button"} onClick={() => manageFilter(genre)} key={genre.id}>{genre.name}</button>
                    ))}
                </div>)}

            <div className='bodyGenresMovies'>
                {mapToDisplay().map(genre => (
                    <MovieByGenre key={genre.id} genre={genre} />
                ))}
            </div>
        </div>
    );
}

export default Movies;