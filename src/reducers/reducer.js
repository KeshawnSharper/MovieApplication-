import initState from "./initState";

export const StoreReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_NOW_PLAYING":
      return {
        ...state,
        nowPlaying: [...state.nowPlaying, action.nowPlaying]
      };
    case "GET_POPULAR":
      return {
        ...state,
        popular: [...state.popular, action.popular]
      };
    case "GET_LATEST":
      return {
        ...state,
        latest: [...state.latest, action.latest]
      };
    case "GET_TOP_RATED":
      return {
        ...state,
        topRated: [...state.topRated, action.topRated]
      };
    case "GET_UPCOMING":
      return {
        ...state,
        upcoming: [...state.upcoming, action.upcoming]
      };
    case "GET_SEARCH":
      return {
        ...state,
        search: [action.search]
      };
    case "GET_MOVIE_INFO":
      return {
        ...state,
        movieInfo: action.movieInfo
      };
    case "GET_FAVORITES":
      let obj = {}
      action.payload.movies.map(movie => obj[movie.movie_id] = true)
      return {
        ...state,
        favorites: action.payload.movies,
        recommended:action.payload.recommendations,
        favorite_obj:obj
      };
    case "ADD_FAVORITE":
      let newObj = {}
      action.payload.movies.map(movie => newObj[movie.movie_id] = true)
      return {
        ...state,
        favorites: [...state.favorites,action.movie],
        recommended:action.payload.recommendations,
        favorite_obj:newObj
      };
    case "DELETE_FAVORITE":
      let delObj = {}
      action.payload.movies.map(movie => delObj[movie.movie_id] = true)
      return {
        ...state,
        favorites: state.favorites.filter((favorite) => {
          return favorite.id !== action.id;
        }),
        favorite_obj:delObj
      };
    case "ADD_RECOMMEDED":
      return {
        ...state,
        recommended: [...state.recommended, action.recommendation]
      };
    case "GET_RECOMMEDED":
      return {
        ...state,
        recommended: action.recommended
      };

    case "DELETE_RECOMMENDED":
      return {
        ...state,
        recommended: state.recommended.filter((recommendation) => {
          return (
            recommendation.recommended_movie_id !== action.recommended_movie
          );
        })
      };
    case "GET_USER":
      return {
        ...state,
        user: action.user
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.updated_user
      };
    default:
      return initState;
  }
};
