import { useEffect, useState } from "react";
import Pagination from "../utils/Pagination";

export default function ApiPagination(genre, discoverItems) {

    const itemPerPage = 5;
    const filterType = "with_genres";
    const filterValue = genre.id;

    // api page returned bu the api
    const [currentApiPage, setCurrentApiPage] = useState(1)
    const [itemsByGenre, setItemsByGenre] = useState(new Map())

    // pagination manager to handle regular pagination
    const { currentPage, setCurrentPage, displayedItems } = new Pagination(itemPerPage, itemsByGenre);

    useEffect(() => {

        fecthItemsByGenre(filterType, filterValue, currentApiPage, setItemsByGenre, setCurrentApiPage, discoverItems);

    }, [currentApiPage, filterType, filterValue])


    const nextPage = () => {

        // set next page of pagination
        setCurrentPage(currentPage + 1)

        // if needed call the api to retrieve the next page and reset pagination
        const totalPages = Math.ceil(itemsByGenre.size / itemPerPage);
        if ((totalPages === currentPage) && itemsByGenre.size !== 0) {
            // Trigger an event when the maximum page is reached
            fecthItemsByGenre(filterType, filterValue, currentApiPage + 1, setItemsByGenre, setCurrentApiPage, discoverItems);
            // reset page to 1
            setCurrentPage(1);
        }
    }

    const previousPage = () => {

        // set previous page of pagination
        setCurrentPage(currentPage - 1);

        // if needed call the api to retrieve the previous page and reset pagination
        if (currentPage === 1 && currentApiPage !== 1) {
            fecthItemsByGenre(filterType, filterValue, currentApiPage - 1, setItemsByGenre, setCurrentApiPage, discoverItems);
            // reset to page 4 , max page of pagination
            setCurrentPage(4);
        }
    }

    return { nextPage, previousPage, displayedItems, currentPage, currentApiPage };
}

// fetch items from api based on the discoverItems callback function
const fecthItemsByGenre = async (filterType, filterValue, currentApiPage, setItemsByGenre, setCurrentApiPage, discoverItems) => {
    const { page, convertedArray } = await discoverItems(filterType, filterValue, currentApiPage);
    setItemsByGenre(convertedArray);
    setCurrentApiPage(page);
};