import React, { createContext, useState, useContext } from "react";

const favoriteMovieContext = createContext([]);
export const useFavoriteMovies = () => useContext(favoriteMovieContext);

const FavoriteMovieContextProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  return (
    <favoriteMovieContext.Provider
      value={{ favoriteMovies, setFavoriteMovies }}
    >
      {children}
    </favoriteMovieContext.Provider>
  );
};

export default FavoriteMovieContextProvider;
