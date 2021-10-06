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
      return {
        ...state,
        favorites: action.favorites
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.new_movie]
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((favorite) => {
          return favorite.movie_id !== action.movie;
        })
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
