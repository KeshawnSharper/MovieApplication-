import React, { Component } from "react";
import "./MovieCard.css";
import MovieProfile from "./MovieProfile";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export default class MovieCard extends Component {
  render() {
    const { movie, list } = this.props;
    let stars_earned = [];
    let stars_not_earned = [];
    for (let i = 1; i <= 5 - (10 - Math.floor(movie.vote_average)); i++) {
      stars_earned.push(i);
    }
    if (stars_earned.length === 0) {
      stars_not_earned = [1, 2, 3, 4, 5];
    }
    for (let i = stars_earned[stars_earned.length - 1] + 1; i <= 5; i++) {
      stars_not_earned.push(i);
    }

    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Avatar"
              style={{ borderRadius: "25px", width: "300px", height: "300px" }}
            />
          </div>
          <div className="flip-card-back" style={{ backgroundColor: "black" }}>
            <MovieProfile
              movie={movie}
              list={list}
              stars_earned={stars_earned}
              stars_not_earned={stars_not_earned}
            />
          </div>
        </div>
      </div>
    );
  }
}
