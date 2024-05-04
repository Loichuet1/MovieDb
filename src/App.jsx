import { Link, Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useEffect, useContext } from "react";
import { AccountManagerContext } from "./main"
import { GenreManagerContext } from "./main";
import './App.css'
import './style/Nav.scss';

function App({ }) {

  const { accountManager } = useContext(AccountManagerContext);
  const { genreManager } = useContext(GenreManagerContext);

  const location = useLocation();

  useEffect(() => {
    genreManager?.fecthMovieGenres();
    genreManager?.fecthSerieGenres();

    accountManager?.getWatchListMovies();
    accountManager?.getWatchListTV();

    accountManager?.getFavoriteMovies();
    accountManager?.getFavoriteTV();

  }, [])

  useEffect(() => {
    //changement here
    console.log(location.pathname)
  }, [location])

  return (
    <>
      <nav className="navbar">
        <img src="src\assets\LogoNetflux.png" alt="logo" />
        <div className="buttonContainer">  <Link style={{ color: location.pathname === "/" ? 'red' : "white" }} className="menuButton" to="/">Accueil</Link></div>
        <div className="buttonContainer"><Link style={{ color: location.pathname === "/movies" ? 'red' : "white" }} className="menuButton" to="/movies">Films</Link></div>
        <div className="buttonContainer"><Link style={{ color: location.pathname === "/series" ? 'red' : "white" }} className="menuButton" to="/series">Séries</Link></div>
        <div className="buttonContainer"><Link style={{ color: location.pathname === "/myList" ? 'red' : "white" }} className="menuButton" to="/myList">Ma Liste</Link></div>

      </nav>
      <main>
        <Outlet />
      </main>

      <footer className="footer"></footer>
    </>
  );
}

export default App
