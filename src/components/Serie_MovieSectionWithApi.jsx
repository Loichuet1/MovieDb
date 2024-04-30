import { useContext, useEffect, useState } from "react";
import Pagination from "../utils/Pagination";
import { DiscoverManagerContext } from "../main";

export default function Serie_MovieSectionWithApi({ genre, ComponentToUse }) {

    const itemPerPage = 5;
    const filterType = "with_genres";
    const filterValue = genre.id;

    const { discovermanager } = useContext(DiscoverManagerContext);
    const { discoverMovies } = discovermanager;

    const [currentApiPage, setCurrentApiPage] = useState(1)
    const [movieByGenre, setMovieByGenre] = useState(new Map())

    useEffect(() => {

        fecthMovieByGenre(filterType, filterValue, currentApiPage, setMovieByGenre, setCurrentApiPage, discoverMovies);

    }, [currentApiPage])

    const paginationInstance = new Pagination(itemPerPage, movieByGenre);


    const nextApiPage = (page) => {
        const totalPages = Math.ceil(movieByGenre.size / itemPerPage);
        if ((totalPages === page) && movieByGenre.size !== 0) {
            // Trigger an event when the maximum page is reached
            fecthMovieByGenre(filterType, filterValue, currentApiPage + 1, setMovieByGenre, setCurrentApiPage, discoverMovies);
            // reset page to 1
            paginationInstance?.setCurrentPage(1);
        }
    }

    const previousApiPage = (page) => {
        if (page === 1 && currentApiPage !== 1) {
            fecthMovieByGenre(filterType, filterValue, currentApiPage - 1, setMovieByGenre, setCurrentApiPage, discoverMovies);
            paginationInstance?.setCurrentPage(4);
        }
    }

    return (
        <div className="sectionbyGenre" >
            <h2>{genre.name}</h2>

            <div className="movieAndSerieSection" >
                <button className="arrowButton" style={{ cursor: paginationInstance?.currentPage === 1 ? 'default' : "pointer" }}
                    onClick={() => {
                        paginationInstance?.setCurrentPage(paginationInstance?.currentPage - 1);
                        previousApiPage(paginationInstance?.currentPage);

                    }}
                    disabled={paginationInstance?.currentPage === 1 && currentApiPage === 1} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={paginationInstance?.currentPage === 1 && currentApiPage === 1 ? "none" : "white"} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {paginationInstance?.displayedItems.map(item => (
                    <ComponentToUse key={item.id + item.backdrop_path} item={item} />
                ))}

                <button className="arrowButton"
                    onClick={() => {
                        paginationInstance?.setCurrentPage(paginationInstance?.currentPage + 1)
                        nextApiPage(paginationInstance?.currentPage);

                    }} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={"white"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div >
    )
}

const fecthMovieByGenre = async (filterType, filterValue, currentApiPage, setMovieByGenre, setCurrentApiPage, discoverMovies) => {
    const { page, convertedArray } = await discoverMovies(filterType, filterValue, currentApiPage);
    setMovieByGenre(convertedArray);
    setCurrentApiPage(page);
};