import React from "react";
// import "../App.css";
import axios from "axios";

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.login = this.login.bind(this);
  }

  onChangeValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login(e) {
    e.preventDefault();
    const url = "http://localhost:4000/signup";
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    
    axios
      .post(url, user)
      .then((res) => {
        if (res.status === 200){
          localStorage.clear();
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          this.props.loginUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={this.login}>
          <label>User name</label>
          <input
            type="text"
            className="login-form"
            name="username"
            placeholder="User name"
            onChange={this.onChangeValue}
            value={this.state.value}
          />
          <label>Password</label>
          <input
            type="text"
            className="login-form"
            name="password"
            placeholder="Password"
            onChange={this.onChangeValue}
            value={this.state.value}
          />
          <button type="button" id="login-button" onClick={this.login}>
            Sign Up
          </button>
        </form>
      </>
    );
  }
}

export default SignUpForm;
