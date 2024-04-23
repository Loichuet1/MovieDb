import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from 'react';
import App from './App.jsx'

import { utils } from "./utils/Utils"

import MovieManager from "./managers/MovieManager";
import GenreManager from "./managers/GenreManager.jsx"
import MostRecent from './pages/MostRecent.jsx';
import Movies from './pages/Movies.jsx';
import Series from './pages/Series.jsx';
import MyList from './pages/MyList.jsx';
import Home from './pages/Home.jsx';
import MovieDetail from './pages/MovieDetail.jsx';


export const UtilsContext = createContext();
export const GenreManagerContext = createContext();

const Main = () => {

  const movieManager = new MovieManager();
  const genreManager = new GenreManager();

  const router = createBrowserRouter([
    {
      element: <App managers={{ genreManager, movieManager }} />,
      children: [
        {
          path: "/",
          element: <Home managers={{ genreManager, movieManager }} />,
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
          path: "/mostRecent",
          element: <MostRecent />,
        },
        {
          path: "/myList",
          element: <MyList />,
        },
        {
          path: "/movieDetail/:id",
          element: <MovieDetail movieManager={movieManager} />,
        },
      ],
    },
  ]);

  return (
    <>
      <UtilsContext.Provider value={{ utils }}>
        <GenreManagerContext.Provider value={{ genreManager }}>
          <RouterProvider router={router} />
        </GenreManagerContext.Provider >
      </UtilsContext.Provider >
    </>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
