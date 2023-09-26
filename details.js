let ls = JSON.parse(localStorage.getItem("sdata"));
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

let movieId = ls[0].id;

const related_movie = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=e1aaad58747084b5874eded0abbe7c28`;

let imgdiv = document.getElementById("image");
let title = document.getElementById("title");
let story = document.getElementById("story");
let related_card = document.getElementById("box2");

ls.forEach((ele) => {
  let img = document.createElement("img");
  img.setAttribute("src", `${IMGPATH + ele.poster_path}`);
  imgdiv.append(img);
  title.innerHTML = ele.title;
  story.innerHTML = ele.overview;
});

getMovies(related_movie);
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData.results);
}
function showMovies(movies) {
  related_card.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movie_card = document.createElement("div");
    movie_card.classList.add("movie");
    movie_card.innerHTML = `
       <img src="${IMGPATH + poster_path}" alt="${title}"/>

     <div class="movie-info">
         <h3>${title}</h3>
     </div> 
     `;
    related_card.appendChild(movie_card);
  });
}
