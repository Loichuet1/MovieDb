import { useState } from "react";

useState

export default function FilterManager(genres) {

    const [filterButtonsDisplayed, setFilterButtonsDisplayed] = useState(false);
    const [filteredGenres, setFilteredGenres] = useState([]);

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
        return filteredGenres.length === 0 ? Array.from(genres.values()) : filteredGenres;
    }

    return ({ filterButtonsDisplayed, setFilterButtonsDisplayed, filteredGenres, mapToDisplay, manageFilter });
}