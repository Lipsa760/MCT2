const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e1aaad58747084b5874eded0abbe7c28&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=e1aaad58747084b5874eded0abbe7c28&query=";

const searchBar = document.getElementById("searchbar");
const searchButton = document.getElementById("searchbtn");
const root = document.getElementById("movies");

getMovies(APIURL);

//-----------------LOCAL STORAGE------------------------

let ls = JSON.parse(localStorage.getItem("sdata")) || [];

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}
function showMovies(movies) {
  root.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movie_card = document.createElement("div");
    movie_card.classList.add("movie");

    //-----------------EVENTLISTENER ON DIV------------------------

    movie_card.addEventListener("click", function () {
      if (ls.length == 0) {
        ls.push(movie);
      } else {
        ls[0] = movie;
      }
      localStorage.setItem("sdata", JSON.stringify(ls));
      window.location.href = "./details.html";
    });

    movie_card.innerHTML = `
       <img src="${IMGPATH + poster_path}" alt="${title}"/>

     <div class="movie-info">
         <h3>${title}</h3>
     </div> 
     `;
    root.appendChild(movie_card);
  });
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const searchTerm = searchBar.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    searchBar.value = "";
  }
});
