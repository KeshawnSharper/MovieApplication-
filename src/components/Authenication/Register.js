import React, { Component } from "react";
import "./Register.css";
import Facebook from "../Facebook";
import axios from "axios";
import Google from "../GoogleAuth/Google";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Login from "./Login";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user_name: "",
        first_name: "",
        last_name: "",
        password: "",
        re_password:"",
        email: "",
        picture:
          "https://res.cloudinary.com/di449masi/image/upload/v1607974203/avatar-icon-design-for-man-vector-id648229986_cpib40.jpg"
        
        },
      loading:false,
      error:{message:""}
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
    console.log(this.state.user)
    if (!Object.keys(this.state.user).every(prop => this.state.user[prop] !== "")){
      return this.setState({...this.state,error:{...this.state.error,message:"Please Fill all fields"}})
    }
    if (this.state.user.re_password !== this.state.user.password){
      return this.setState({...this.state,error:{...this.state.error,message:"Passwords don't match"}})
    }
    this.setState({
      ...this.state,
      loading: true
    })
    axios
      .post("http://localhost:5000/register", this.state.user)
      .then((res) => {
        console.log("hello")
        axios.post(`http://localhost:5000/login`, this.state.user).then((res) => {
        this.setState({...this.state,loading:false})
        localStorage.setItem(`token`, res.data.token);
        localStorage.setItem(`id`, res.data.userid);
        localStorage.setItem(`email`, res.data.email);
        localStorage.setItem(`user`, JSON.stringify(res.data));
        this.props.history.push("/home");
        window.location.reload(false);
      })
      })
      .catch(err => {
        console.log(err)
        this.setState({...this.state,error:{...this.state.error,message:err.response.data.message},loading:false})})
        console.log(this.state.error)
    }
  render() {
    return (
      <>
      {
        this.state.loading ?
        (
      <div style={{"background":"black","margin":"0 auto"}}>
    <Loader style={{"margin":"0 auto","textAlign":"center"}}type="Puff" color="#00BFFF" /> 
    <h2 style={{"color":"white","textAlign":"center"}}>Authenicating</h2>
    </div>
        )
        :
      <div className="login-box">
        <h2 style={{ color: "white"}}>Register</h2>
        <p style={{ color: "red","marginBottom":"20px"  }}>{this.state.error.message !== "" ? this.state.error.message : null}</p>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="user_name"
              onChange={(e) => this.handleChange(e)}
              value={this.state.user.user_name}
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="first_name"
              onChange={(e) => this.handleChange(e)}
              value={this.state.user.first_name}
              required
            />
            <label>First Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="last_name"
              onChange={(e) => this.handleChange(e)}
              value={this.state.user.last_name}
              required
            />
            <label>Last Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="email"
              onChange={(e) => this.handleChange(e)}
              value={this.state.user.email}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={(e) => this.handleChange(e)}
              name="password"
              value={this.state.user.password}
              required
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={(e) => this.handleChange(e)}
              value={this.state.user.re_password}
              name="re_password"
              required
            />
            <label>Password</label>
          </div>

          <a onClick={() => this.handleSubmit()}>
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
  }
  </>
    );
  }
}
