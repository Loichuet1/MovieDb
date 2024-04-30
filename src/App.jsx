import { Link, Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AccountManagerContext } from "./main"
import { GenreManagerContext } from "./main";
import './App.css'
import './style/Nav.scss';

function App({ }) {

  const { accountManager } = useContext(AccountManagerContext);
  const { genreManager } = useContext(GenreManagerContext);

  useEffect(() => {
    genreManager?.fecthMovieGenres();
    genreManager?.fecthSerieGenres();

    accountManager?.getWatchListMovies();
    accountManager?.getWatchListTV();

    accountManager?.getFavoriteMovies();
    accountManager?.getFavoriteTV();

  }, [])

  return (
    <>
      <nav className="navbar">
        <img src="https://images.rtl.fr/~c/795v350/rtl/www/1162231-logo-netflix.jpg" alt="logo" />
        <div className="buttonContainer">  <Link className="menuButton" to="/">Accueil</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/movies">Films</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/series">Séries</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/myList">Ma Liste</Link></div>

      </nav>
      <main>
        <Outlet />
      </main>

      <footer className="footer"></footer>
    </>
  );
}

export default App
