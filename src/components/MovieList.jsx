import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import "../styles/MovieList.css";
import { useFavoriteMovies } from "./context/FavoriteMovieContext";
import { useWatchedMovies } from "./context/WatchedMovieContext";

function MovieList() {
  const [movies, setMovies] = useState([]);
  let INITIAL_PAGE_NUMBER = Math.floor(Math.random() * 20);
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterOption, setFilterOption] = useState("");

  const { favoriteMovies, setFavoriteMovies } = useFavoriteMovies();
  const { watchedMovies, setWatchedMovies } = useWatchedMovies();
  // console.log(favoriteMovies);

  let genre_id =
    filterOption === "action"
      ? 28
      : filterOption === "adventure"
      ? 12
      : filterOption === "comedy"
      ? 35
      : filterOption === "documentary"
      ? 99
      : filterOption === "drama"
      ? 18
      : filterOption === "romance"
      ? 10749
      : filterOption === "thriller"
      ? 53
      : 12;

  let now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
  let search_query_url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;
  const filter_url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=original_title.asc&with_genres=${genre_id}`;

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

      console.log("data", data.results);
      const newMovies = data.results.map((movie) => ({
        movie: movie,
        movie_key: movie.id,
        movie_title: movie.title,
        poster_url: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
        backdrop_url: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
        movie_rating: movie.vote_average,
        release_date: movie.release_date,
        year: parseInt(movie.release_date.substring(0, 4)),
        overview: movie.overview,
      }));
      // console.log("newMovies", newMovies);
      return newMovies;
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  useEffect(() => {
    // console.log(genre_id);
    if (pageNumber !== INITIAL_PAGE_NUMBER) {
      (async () => {
        const newMovies = await getMovies(now_playing_url);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      })();
    } else {
      (async () => {
        const initialMovies = await getMovies(now_playing_url);
        setMovies(initialMovies);
      })();
    }
  }, [pageNumber]);

  const handleLoadMoreClick = async () => {
    setPageNumber((pageNumber) => pageNumber + 1);
    // const newMovies = await getMovies(now_playing_url);
    // setMovies((prevMovies) => [...prevMovies, ...newMovies]);
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
    const sortMoviesByReleaseDate = () => {
      const sortedMoviesByReleaseDate = [...movies].sort((a, b) => {
        if (sort_order === "release-date-AZ") {
          return a.year - b.year;
        } else if (sort_order === "release-date-ZA") {
          return b.year - a.year;
        }
      });
      setMovies(sortedMoviesByReleaseDate);
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
    } else if (
      sort_order === "release-date-AZ" ||
      sort_order === "release-date-ZA"
    ) {
      sortMoviesByReleaseDate();
    }

    console.log(sort_order);
  }

  useEffect(() => {
    sortMovies(sortOption);
  }, [sortOption]);
  // console.log("before" + pageNumber);

  const handleSortChange = (event) => {
    const selected_option = event.target.value;
    setSortOption(selected_option);
    if (sortOption === "movie-title-AZ" || sortOption === "movie-title-ZA") {
      sortMovies(sortOption);
    }
    // console.log("after" + pageNumber);
  };

  useEffect(() => {
    if (filterOption !== "") {
      const filterMovies = async () => {
        console.log("xyz");
        setMovies([]);
        const newMovies = await getMovies(filter_url);
        console.log("new filter movies", newMovies);
        console.log(
          "new movies tieles",
          newMovies.map((item) => item.title)
        );
        newMovies.map((item) => {
          setMovies((prev) => [
            ...prev,
            {
              movie_key: item.movie_key,
              movie_title: item.movie_title,
              poster_url: item.poster_url,
              backdrop_url: item.backdrop_url,
              movie_rating: item.movie_rating,
              overview: item.overview,
              release_date: item.release_date,
              release_year: item.release_year,
            },
          ]);
        });
        // };\
        console.log("movies inside", movies);
      };
      filterMovies();
    }
  }, [filterOption]);
  console.log("movies outside", movies);

  console.log("getFilter", getMovies(filter_url));
  console.log("filter option", filterOption);
  const handleFilterChange = (event) => {
    const filter_option = event.target.value;
    setFilterOption(filter_option);
    // if (sortOption === "movie-title-AZ" || sortOption === "movie-title-ZA") {
    //   sortMovies(sortOption);
    // }
    // // console.log("after" + pageNumber);
  };

  //change sort option t sort order for less confusion
  function handleOpenModal(movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    console.log("movie is " + movie);
    console.log("selectedMovie is " + selectedMovie);
    console.log("modal" + isModalOpen);
  }
  function handleCloseModal() {
    setSelectedMovie(null);
    setIsModalOpen(false);
  }

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

        <select
          // value={sort_option}
          name="sort-options"
          id="sort-options"
          onChange={handleSortChange}
        >
          <option value="">Choose sorting option</option>
          <option value="movie-title-AZ">
            Sort by movie title (accending)
          </option>
          <option value="movie-title-ZA">
            Sort by movie title (decending)
          </option>
          <option value="release-date-AZ">
            Sort by release date (accending)
          </option>
          <option value="release-date-ZA">
            Sort by release date (decending)
          </option>
          <option value="rating-AZ">Sort by rating (accending)</option>
          <option value="rating-ZA">Sort by rating (decending)</option>
        </select>
        <select
          // value={sort_option}
          name="filter-options"
          id="filter-options"
          onChange={handleFilterChange}
        >
          <option value="">Filter movies by genre</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="comedy">Comedy</option>
          <option value="documentary">Documentary</option>
          <option value="drama">Drama</option>
          <option value="romance">Romance</option>
          <option value="thriller">Thriller</option>
        </select>
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
              <div>
                <MovieCard
                  openModalFunction={() => handleOpenModal(movie)}
                  movie={movie}
                  key_movie={movie.movie_key}
                  title={movie.movie_title}
                  imgSrc={movie.poster_url}
                  rating={movie.movie_rating}
                  release_date={movie.release_date}
                  release_year={movie.year}
                />
                {isModalOpen && selectedMovie === movie && (
                  <MovieModal
                    movie={selectedMovie}
                    closeModalFunction={handleCloseModal}
                  />
                )}
              </div>
            ))}
          </div>
          <div id="load-more-button" onClick={handleLoadMoreClick}>
            Load More
          </div>
        </div>
      )}
      <div className="side-bar">
        <div className="side-bar-favorite-movies-container">
          <div className="side-bar-favorite-movies-header side-bar-header">
            favorite
            <br />
            movies
          </div>
          <div className="side-bar-favorite-movies-container">
            {favoriteMovies.map((movie, index) => {
              return (
                <div className="side-bar-favorite-movie" key={index}>
                  <div className="side-bar-favorite-movie-image-container">
                    <img
                      src={movie.poster_url}
                      className="side-bar-favorite-movie-image"
                    />
                  </div>
                  <div className="side-bar-favorite-movie-title">
                    {movie.movie_title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="side-bar-watched-movies-header side-bar-header">
          watched
          <br />
          movies
        </div>
        <div className="side-bar-watched-movies-container">
          {watchedMovies.map((movie, index) => {
            return (
              <div className="side-bar-watched-movie" key={index}>
                <div className="side-bar-watched-movie-image-container">
                  <img
                    src={movie.poster_url}
                    className="side-bar-watched-movie-image"
                  />
                </div>
                <div className="side-bar-watched-movie-title">
                  {movie.movie_title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
