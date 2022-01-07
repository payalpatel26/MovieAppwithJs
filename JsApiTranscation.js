const Api_key = "2912382296e2722faea897d3c7606b83";
//const url =
//"https:api.themoviedb.org/3/search/movie?api_key=2912382296e2722faea897d3c7606b83";
const img_url = "https://image.tmdb.org/t/p/w500/";
// genreate dynamic url:

function generateUrl(path) {
  const dyn_url = `https:api.themoviedb.org/3/${path}?api_key=2912382296e2722faea897d3c7606b83`;
  return dyn_url;
}

function requestmovie(url, oncomplete, onError) {
  fetch(url)
    .then((req) => req.json())
    .then(oncomplete)
    .catch(onError);
}

// create function to search movie.
function searchmovie(value) {
  const path = "search/movie";
  const search_url = generateUrl(path) + "&query=" + value;
  requestmovie(search_url, renderMovieSearch, handlerror);
}

// create function for upcoming movie

function UpComingMovie() {
  const path = "movie/upcoming";
  const upmovie_url = generateUrl(path);
  const render = renderMovieContainer.bind({ title: "UP COMING MOVIE" });
  requestmovie(upmovie_url, render, handlerror);
}

//create function for topRateMovie

function Top_RateMovie() {
  const path = "movie/top_rated";
  const tRmovie_url = generateUrl(path);
  const render = renderMovieContainer.bind({ title: "TOP RATE MOVIE" });
  requestmovie(tRmovie_url, render, handlerror);
}

//create function popular Movie
function Populated_Movie() {
  const path = "movie/popular";
  const popmovie_url = generateUrl(path);
  const render = renderMovieContainer.bind({ title: "POPULAR MOVIE" });
  requestmovie(popmovie_url, render, handlerror);
}
