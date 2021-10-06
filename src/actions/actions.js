import axios from "axios";

export function getNowPlaying(id = 1) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=${id}`
      )
      .then((res) => {
        dispatch({ type: "GET_NOW_PLAYING", nowPlaying: res.data });
      });
  };
}

export function getPopular(id = 1) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=${id}`
      )
      .then((res) => {
        dispatch({ type: "GET_POPULAR", popular: res.data });
      });
  };
}
export function getUpcoming(id = 1) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=${id}`
      )
      .then((res) => {
        dispatch({ type: "GET_UPCOMING", upcoming: res.data });
      });
  };
}
export function getSearch(movie) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&query=${movie}&page=1`
      )
      .then((res) => {
        dispatch({ type: "GET_SEARCH", search: res.data });
      });
  };
}
export function getTopRated() {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=1`
      )
      .then((res) => {
        dispatch({ type: "GET_TOP_RATED", topRated: res.data });
      });
  };
}
export function getMovieInfo(id) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US`
      )
      .then((res) => {
        dispatch({ type: "GET_MOVIE_INFO", movieInfo: res.data });
      });
  };
}
export function getFavorites() {
  return (dispatch) => {
    axios
      .get(
        `https://movieapplication1.herokuapp.com/savedMovies/${Number(
          localStorage.getItem("id")
        )}`
      )
      .then((res) => {
        dispatch({ type: "GET_FAVORITES", favorites: res.data });
      });
  };
}
export function getRecommended() {
  return (dispatch) => {
    axios
      .get(
        `https://movieapplication1.herokuapp.com/recommendedMovies/${localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        dispatch({ type: "GET_RECOMMEDED", recommended: res.data });
      });
  };
}
export function addFavorite(movie, list) {
  let new_movie = {
    user_id: Number(localStorage.getItem("id")),
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.release_date
  };
  if (movie.movie_id) {
    new_movie.movie_id = movie.movie_id;
  } else {
    new_movie.movie_id = movie.id;
  }
  return (dispatch) => {
    addRecommedations(movie.id);
    console.log(new_movie);
    axios
      .post(`https://movieapplication1.herokuapp.com/saveMovies`, new_movie)
      .then((res) => {
        dispatch({ type: "ADD_FAVORITE", new_movie: new_movie });
      });
  };
}
export function deleteFavorite(id) {
  deleteRecommedations(id);
  return (dispatch) => {
    axios
      .delete(
        `https://movieapplication1.herokuapp.com/deleteMovie/${id}/${Number(
          localStorage.getItem("id")
        )}`
      )
      .then((res) => {
        dispatch({ type: "DELETE_FAVORITE", movie: id });
      });
  };
}
export function addRecommedations(movie_id) {
  let recommendations = [];
  // let new_movie = {
  //     user_id: Number(localStorage.getItem("id")),
  //     movie_id: recommendation.id,
  //     title: recommendation.title,
  //     poster_path: recommendation.poster_path,
  //     vote_average: recommendation.vote_average,
  //     overview: recommendation.overview,
  //     recommended_movie_id: movie_id,
  //     release_date: recommendation.release_date
  // }
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=1`
    )
    .then((res) => {
      res.data.results.map((result) => {
        recommedations(result, movie_id);
      });
    });
}
export function recommedations(movie, recommended_movie) {
  let new_movie = {
    user_id: Number(localStorage.getItem("id")),
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    recommended_movie_id: recommended_movie,
    release_date: movie.release_date
  };

  axios
    .post(`https://movieapplication1.herokuapp.com/recommendedMovies`, new_movie)
    .then((res) => {
      console.log(res.data);
    });
}
export function deleteRecommedations(movie_id) {
  let body = {
    movie_id: movie_id,
    user_id: Number(localStorage.getItem("id"))
  };
  return (dispatch) => {
    axios
      .delete(
        `https://movieapplication1.herokuapp.com/${movie_id}/${Number(
          localStorage.getItem("id")
        )}`
      )
      .then((res) => {
        dispatch({ type: "DELETE_RECOMMENDED", recommended_movie: movie_id });
      });
  };
}

export function getUser() {
  return (dispatch) => {
    axios
      .get(
        `https://movieapplication1.herokuapp.com/users/${localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        if (res.data === []) {
          localStorage.clear();
        }
        console.log("get", res.data);
        dispatch({ type: "GET_USER", user: res.data[0] });
      });
  };
}
export function editUser(user) {
  user.id = Number(localStorage.getItem("id"));
  return (dispatch) => {
    axios
      .put(`https://movieapplication1.herokuapp.com/users`, user)
      .then((res) => {
        dispatch({ type: "UPDATE_USER", updated_user: user });
      });
  };
}
