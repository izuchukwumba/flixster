import { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import MovieList from "./MovieList";
import Footer from "./Footer";
import FavoriteMovieContextProvider from "./context/FavoriteMovieContext";
import WatchedMovieContextProvider from "./context/WatchedMovieContext";
import GenreContextContextProvider from "./context/GenreContext";

function App() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <GenreContextContextProvider>
      <WatchedMovieContextProvider>
        <FavoriteMovieContextProvider>
          <>
            <Navbar />
            <MovieList />
            <Footer />
          </>
        </FavoriteMovieContextProvider>
      </WatchedMovieContextProvider>
    </GenreContextContextProvider>
  );
}

export default App;
