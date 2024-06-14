import React, { useState, useContext, useEffect } from "react";
import "../styles/MovieCard.css";
import { useFavoriteMovies } from "./context/FavoriteMovieContext";
import { useWatchedMovies } from "./context/WatchedMovieContext";

function MovieCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const emptyStar = <i className="fa-regular fa-star stars empty-star"></i>;
  const filledStar = <i className="fa-solid fa-star stars filled-star"></i>;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i <= 5; i++) {
      if (i < rating / 2) {
        stars.push(filledStar);
      } else {
        stars.push(emptyStar);
      }
    }
    return stars;
  };

  const { favoriteMovies, setFavoriteMovies } = useFavoriteMovies();
  const { watchedMovies, setWatchedMovies } = useWatchedMovies();

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setFavoriteMovies((prev) => [...prev, props.movie]);
    } else if (isFavorite) {
      setFavoriteMovies((prev) =>
        [...prev].filter((item) => item !== props.movie)
      );
    }
  };

  const handleWatchedClick = (event) => {
    event.stopPropagation();
    setIsWatched(!isWatched);
    if (!isWatched) {
      setWatchedMovies((prev) => [...prev, props.movie]);
    } else if (isWatched) {
      setWatchedMovies((prev) =>
        [...prev].filter((item) => item !== props.movie)
      );
    }
  };

  return (
    <div className="movie-card" onClick={props.openModalFunction}>
      <div className="movie-image-container">
        <img className="movie-image" src={props.imgSrc} />
        <div className="movie-texts">
          <div className="movie-title-and-like-container">
            <div className="movie-title">{props.title}</div>
            {/* <div className="movie-title">{props.title.substring(0, 20)}</div> */}

            <div>
              <i
                className={`${
                  isFavorite ? "fa-solid" : !isFavorite ? "fa-regular" : ""
                } fa-star  favorite-icon`}
                onClick={handleFavoriteClick}
                style={{ color: isFavorite ? "lime" : "white" }}
              ></i>
            </div>
          </div>
          <div id="movie-card-last-line">
            <div className="rating-container">
              <span className="rating-stars">{renderStars(props.rating)}</span>
              <span className="rating-value">{props.rating}</span>
            </div>
            <div className="release-year">{props.release_year}</div>
            <label className="watched-check-btn">
              <input
                type="checkbox"
                checked={isWatched}
                onClick={handleWatchedClick}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
