import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import './App.css'
import './style/Nav.scss';

function App({ managers }) {

  useEffect(() => {

    managers.genreManager.fecthGenre();

  }, [])

  return (
    <>
      <nav className="navbar">
        <img src="https://images.rtl.fr/~c/795v350/rtl/www/1162231-logo-netflix.jpg" alt="logo" />
        <div className="buttonContainer">  <Link className="menuButton" to="/">Home</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/movies">Movies</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/series">Series</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/mostRecent">Most Recent</Link></div>
        <div className="buttonContainer"><Link className="menuButton" to="/myList">My List</Link></div>

      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App
