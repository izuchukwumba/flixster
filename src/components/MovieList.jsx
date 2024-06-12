import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(Math.floor(Math.random() * 20));
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);

  let now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
  let search_query_url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;

  const getMovies = async (api_url) => {
    const url = api_url;
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

      console.log(data.results);
      const newMovies = data.results.map((movie) => ({
        key: movie.id,
        movie_title: movie.title,
        poster_url: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
        movie_rating: movie.vote_average,
        year: movie.release_date.substring(0, 4),
      }));

      return newMovies;
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const initialMovies = await getMovies(now_playing_url);
      setMovies(initialMovies);
    })();
  }, []);

  const handleLoadMoreClick = async () => {
    setPageNumber((pageNumber) => pageNumber + 1);
    const newMovies = await getMovies(now_playing_url);
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };

  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
    setMovies([]);
    const searchResults = await getMovies(search_query_url);

    if (searchResults.length != 0) {
      setMovies(searchResults);
    } else {
      setMovies(["none"]);
      //TODO: fix this else statement so that it displays "No results found" aesthetically
    }
  };

  function sortMovies(sort_order) {
    const sortMoviesByTitle = () => {
      const sortedMoviesByTitle = [...movies].sort((a, b) => {
        if (sort_order === "movie-title-AZ") {
          return a.movie_title.localeCompare(b.movie_title);
        } else if (sort_order === "movie-title-ZA") {
          return b.movie_title.localeCompare(a.movie_title);
        }
      });
      setMovies(sortedMoviesByTitle);
    };

    const sortMoviesByRating = () => {
      const sortedMoviesByRating = [...movies].sort((a, b) => {
        if (sort_order === "rating-AZ") {
          return a.movie_rating - b.movie_rating;
        } else if (sort_order === "rating-ZA") {
          return b.movie_rating - a.movie_rating;
        }
      });
      setMovies(sortedMoviesByRating);
    };
    if (sort_order === "movie-title-AZ" || sort_order === "movie-title-ZA") {
      sortMoviesByTitle();
    } else if (sort_order === "rating-AZ" || sort_order === "rating-ZA") {
      sortMoviesByRating();
    }

    console.log(sort_order);
  }

  useEffect(() => {
    sortMovies(sortOption);
  }, [sortOption]);

  const handleSortChange = (event) => {
    const selected_option = event.target.value;
    setSortOption(selected_option);
    if (sortOption === "movie-title-AZ" || sortOption === "movie-title-ZA") {
      sortMovies(sortOption);
    }
  };

  //change sort option t sort order for less confusion

  return (
    <div id="movie-list-container">
      <div id="search-and-sort-container">
        <input
          id="search-input"
          placeholder="Search movie title..."
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div id="sort-btns">
          <select
            // value={sort_option}
            name="sort-options"
            id="sort-options"
            onChange={handleSortChange}
          >
            <option value="">Choose sorting option</option>
            <option value="movie-title-AZ">Sort by movie title (a-z)</option>
            <option value="movie-title-ZA">Sort by movie title (z-a)</option>
            <option value="rating-AZ">Sort by rating (0-10)</option>
            <option value="rating-ZA">Sort by rating (10-0)</option>
          </select>
        </div>
      </div>
      {movies.length === 0 ? (
        <div id="loading-state-container">
          <div id="loading-state"></div>
        </div>
      ) : movies[0] === "none" ? (
        <div>
          <div>No movies found</div>
        </div>
      ) : (
        <div id="second-movie-list-container">
          <div id="movie-list">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.movie_title}
                imgSrc={movie.poster_url}
                rating={movie.movie_rating}
                release_year={movie.year}
              />
            ))}
          </div>
          <div id="load-more-button" onClick={handleLoadMoreClick}>
            Load More
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
