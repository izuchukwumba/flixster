import React, { useState, useContext, useEffect } from "react";
import "../styles/MovieCard.css";
import { useFavoriteMovies } from "./context/FavoriteMovieContext";

function MovieCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const emptyStar = <i className="fa-regular fa-star stars empty-star"></i>;
  const filledStar = <i className="fa-solid fa-star stars filled-star"></i>;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i <= 4; i++) {
      if (i < rating / 2.8) {
        stars.push(filledStar);
      } else {
        stars.push(emptyStar);
      }
    }
    return stars;
  };

  const { favoriteMovies, setFavoriteMovies } = useFavoriteMovies();
  // console.log(favoriteMovies);

  const handleFavoriteClick = (event) => {
    if (!isFavorite) {
      setIsFavorite(!isFavorite);
      setFavoriteMovies((prev) => [...prev, props.movie]);
    } else if (isFavorite) {
      setIsFavorite(!isFavorite);
      event.stopPropagation();
      setFavoriteMovies((prev) =>
        [...prev].filter((item) => item !== props.movie)
      );
    }
    event.stopPropagation();
  };

  return (
    <div className="movie-card" onClick={props.openModalFunction}>
      <div className="movie-image-container">
        <img className="movie-image" src={props.imgSrc} />
        <div className="movie-texts">
          <div className="movie-title-and-like-container">
            <div className="movie-title">{props.title}</div>
            <div>
              <i
                className={`${
                  isFavorite ? "fa-solid" : !isFavorite ? "fa-regular" : ""
                } fa-heart  favorite-icon`}
                onClick={handleFavoriteClick}
                style={{ color: isFavorite ? "red" : "white" }}
              ></i>
            </div>
          </div>
          <div id="movie-card-last-line">
            <div className="rating-container">
              <span className="rating-stars">{renderStars(props.rating)}</span>
              <span className="rating-value">{props.rating}</span>
            </div>
            <div className="release-year">{props.release_year}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
