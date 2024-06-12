import React, { useState } from "react";
import "../styles/MovieCard.css";

function MovieCard(props) {
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
  return (
    <div className="movie-card" onClick={props.openModalFunction}>
      <div className="movie-image-container">
        <img className="movie-image" src={props.imgSrc} />
        <div className="movie-texts">
          <div className="movie-title">{props.title}</div>
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
