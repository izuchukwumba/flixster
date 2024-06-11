import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);

  let pageNumber = () => {
    return Math.floor(Math.random() * 20);
  };

  useEffect(() => {
    const getMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber()}`;
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
        // console.log(data);
        setMovies(
          data.results.map((movie) => ({
            movie_title: movie.title,
            poster_url: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            movie_rating: movie.vote_average,
          }))
        );
      } catch (err) {
        console.error("error:" + err);
      }
    };

    getMovies();
  }, []);
  console.log(movies);

  return (
    <div id="movie-list">
      {movies.map((movie) => (
        <MovieCard
          title={movie.movie_title}
          imgSrc={movie.poster_url}
          rating={movie.movie_rating}
        />
      ))}
    </div>
  );
}

export default MovieList;
