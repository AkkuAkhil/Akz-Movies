const request = new XMLHttpRequest();
const containt = document.querySelector(".containt");

//Selecting Navigation Bar Buttons
const trendingMoviesBtn = document.querySelector(".trending");
const popularMoviesBtn = document.querySelector(".popular");
const topRatedMoviesBtn = document.querySelector(".top_rated");
const upcomingMoviesBtn = document.querySelector(".upcoming");

const allButtons = document.querySelectorAll(".nav__link");

//Function recieves input and display movies accordingly
const displayMovies = function () {
  //Nav Button Selection
  const splitArray = this.split("/");
  const className =
    splitArray[splitArray.length - 1] === "day"
      ? splitArray[0]
      : splitArray[splitArray.length - 1];

  //Removing Not Active class from current clicked Button
  allButtons.forEach((btn) => {
    if (btn.classList.contains(className))
      btn.classList.remove("nav__not--active");
    else btn.classList.add("nav__not--active");
  });

  //Requesting data
  const getURL = `https://api.themoviedb.org/3/${this}?api_key=04b581f83019bf29c2854ac454ed6747&language=en-US&page=1`;
  request.open("GET", getURL, true);
  request.onload = function () {
    // Begin accessing JSON data here
    const jsonData = JSON.parse(this.response);
    const data = jsonData.results;

    if (request.status >= 200 && request.status < 400) {
      //Emptying the containt window for displaying new datas
      containt.innerHTML = "";
      data.forEach((movie) => {
        //Movie Click Link Creation
        const movieName = movie.title;
        const nameURL = movieName.toLowerCase().split(" ").join("-");
        const movieURL = `https://www.themoviedb.org/movie/${movie.id}-${nameURL}`;

        //Movie Date Setup
        const movieDate = new Date(movie.release_date);
        const movieDateOptions = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const intlDate = new Intl.DateTimeFormat(
          "en-IN",
          movieDateOptions
        ).format(movieDate);

        //Movie poster Creation
        const html = `<div class="moviecard">
          <a href="${movieURL}" target="_blank">
            <div class="poster">
                <img
                  src="https://image.tmdb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}"
                  class="poster_image"
                  alt=""
                />
            </div>
            <div class="moviedetais">
              <p class="moviename">${movieName}</p>
              <p class="moviedate">${intlDate}</p>
            </div>
          </a>
        </div>`;

        //Appending all poster into containt window
        containt.innerHTML += html;
      });
    } else {
      console.log("error");
    }
  };
  request.send();
};
displayMovies.apply("trending/movie/day");

//Adding Event Listners to Navigation Buttons
trendingMoviesBtn.addEventListener(
  "click",
  displayMovies.bind("trending/movie/day")
);
popularMoviesBtn.addEventListener("click", displayMovies.bind("movie/popular"));
topRatedMoviesBtn.addEventListener(
  "click",
  displayMovies.bind("movie/top_rated")
);
upcomingMoviesBtn.addEventListener(
  "click",
  displayMovies.bind("movie/upcoming")
);
