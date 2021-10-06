import React, { Component, useState } from "react";
import "./Login.css";
import Facebook from "../Facebook";
import { Link } from "react-router-dom";
import Google from "../GoogleAuth/Google";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoogleValidated: false,
      isFacebookValidated: false,
      googleUser: {},
      facebookUser: {},
      user: {}
    };
    this.SubmitGoogleUser = this.SubmitGoogleUser.bind(this);
    this.SubmitFacebookUser = this.SubmitFacebookUser.bind(this);
    this.Login = this.Login.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  }
  Login = () => {
    axios
      .post(`http://localhost:5000/login`, this.state.user)
      .then((res) => {
        localStorage.setItem(`token`, res.data.token);
        localStorage.setItem(`id`, res.data.userid);
        localStorage.setItem(`email`, res.data.email);
        localStorage.setItem(`picture`, res.data.picture);
        localStorage.setItem(`first_name`, res.data.first_name);
        localStorage.setItem(`last_name`, res.data.last_name);
        localStorage.setItem(`user_name`, res.data.user_name);
        this.props.history.push("/home");
        window.location.reload(false);
      });
  };
  SubmitGoogleUser = (user) => {
    console.log(JSON.parse(localStorage.getItem("google_temp_user")).googleId)
    this.setState({ googleUser: user });
              axios.post(`http://localhost:5000/loginGoogle/google_${JSON.parse(localStorage.getItem("google_temp_user")).googleId}`,JSON.parse(localStorage.getItem("google_temp_user")))
                .then((res) => {
                  localStorage.setItem(`google_id`, res.data.google_id);
                  localStorage.setItem(`token`, res.data.token);
                  localStorage.setItem(`id`, res.data.userid);
                  localStorage.setItem(`email`, res.data.google_email);
                  localStorage.setItem(`picture`, res.data.picture);
                  localStorage.setItem(`first_name`, res.data.first_name);
                  localStorage.setItem(`last_name`, res.data.last_name);
                  localStorage.setItem(`user_name`, res.data.user_name);
                  this.props.history.push("/home");
                  window.location.reload(false);
                })
                .catch(err => console.log(err))
           
        } 
 

  SubmitFacebookUser = (user) => {
    this.setState({ facebookUser: user });
    axios
      .get(
        `http://localhost:5000/facebookuser/${this.state.facebookUser.id}`
      )
      .then((res) => {
        this.setState({ isFacebookValidated: res.data });
        if (!this.state.isFacebookValidated) {
          axios
            .post(`http://localhost:5000/register`, {
              user_name: this.state.facebookUser.name,
              first_name: this.state.facebookUser.name,
              last_name: this.state.facebookUser.name,
              picture: this.state.facebookUser.picture.data.url,
              facebook_email: this.state.facebookUser.email,
              facebook_id: Number(this.state.facebookUser.id),
              password:
                Math.random().toString(36).substring(7) +
                Math.random().toString(36).substring(7)
            })
            .then((res) => {
              axios
                .post(
                  `http://localhost:5000/loginFacebook/${Number(
                    this.state.facebookUser.id
                  )}`
                )
                .then((res) => {
                  localStorage.setItem(`facebook_id`, res.data.facebook_id);
                  localStorage.setItem(`token`, res.data.token);
                  localStorage.setItem(`id`, res.data.userid);
                  localStorage.setItem(`email`, res.data.facebook_email);
                  localStorage.setItem(`picture`, res.data.picture);
                  localStorage.setItem(`first_name`, res.data.first_name);
                  localStorage.setItem(`last_name`, res.data.last_name);
                  localStorage.setItem(`last_name`, res.data.last_name);
                  localStorage.setItem(`user_name`, res.data.user_name);
                  this.props.history.push("/home");
                  window.location.reload(false);
                });
            });
        } else {
          axios
            .post(
              `http://localhost:5000/loginFacebook/${Number(
                this.state.facebookUser.id
              )}`
            )
            .then((res) => {
              localStorage.setItem(`facebook_id`, res.data.facebook_id);
              localStorage.setItem(`token`, res.data.token);
              localStorage.setItem(`id`, res.data.userid);
              localStorage.setItem(`email`, res.data.facebook_email);
              localStorage.setItem(`picture`, res.data.picture);
              localStorage.setItem(`first_name`, res.data.first_name);
              localStorage.setItem(`last_name`, res.data.last_name);
              localStorage.setItem(`user_name`, res.data.user_name);
              this.props.history.push("/home");
              window.location.reload(false);
            });
        }
      });
  };

  render() {
    return (
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              onChange={(e) => this.handleChange(e)}
              type="text"
              name="email"
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              onChange={(e) => this.handleChange(e)}
              required
            />
            <label>Password</label>
          </div>
          <a href="#" onClick={this.Login}>
            <span />
            <span />
            <span />
            <span />
            Login
          </a>
          <br />
          <br />
          <div style={{ display: "inline-flex" }}>
            <Google SubmitGoogleUser={() => this.SubmitGoogleUser()} />
            <Facebook SubmitFacebookUser={() => this.SubmitFacebookUser()} />
          </div>
          <br />
        </form>
        <br />
        <h2>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/register"
          >
            Register here
          </Link>
        </h2>
      </div>
    );
  }
}
