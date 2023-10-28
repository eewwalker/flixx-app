const global = {
  currentPage: window.location.pathname,
};
const popularMovies = document.querySelector("#popular-movies");
const tvShows = document.querySelector("#popular-shows");
const movieDetails = document.querySelector("#movie-details");
const showDetails = document.querySelector("#show-details");

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    //TRAV SOLUTION
    div.innerHTML = `
        <a href = 'movie-details.html?id=${movie.id}'>
       ${
         movie.poster_path
           ? `<img src = 'https://image.tmdb.org/t/p/w500${movie.poster_path}' class= 'card-img-top'
            alt = ${movie.title}
            />`
           : `<img src = '../images/no-image.jpg' class= 'card-img-top'
           alt= ${movie.title}`
       }
        </a>
        <div class= 'card body'>
        <h5 class = 'card-title'>${movie.title}</h5>
        <p class = 'card-text'>
        <small class = 'text-muted'> Release: ${movie.release_date}</small>
        </p>
        </div>`;
    popularMovies.appendChild(div);
    //MY SOLUTION
    // const a = document.createElement("a");
    // a.setAttribute("href", `movie-details.html?id=${movie.id}`);
    // const img = document.createElement("img");
    // const srcImg = `${movie.poster_path} ? https://image.tmdb.org/t/p/w500${movie.poster_path} : ../images/no-image.jpg`;
    // img.setAttribute("src", `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    // img.setAttribute("class", "card-img-top");
    // img.setAttribute("alt", movie.title);
    // a.appendChild(img);
    // div.appendChild(a);
    // popularMovies.appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const results = await fetchAPIData(`movie/${movieId}`);
  displayBackDrop("movie", results.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class= 'details-top'>
    <div> ${
      results.poster_path
        ? `<img
              src='https://image.tmdb.org/t/p/w500${results.poster_path}'
              class="card-img-top"
              alt="${results.title}"
            />`
        : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${results.title}"
            />`
    }
          </div>
          <div>
            <h2>${results.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${results.release_date}</p>
            <p>
            ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${results.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href=${
              results.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
          </div>
          <div class='details-bottom'>
       <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              results.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              results.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              results.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              results.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies.map(
            (company) => ` <span>${company.name}</span>`
          )}</div>
          </div>`;
  movieDetails.append(div);
}

function displayBackDrop(type, path) {
  const backDropDiv = document.createElement("div");
  backDropDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  backDropDiv.style.backgroundSize = "cover";
  backDropDiv.style.backgroundPosition = "center";
  backDropDiv.style.backgroundRepeat = "no-repeat";
  backDropDiv.style.height = "100vh";
  backDropDiv.style.width = "100vw";
  backDropDiv.style.position = "absolute";
  backDropDiv.style.top = "0";
  backDropDiv.style.left = "0";
  backDropDiv.style.zIndex = "-1";
  backDropDiv.style.opacity = "0.2";
  type === "movie"
    ? movieDetails.append(backDropDiv)
    : showDetails.append(backDropDiv);
}
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function displayTvShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
              src='https://image.tmdb.org/t/p/w500${show.poster_path}'
              class="card-img-top"
              alt="${show.name}"
            />`
        : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
    }
    </a>
          
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>`;
    tvShows.appendChild(div);
  });

  console.log(results);
}

async function displayTvDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showId}`);
  displayBackDrop("show", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
              src='https://image.tmdb.org/t/p/w500${show.poster_path}'
              class="card-img-top"
              alt=${show.name}
            />
            `
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${show.name}
            />`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">First Air Date: ${show.first_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((s) => `<li>${s.name}</li>`).join("")}
             
            </ul>
            <a href=${
              show.homepage
            } target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies.map((s) => ` <span>${s.name}</span>`)}
      </div>
        </div>`;
  showDetails.append(div);
}

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};
const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};
//Fetch Data from API
async function fetchAPIData(endpoint) {
  const apiKey = "5bbe90295c6cb39b8734f83729d3f7f0";
  const apiUrl = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(
    `${apiUrl}${endpoint}?api_key=${apiKey}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
//Init App
// Create a Router: whatever page we are currently own run certain function or do an action
function initApp() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayTvShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTvDetails();
      break;
    case "/search.html":
      console.log("search page");
      break;
  }
  highlightActiveNav();
}
//Highlight navigation link when active(on page)
function highlightActiveNav() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", initApp);
