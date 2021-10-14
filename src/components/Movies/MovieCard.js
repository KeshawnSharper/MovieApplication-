import React, { Component } from "react";
import "./MovieCard.css";
import MovieProfile from "./MovieProfile";
import { FaHeart } from 'react-icons/fa'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { addFavorite } from "../../actions/actions";
import { connect } from "react-redux";

class MovieCard extends Component {
  constructor(props){
    super(props)
    this.addFavorite = this.props.addFavorite.bind(this)
  }

  render() {
    console.log(this.addFavorite)
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
    const saveMovie = (movie) => {
      movie.userID = localStorage.getItem("id")
      axios.post("http://localhost:5000/saveMovie",movie).then(res => console.log(res))
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
            // Heart Icon that will change color depending on if the user has saved it.
           <div onClick={() => this.addFavorite(movie)}>
           <FaHeart  />
           </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (movie) => {
      dispatch(addFavorite(movie));
    }
  };
};
export default connect(null,mapDispatchToProps)(MovieCard);
