const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const movieDetails = document.getElementById("container");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
console.log(movieId);
const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=e1aaad58747084b5874eded0abbe7c28`;

detailMovies(apiUrl);

async function detailMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}
function showMovies(movies) {
  movieDetails.innerHTML = "";
  const { poster_path, title, overview } = movie;
  const movie_card = document.createElement("div");
  movie_card.classList.add("movie");

  movie_card.innerHTML = `
         <img src="${IMGPATH + poster_path}" alt="${title}"/>
  
       <div class="movie-info">
           <h3>${title}</h3>
       </div> 
       `;
  root.appendChild(movie_card);
}
