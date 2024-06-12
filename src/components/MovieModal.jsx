import "../styles/MovieModal.css";
function MovieModal({ movie, closeModalFunction }) {
  return (
    <div className="overall-modal-container">
      <div className="modal-container">
        <div onClick={closeModalFunction} className="close-modal-btn">
          &times;
        </div>
        <div className="modal-poster-container">
          <img className="modal-poster" src={movie.poster_url} />
          <div className="modal-texts">
            <div className="modal-movie-title-container">
              <span className="modal-detail-heading">Title:</span>
              <br />
              <span className="modal-movie-title">{movie.movie_title}</span>
            </div>
            <div>
              <span className="modal-detail-heading">Release Date:</span>
              <br />
              <span className="modal-movie-release-date">
                {movie.release_date}
              </span>
            </div>
            <div>
              <span className="modal-detail-rating">Rating:</span>
              <br />
              <span className="modal-movie-rating">{movie.movie_rating}</span>
            </div>

            <div>
              <span className="modal-detail-heading">Genre:</span>
            </div>
          </div>
        </div>

        <div className="modal-overview-container">
          <div>
            <span>Overview:</span>
            <br />
            <span className="modal-overview">{movie.overview}</span>
          </div>
        </div>
        <div className="modal-backdrop-container">
          <img className="modal-backdrop" src={movie.backdrop_url} />
        </div>
      </div>
    </div>
  );
}

//TODO: outside click should close modal
export default MovieModal;
