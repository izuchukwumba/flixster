import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(Math.floor(Math.random() * 10));
  // const [pageNumber, setPageNumber] = useState(1);

  console.log(pageNumber);

  const getMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzc0ZmExNjZhZmQ3MzlkNDAyMmY0ODIwZWY5NjFjZCIsInN1YiI6IjY2Njc3MDBkM2U4MGUzOTAxNmQwMTgyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tm1UvZ7xHYWI1QTk3Hk7V79Z5lypAMTIKaMudAOSpvw",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      const newMovies = data.results.map((movie) => ({
        key: movie.id,
        movie_title: movie.title,
        poster_url: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
        movie_rating: movie.vote_average,
      }));

      return newMovies;
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const initialMovies = await getMovies(pageNumber);
      setMovies(initialMovies);
    })();
  }, []);
  console.log(movies);

  const handleLoadMoreClick = async () => {
    setPageNumber((pageNumber) => pageNumber + 1);
    const newMovies = await getMovies(pageNumber);
    console.log("this is newMovies " + newMovies);
    setMovies([...movies, ...newMovies]);
    console.log(pageNumber);
  };

  return (
    <div id="movie-list-container">
      <div id="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.movie_id}
            title={movie.movie_title}
            imgSrc={movie.poster_url}
            rating={movie.movie_rating}
          />
        ))}
      </div>
      <div id="load-more-button" onClick={handleLoadMoreClick}>
        Load More
      </div>
    </div>
  );
}

export default MovieList;
