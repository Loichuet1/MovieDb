import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import './App.css'
import './style/Nav.scss';

function App({ managers }) {

  useEffect(() => {
    managers.genreManager.fecthGenre();
    managers.accountManager.getWatchList();
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
