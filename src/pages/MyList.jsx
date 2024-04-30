import { useEffect, useState, useContext } from "react";
import { AccountManagerContext } from '../main';
import DisplayMovie from "../components/MovieComponents";
import "../style/MyListStyle.scss"

function Mylist() {

    const itemPerPages = 12;

    const { accountManager } = useContext(AccountManagerContext);
    const { watchListMovies } = accountManager;

    // calcule a startingIndex and finalIndex to splice watchList and return the watchlist to display based on itemPerPages
    const pageToDisplay = (page) => {

        const startingIndex = itemPerPages * page;
        const finalIndex = itemPerPages * +1;

        const currentPageMovies = Array.from(watchListMovies.values()).splice(startingIndex, finalIndex);

        return currentPageMovies;
    }

    // calculate the number of pages and return an array of pages count
    const PageCount = () => {

        const pagesNumber = Math.ceil(Array.from(watchListMovies.values())?.length / itemPerPages);
        return Array.from({ length: pagesNumber }, (_, index) => index + 1);
    }

    const [displayedMovies, setDisplayedMovies] = useState(pageToDisplay(0));

    // On watchlist change set back to page 1 (0 index)
    useEffect(() => {
        setDisplayedMovies(pageToDisplay(0));
        // scroll back to top on mount
        window.scrollTo(0, 0)
    }, [watchListMovies])

    return (
        <div>
            <div className="myListBody" >
                <h2>Ma liste de film à voir</h2>
                <div className="myListFlexbox" >
                    {Array.from(displayedMovies.values()).map(item => (
                        <DisplayMovie key={item.id} item={item} />
                    ))}
                </div>
                <div className="paginationContainer">
                    {PageCount().map(page => (

                        <div className="pageItem" key={page} onClick={() => setDisplayedMovies(pageToDisplay(page - 1))}>{page}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Mylist;