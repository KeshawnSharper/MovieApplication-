import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MovieCard from "./MovieCard";
import { connect } from "react-redux";

import {
  getNowPlaying,
  getTopRated,
  getPopular,
  getUpcoming,
  getSearch
} from "../../actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const MovieList = (props) => {
  const {
    nowPlaying,
    search,
    latest,
    popular,
    movieList,
    upcoming,
    topRated,
    favorites,
    recommended
  } = props;
  const classes = useStyles();
  console.log(movieList);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={3}></Grid>
        {movieList === "nowPlaying" ? (
          <>
            {nowPlaying[0] ? (
              <>
                {nowPlaying[0].results.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"nowPlaying"} movie={movie} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "popular" ? (
          <>
            {popular[0] ? (
              <>
                {popular[0].results.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"popular"} movie={movie} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "upcoming" ? (
          <>
            {upcoming[0] ? (
              <>
                {upcoming[0].results.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard movie={movie} list={"upcoming"} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "topRated" ? (
          <>
            {topRated[0] ? (
              <>
                {topRated[0].results.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"topRated"} movie={movie} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "search" ? (
          <>
            {search[0] ? (
              <>
                {search[0].results.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"search"} movie={movie} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "favorites" ? (
          <>
            {favorites ? (
              <>
                {favorites.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"favorites"} movie={movie} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "recommended" ? (
          <>
            {recommended ? (
              <>
                {recommended.map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"recommended"} movie={movie} />
                  </Grid>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    popular: state.popular,
    upcoming: state.upcoming,
    topRated: state.topRated,
    search: state.search,
    favorites: state.favorites,
    recommended: state.recommended
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getNowPlaying: (id) => {
      dispatch(getNowPlaying());
    },
    getPopular: (id) => {
      dispatch(getPopular());
    },
    getUpcoming: (id) => {
      dispatch(getUpcoming());
    },
    getTopRated: (id) => {
      dispatch(getTopRated(id));
    },
    getSearch: (id) => {
      dispatch(getSearch(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
