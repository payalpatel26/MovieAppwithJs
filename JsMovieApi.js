const btnsearch = document.getElementById("btnsearch");
const txtsearch = document.getElementById("txtMovieName");
const div = document.getElementById("dv_searchable");
const dvmovie = document.getElementById("dv_moviecontainer");

//create dynamic movie function
function createMovieSection(movies) {
  const section = document.createElement("section");
  section.classList = "section";
  movies.map((movie1) => {
    if (movie1.poster_path) {
      const img = document.createElement("img");
      img.src = img_url + movie1.poster_path;
      img.setAttribute("data-movie-id", movie1.id);
      section.appendChild(img);
    }
  });

  return section;
}
function createMovieContainer(movies, title = "") {
  const moviedv = document.createElement("div");
  moviedv.setAttribute("class", "movie");
  const header = document.createElement("h2");
  header.innerHTML = title;

  const content = document.createElement("div");
  content.classList = "content";

  const content_close = "<p id='content_close'>x</p>";
  content.innerHTML = content_close;

  const section = createMovieSection(movies);
  moviedv.appendChild(header);
  moviedv.appendChild(section);
  moviedv.appendChild(content);

  return moviedv;
}

function renderMovieSearch(data) {
  div.innerHTML = "";
  const movie = data.results;
  console.log(data.results);
  const movie_data = createMovieContainer(movie);
  div.appendChild(movie_data);
  console.log(data);
}

function renderMovieContainer(data) {
  const movie = data.results;
  const movie_data = createMovieContainer(movie, this.title);
  dvmovie.appendChild(movie_data);
}

function handlerror(error) {
  console.log("Error" + error);
}

btnsearch.addEventListener("click", function (event) {
  event.preventDefault();
  const txtvalue = txtsearch.value;
  searchmovie(txtvalue);
  txtsearch.value = "";
});

//Event Delegation:
document.onclick = function (event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    console.log(event);
    const Movieid = target.dataset.movieId;
    const section = event.target.parentElement; //Section
    const content = section.nextElementSibling; //content
    content.classList.add("content_display");
    debugger;
    //fetch movie video data
    let path = `movie/${Movieid}/videos`;
    const video_url = generateUrl(path);
    fetch(video_url)
      .then((req) => req.json())
      .then((data) => {
        const videos = data.results;
        if (videos.length != 0) {
          CreateVideoTemplate(videos, content);
        }
      })
      .catch((error) => {
        console.log("Error In video" + error);
      });
  }

  if (target.id === "content_close") {
    const cont = target.parentElement;
    cont.classList.remove("content_display");
  }
};

// generate video i frame
function createframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.height = "300px";
  iframe.width = "360px";
  iframe.allowFullscreen = "true";
  return iframe;
}

// make function to display all video
function CreateVideoTemplate(video, content) {
  debugger;
  content.innerHTML = "<p id='content_close'>X</p>";
  const divfram = document.createElement("div");
  const video_len = video.length > 4 ? 4 : video.length;

  for (let i = 0; i < video_len; i++) {
    const frame = createframe(video[i]);
    divfram.appendChild(frame);
    content.appendChild(divfram);
  }
}

UpComingMovie();
Top_RateMovie();
Populated_Movie();
