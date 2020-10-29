import React from "react";
import "../App.css";
import axios from "axios";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isLoggedIn: false,
      // isAdmin: "false",
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  onChangeValue = (event) => {
    this.setState({ username: event.target.value });
  };

  loginUser(e) {
    e.preventDefault();

    const url = "http://localhost:4000/login";
    const user = {
      name: this.state.username,
    };

    axios
      .post(url, user)
      .then((res) => {
        if (res.status === 200)
          this.setState({
            isLoggedIn: true,
            // isAdmin: res.data.result.isAdmin,
          });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("username", this.state.username);
        // localStorage.setItem("isLoggedIn", this.state.isLoggedIn);
        // console.log(res.data);
        this.props.isAdmin(res.data.result.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logOutUser(e) {
    e.preventDefault();

    const url = "http://localhost:4000/logout";
    let test = localStorage.getItem("accessToken");

    const token = {
      token: test,
    };

    axios
      .delete(url, token)
      .then((res) => {
        console.log(res.status);
        if (res.status === 204)
          this.setState({
            isLoggedIn: false,
          });
        this.props.isAdmin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <h2>log in</h2>
        <form onSubmit={this.loginUser}>
          <label>User name</label>
          <input
            type="text"
            className="login-form"
            placeholder="User name"
            onChange={this.onChangeValue}
            value={this.state.value}
          />
          <button type="button" id="login-button" onClick={this.loginUser}>
            log in
          </button>
          <button type="button" id="login-button" onClick={this.logOutUser}>
            log out
          </button>
        </form>

        {/* <button onClick={() => this.props.isAdmin(this.state.isAdmin)}>
          test
        </button> */}
      </>
    );
  }
}

export default LoginForm;
