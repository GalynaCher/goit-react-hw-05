import axios from "axios";

const baseURL = 'https://api.themoviedb.org/3';
export const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWUzNDUzZTk1MDM0Mjk4M2ZjNGIxYmEwZWZmNDNkYyIsIm5iZiI6MTcyMDcxMjkxOC4yODE3NTMsInN1YiI6IjY2OGZhYTNmZjMzYTkwMWQwYmQ1MmViZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cR7neX7kSR5hg7SwBFDgOfPY_Fth3X8DK9JJ5MCgL_M', 
    accept: 'application/json'
  }
};

export const getMovies = async () => {
  const response = await axios.get(`${baseURL}/trending/movie/day`, options);
    // console.log("api.js> getMovies() response", response);
    return response.data.results;
}

export const getMovieById = async (movieID) => {
    const response = await axios.get(`${baseURL}/movie/${movieID}`, options);
    // console.log("api.js> getMoviesById() response", response);
    return response.data;
}

export const getCreditsById = async (movieID) => {
  const response = await axios.get(`${baseURL}/movie/${movieID}/credits`, options);
  // console.log("api.js> getCreditsById() response", response);
  return response.data;
}

export const getReviewsById = async (movieID) => {
  const response = await axios.get(`${baseURL}/movie/${movieID}/reviews`, options);
  // console.log("api.js> getReviewsById() response", response);
  return response.data;
}

export const getMoviesByName = async (query) => {
  const response = await axios.get(`${baseURL}/search/movie?query=${query}&include_adult=false`, options);
  console.log("api.js> getMoviesByName() response", response);
  return response.data;
}
