import React, { Component} from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Google from "../GoogleAuth/Google";
import axios from "axios";
import Loader from "react-loader-spinner";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoogleValidated: false,
      isFacebookValidated: false,
      googleUser: {},
      facebookUser: {},
      user: {},
      loading:false,
      error:{message:""}
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
    this.setState({...this.state,loading:true})
    console.log(this.state)
    axios
      .post(`https://movieapplication1.herokuapp.com/login`, this.state.user)
      .then((res) => {
        this.setState({...this.state,loading:false})
        localStorage.setItem(`token`, res.data.token);
        localStorage.setItem(`id`, res.data.userid);
        localStorage.setItem(`email`, res.data.email);
        localStorage.setItem(`user`, JSON.stringify(res.data));
        
        this.props.history.push("/home");
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err)
        this.setState({...this.state,loading:false})
        this.setState({...this.state,error:{...this.state.error,message:err.response.data.message},loading:false})
      })
  };
  SubmitGoogleUser = (user) => {
              axios.post(`https://movieapplication1.herokuapp.com/loginGoogle/google_${JSON.parse(localStorage.getItem("google_temp_user")).googleId}`,JSON.parse(localStorage.getItem("google_temp_user")))
                .then((res) => {
                  localStorage.setItem(`id`, res.data.id);
                  localStorage.setItem(`token`, res.data.token);
                  localStorage.setItem("user",JSON.stringify(res.data))
                  this.props.history.push("/home");
                  window.location.reload(false);
                })
                .catch(err => console.log(err))
           
        } 
 

  SubmitFacebookUser = (user) => {
    console.log("hi")
    if (localStorage.getItem("Facebook_Temp_User")){
   axios.post(`https://movie-app-be.herokuapp.com/loginFacebook/Facebook_${JSON.parse(localStorage.getItem("Facebook_Temp_User")).id}`,JSON.parse(localStorage.getItem("Facebook_Temp_User")))
   .then(res => {
console.log()
    localStorage.setItem("user",res.data)
    // this.props.history.push("/home");
    // window.location.reload(false);
  })
    }
  }
  componentDidMount() {
    alert("if you dont want to register use the following credentials to see the demo... {Email: dummy@email.com,Password: p@sSword101}")
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
        <h2>Login</h2>
        <p style={{ color: "red","marginBottom":"20px"  }}>{this.state.error.message !== "" ? this.state.error.message : null}</p>
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
          <button type="button" className="loginButton" onClick={() => this.Login()}>
            
            Login
          </button>
          <br />
          <br />
          {/* <p style={{"color":"white","width":"100%"}}> (May need to clear browsing data, cache and/or allow popups to sign in with Google)</p>
<br />
          <div style={{ display: "inline-flex" }}>
            <Google  SubmitGoogleUser={() => this.SubmitGoogleUser()} /> */}
            {/* Removing the Facebook login until I find a way for it to not login on render */}
            {/* <Facebook SubmitFacebookUser={() => this.SubmitFacebookUser()} /> */}
          {/* </div> */}
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
      }
      </>
    );
  }
}
