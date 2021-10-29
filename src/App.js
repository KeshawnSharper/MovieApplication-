import React, { useEffect} from "react";
import "./styles.css";
import Home from "./components/Home/Home";
import Login from "./components/Authenication/Login";
import Register from "./components/Authenication/Register";
import { useHistory } from "react-router-dom";

import {
  getNowPlaying,
  getTopRated,
  getPopular,
  getUpcoming,
  getFavorites,
  getUser
} from "./actions/actions";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
function App(props) {
  useEffect(() => {
    console.log("App", props);

    props.getNowPlaying();
    props.getPopular();
    props.getUpcoming();
    props.getTopRated();
    if (localStorage.getItem("id")){
      props.getFavorites();
      props.getUser();
    }
  }, []);
  return (
    <div className="App">
      <Router>
        {/* <Provider> */}
        <Switch>
          <Route exact path="/">
            {
              localStorage.getItem("token") ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )
            }
          </Route>
          <Route exact path="/register">
            <Register history={useHistory()} />
          </Route>
          <Route exact path="/login">
            <Login history={useHistory()} />
          </Route>
          <ProtectedRoute exact path="/home" component={Home} />
          {/* <Route exact path="/search/:num" component={Search} />
    //     <Route exact path="/product/:num" component={Product} /> */}
        </Switch>
        {/* </Provider> */}
      </Router>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    upcoming: state.upcoming,
    topRated: state.topRated,
    favorites: state.favorites,
    recommended: state.recommended
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getNowPlaying: () => {
      dispatch(getNowPlaying());
    },
    getPopular: () => {
      dispatch(getPopular());
    },
    getUpcoming: () => {
      dispatch(getUpcoming());
    },
    getTopRated: () => {
      dispatch(getTopRated());
    },
    getFavorites: () => {
      dispatch(getFavorites());
    },
    getUser: () => {
      dispatch(getUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
