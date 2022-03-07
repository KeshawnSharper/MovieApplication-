import React, { Component } from "react";
import "./MovieCard.css";
import MovieProfile from "./MovieProfile";
import { FaHeart } from 'react-icons/fa'
import { addFavorite,deleteFavorite } from "../../actions/actions";
import { connect } from "react-redux";

class MovieCard extends Component {
  constructor(props){
    super(props)
    this.addFavorite = this.props.addFavorite.bind(this)
    this.deleteFavorite = this.props.deleteFavorite.bind(this)
  }

  render() {
    console.log(this.props)
    const { movie, list,user } = this.props;
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
    const handleClick = () => {
      if(this.props.favorite_obj[movie.movie_id] || this.props.favorite_obj[movie.id]){
        console.log("delete")
        if(movie.movie_id){
          this.deleteFavorite(movie.id,null)
        }
        else{
          console.log(movie)
        this.deleteFavorite("dont",movie.id)
        }
      }
      else{
      console.log("hello")
      movie.userID = user.id
      this.addFavorite(movie)
      }
    }
    console.log(this.props.favorite_obj)
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
           <div onClick={() => handleClick()}>
             {this.props.favorite_obj ? 
             <>
             {/* {movie.movie_id ?
             <>
             <FaHeart  style={{"cursor":"pointer"}} color={this.props.favorite_obj[movie.movie_id] === true ? "red": "white"}/>
             <p>{this.props.favorite_obj[movie.movie_id] === true ? "(Click on heart to delete from favorties)" : "(Click on heart to add to favorties)"}</p>
             </>
             :
            <FaHeart  style={{"cursor":"pointer"}} color={this.props.favorite_obj[movie.id] === true ? "red": "white"}/>
            } */}

            </>
            : 
            null
          }
           
           </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    favorite_obj:state.favorite_obj,
    user:state.user
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (movie) => {
      dispatch(addFavorite(movie));
    },
    deleteFavorite: (id,movie_id) => {
      dispatch(deleteFavorite(id,movie_id))
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(MovieCard);
