import React, { createContext, useState, useContext } from "react";

const genreContext = createContext([]);
export const useGenre = () => useContext(genreContext);

const GenreContextContextProvider = ({ children }) => {
  const [genre, setGenre] = useState([]);
  return (
    <genreContext.Provider value={{ genre, setGenre }}>
      {children}
    </genreContext.Provider>
  );
};

export default GenreContextContextProvider;
