import { useEffect, useState, useContext } from "react";
import { AccountManagerContext } from '../main';
import DisplayMovie from "../components/MovieComponents";
import "../style/MyListStyle.scss"
import Serie from "../components/Serie";

function Mylist() {

    const { accountManager } = useContext(AccountManagerContext);
    const { watchListMovies, watchListTV } = accountManager;

    const [displaySeries, setDisplaySeries] = useState(true);
    const [displayMovies, setDisplayMovies] = useState(true);

    useEffect(() => {
        // scroll back to top on mount
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className="myListBody" >
                <div className="myListHeader" >
                    <h2>Ma liste de films et séries à voir</h2>
                    <div className="filterButtonsSection">
                        <h2>Filtré par :</h2>
                        <button className={displayMovies ? "filterButtonSelected" : "filterButton"} onClick={() => setDisplayMovies(!displayMovies)}>Movies</button>
                        <button className={displaySeries ? "filterButtonSelected" : "filterButton"} onClick={() => setDisplaySeries(!displaySeries)}>Series</button>
                    </div>
                </div>
                <div className="myListFlexbox" >
                    {displayMovies && (
                        Array.from(watchListMovies.values()).map(item => (
                            <DisplayMovie key={item.id} item={item} />
                        ))
                    )}

                    {displaySeries && (
                        Array.from(watchListTV.values()).map(item => (
                            <Serie key={item.id} item={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Mylist;