
import { GenreManagerContext } from '../main';
import { useContext } from 'react';
import Trendingmovies from '../components/TrendingMovies';
import MovieByGenre from '../components/MovieByGenre';
import '../style/MoviesSectionStyle.scss'


function Movies() {

    const { genreManager } = useContext(GenreManagerContext);
    const { genres } = genreManager;

    return (
        <div className='movieSectionBody'>
            <Trendingmovies />
            <div className='bodyGenresMovies'>
                {Array.from(genres.values()).map(genre => (
                    <MovieByGenre key={genre.id} genre={genre} />
                ))}

            </div>
        </div>
    );
}

export default Movies;