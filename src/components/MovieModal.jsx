import { useEffect, useState } from "react";
import "../styles/MovieModal.css";

function MovieModal({ movie, closeModalFunction }) {
  const [genre, setGenre] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchTrailer = async (movie_id) => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`;
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
      console.log("API response", data);
      return data.results;
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  useEffect(() => {
    const getTrailer = async () => {
      const movie_videos_data = await fetchTrailer(movie.movie_key);
      console.log("Movie videos", movie_videos_data);

      // let dumbArray = [];
      // movie_videos_data.forEach((video) => {
      //   dumbArray.push(video.name);
      // });
      // console.log("Dumb array", dumbArray);

      const officialTrailer = movie_videos_data.find((video) => {
        return video.type.trim().toLowerCase() === "trailer";
      });
      console.log("Official trailer", officialTrailer);
      setTrailerKey(officialTrailer.key);
    };

    if (movie.movie_key) getTrailer();

    // console.log("Trailer", trailer);
  }, [movie]);

  const fetchGenre = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

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
      console.log("API response", data);
      return data;
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  useEffect(() => {
    const getGenre = async () => {
      const movie_genre_data = await fetchGenre();
      console.log("Movie genre", movie_genre_data);
      let movie_genre = movie_genre_data.geres.find(
        (genre) => genre.id === movie.movie_key
      );
      setGenre(movie_genre.name);
    };
  }, [movie]);
  console.log("genre", genre);
  // console.log(fetchGenre(movie.movie_key));

  console.log("Trailer", trailerKey);
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
            <span className="modal-overview">
              {movie.overview.substring(0, 200) + "..."}
            </span>
          </div>
        </div>
        <div className="trailer-header">
          {trailerKey ? "Watch Trailer" : "Trailer Not Found"}
        </div>
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Official Trailer"
          ></iframe>
        ) : (
          <div className="modal-backdrop-container">
            <img className="modal-backdrop" src={movie.backdrop_url} />
          </div>
        )}
      </div>
    </div>
  );
}

//TODO: outside click should close modal
export default MovieModal;
