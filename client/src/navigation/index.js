import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";

import Login from "./icons/login.png";
import Calendar from "./icons/calendar.png";
import Users from "./icons/users.png";

// export default function Navigation(props) {
class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.updateToken();
  }

  updateToken() {
    const url = "http://localhost:4000/token";
    let refreshToken = localStorage.getItem("refreshToken");
    
    if (refreshToken === null ){
      return;
    }

    const tokenObject = {
      token: refreshToken,
    };

    axios
      .post(url, tokenObject)
      .then((res) => {
        console.log(res);
        if (res.status === 200){ 
          this.props.loginUser(res.data.user);
        }
      })
      .catch((err) => {
        // console.log(err);
        console.log("utloggad");
        localStorage.clear();
        this.props.logOutUser();
        //är detta ett bra sätt att logga ut om token inte är ok?
      });
  }

  render() {
    let user = this.props.user;

    return (
      <nav>
        <ul>
          <li>
            <Link to="/login">
              <img alt="login" src={Login} />
              <p>Log in</p>
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <img alt="calendar" src={Calendar} />
              <p>Calendar</p>
            </Link>
          </li>
          {user.isAdmin && (
            <li>
              <Link to="/users">
                <img alt="users" src={Users} />
                <p>Users</p>
              </Link>
            </li>
          )} 
          {user.name && <p>Logged in as: {user.name}</p>}
        </ul>
      </nav>
    );
  }
}
export default Navigation;
