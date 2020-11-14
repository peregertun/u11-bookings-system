import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import Login from "./icons/login.png";
import Calendar from "./icons/calendar.png";
import Users from "./icons/users.png";

export default function Navigation(props) {
  let user = props.user;

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
