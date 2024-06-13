import React, { createContext, useState, useContext } from "react";

const watchedMovieContext = createContext([]);
export const useWatchedMovies = () => useContext(watchedMovieContext);

const WatchedMovieContextProvider = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  return (
    <watchedMovieContext.Provider value={{ watchedMovies, setWatchedMovies }}>
      {children}
    </watchedMovieContext.Provider>
  );
};

export default WatchedMovieContextProvider;
