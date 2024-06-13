import { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import MovieList from "./MovieList";
import Footer from "./Footer";
import FavoriteMovieContextProvider from "./context/FavoriteMovieContext";
("./context/FavoriteMovieContext");

function App() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <FavoriteMovieContextProvider>
      <>
        <Navbar />
        <MovieList />
        <Footer />
      </>
    </FavoriteMovieContextProvider>
  );
}

export default App;
