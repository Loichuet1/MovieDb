import { useContext, useEffect, useState, useRef } from "react";
import { DiscoverManagerContext } from "../main";
import DisplayMovie from "./MovieComponents";


function MovieByGenre({ genre }) {

    const filterType = "with_genres";
    const filterValue = genre.id;

    const { discovermanager } = useContext(DiscoverManagerContext);
    const { discoverMovies } = discovermanager;

    const [currentPage, setCurrentPage] = useState(1)
    const [movieByGenre, setMovieByGenre] = useState([])

    const movieByGenreContainerRef = useRef(null);

    useEffect(() => {

        const fecthMovieByGenre = async () => {

            const { page, results } = await discoverMovies(filterType, filterValue, currentPage);
            setMovieByGenre(results);
            setCurrentPage(page);
        }

        fecthMovieByGenre();

        // Reset scroll to 0 when currentPage changes
        if (movieByGenreContainerRef.current) {
            movieByGenreContainerRef.current.scrollLeft = 0;
        }

    }, [currentPage])

    return (

        <div className="sectionbyGenre">
            <h2>{genre.name}</h2>
            <div className="movieByGenreContainer" ref={movieByGenreContainerRef}>

                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>)
                }

                {movieByGenre.map(movie => (
                    <DisplayMovie key={movie.id} item={movie} />
                ))}

                <button onClick={() => setCurrentPage(currentPage + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

            </div>
        </div>
    )
}

export default MovieByGenre;