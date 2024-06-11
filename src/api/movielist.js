import fetch from "node-fetch";

const url =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzc0ZmExNjZhZmQ3MzlkNDAyMmY0ODIwZWY5NjFjZCIsInN1YiI6IjY2Njc3MDBkM2U4MGUzOTAxNmQwMTgyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tm1UvZ7xHYWI1QTk3Hk7V79Z5lypAMTIKaMudAOSpvw",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
