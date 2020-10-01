import React from "react";
import "./App.css";
import axios from "axios";
import Calendar from "./calendar";
// import Login from "./login/login";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isLoggedIn: false,
      events: [],
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents(e) {
    e.preventDefault();
    if (this.state.isLoggedIn) {
      const url = "http://localhost:3000/events";

      // make more secure solution
      let token = localStorage.getItem("accessToken");
      // console.log(token);
      const headers = {
        Authorization: "Bearer " + token,
      };

      axios
        .get(url, {
          headers: headers,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) this.setState({ events: res.data });
          console.log(this.state.events);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  onChangeValue = (event) => {
    this.setState({ username: event.target.value });
    // console.log(this.state);
  };

  handleSubmit(e) {
    e.preventDefault();

    const url = "http://localhost:4000/login";
    const user = {
      username: this.state.username,
    };

    const headers = {
      "Content-Type": "application/json",
      // Authorization: "JWT fefege...",
    };

    axios
      .post(url, user, {
        headers: headers,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) this.setState({ isLoggedIn: true });
        localStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const events = this.state.events;
    return (
      <>
        <h2>log in</h2>
        <form onSubmit={this.handleSubmit}>
          <label>User name</label>
          <input
            type="text"
            placeholder="User name"
            onChange={this.onChangeValue}
            value={this.state.value}
          />
          <button type="button" onClick={this.handleSubmit}>
            log in
          </button>
        </form>
        {isLoggedIn && <p>Du är inloggad som {this.state.username}</p>}
        <button onClick={this.getEvents}>events</button>

        {events.map((event, index) => (
          <div
            key={index}
            className="event-container"
            // style={Object.assign({})}
          >
            <ul>
              <li>Event date: {event.date}</li>
              <li>Is booked: {String(event.isBooked)}</li>
              <li>Event creator: {event.creator}</li>
              <li>Created date: {event.postDate}</li>
            </ul>
          </div>
        ))}
        <Calendar events={events} />
      </>
    );
  }
}

export default LoginForm;
