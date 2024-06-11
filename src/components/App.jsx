import { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import MovieList from "./MovieList";

function App() {
  return (
    <>
      <Navbar />
      <MovieList />
    </>
  );
}

export default App;
