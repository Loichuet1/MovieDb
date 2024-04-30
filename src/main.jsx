import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from 'react';
import App from './App.jsx'

import { utils } from "./utils/Utils"
import ErrorBoundary from './utils/ErrorBoundary.jsx';

import MovieManager from "./managers/MovieManager";
import GenreManager from "./managers/GenreManager.jsx"
import AccountManager from './managers/AccountManager.jsx';
import DiscoverManager from './managers/DiscoverManager.jsx';
import SerieManager from './managers/SerieManager.jsx';

import Movies from './pages/Movies.jsx';
import Series from './pages/Series.jsx';
import MyList from './pages/MyList.jsx';
import Home from './pages/Home.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import SerieDetail from './pages/SerieDetail.jsx';

export const UtilsContext = createContext();
export const GenreManagerContext = createContext();
export const AccountManagerContext = createContext();
export const DiscoverManagerContext = createContext();
export const SerieAndMovieManagerContext = createContext();

const Main = () => {

  const movieManager = new MovieManager();
  const genreManager = new GenreManager();
  const accountManager = new AccountManager();
  const discovermanager = new DiscoverManager();
  const serieManager = new SerieManager();

  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/series",
          element: <Series />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/myList",
          element: <MyList />,
        },
        {
          path: "/movieDetail/:id",
          element: <MovieDetail movieManager={movieManager} />,
        },
        {
          path: "/serieDetail/:id",
          element: <SerieDetail />,
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <UtilsContext.Provider value={{ utils }}>
        <GenreManagerContext.Provider value={{ genreManager }}>
          <AccountManagerContext.Provider value={{ accountManager }}>
            <DiscoverManagerContext.Provider value={{ discovermanager }}>
              <SerieAndMovieManagerContext.Provider value={{ serieManager, movieManager }}>

                <RouterProvider router={router} />

              </SerieAndMovieManagerContext.Provider >
            </DiscoverManagerContext.Provider >
          </AccountManagerContext.Provider >
        </GenreManagerContext.Provider >
      </UtilsContext.Provider >
    </ErrorBoundary>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
