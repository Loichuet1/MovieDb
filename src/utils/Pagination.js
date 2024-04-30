import { useEffect, useState } from "react";


export default function Pagination(itemPerPage, items) {

    const [currentPage, setCurrentPage] = useState(1);
    const [displayedItems, setDisplayedItems] = useState([]);

    // use as a flag to check if page can be reset or not
    const [adjustPage, setAdjustPage] = useState(false);


    useEffect(() => {

        const managePageToDisplay = () => {

            const startingIndex = (currentPage - 1) * itemPerPage;
            const endIndex = startingIndex + itemPerPage;

            setDisplayedItems(Array.from(items.values()).slice(startingIndex, endIndex));
        }
        managePageToDisplay();

    }, [currentPage, items])


    // check if current lis of items is empty if yes set flag as true else false
    useEffect(() => {
        if (displayedItems.length === 0) {
            setAdjustPage(true);
        } else {
            setAdjustPage(false);
        }
    }, [displayedItems]);


    useEffect(() => {
        if (adjustPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setAdjustPage(false);
        }
    }, [adjustPage, currentPage]);

    return ({ currentPage, setCurrentPage, displayedItems })
}