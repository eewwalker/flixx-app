const global = {
  currentPage: window.location.pathname,
};

//Init App
// Create a Router: whatever page we are currently own run certain function or do an action
function initApp() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("home");
      break;
    case "/shows.html":
      console.log("shows");
      break;
    case "/movie-details.html":
      console.log("movie details");
      break;
    case "/tv-details.html":
      console.log("shows details");
      break;
    case "/search.html":
      console.log("search page");
      break;
  }
  highlightActiveNav();
}
function highlightActiveNav() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", initApp);
