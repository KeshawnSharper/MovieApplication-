import React, { Component } from "react";
import "./Register.css";
import Facebook from "../Facebook";
import axios from "axios";
import Google from "../GoogleAuth/Google";
import { Link } from "react-router-dom";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user_name: "",
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        picture:
          "https://res.cloudinary.com/di449masi/image/upload/v1607974203/avatar-icon-design-for-man-vector-id648229986_cpib40.jpg"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = () => {
    axios
      .post("https://movieapplication1.herokuapp.com/register", this.state.user)
      .then((res) => {
        axios
          .post("https://movieapplication1.herokuapp.com/login", {
            email: this.state.user.email,
            password: this.state.user.password
          })
          .then((res) => console.log(res.data));
      });
  };
  render() {
    return (
      <div className="login-box">
        <h2 style={{ color: "white" }}>Register</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="user_name"
              onChange={(e) => this.handleChange(e)}
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="first_name"
              onChange={(e) => this.handleChange(e)}
              required
            />
            <label>First Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="last_name"
              onChange={(e) => this.handleChange(e)}
              required
            />
            <label>Last Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="email"
              onChange={(e) => this.handleChange(e)}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={(e) => this.handleChange(e)}
              name="password"
              required
            />
            <label>Password</label>
          </div>

          <a href="#" onClick={this.handleSubmit}>
            <span />
            <span />
            <span />
            <span />
            Register
          </a>

          <div style={{ display: "inline-flex" }}></div>
        </form>
        <br />

        <h2>
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">
            Login here
          </Link>
        </h2>
      </div>
    );
  }
}
