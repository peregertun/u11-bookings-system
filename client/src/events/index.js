import React from "react";
import "../App.css";
import axios from "axios";

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isLoggedIn: false,
      // isAdmin: "false",
      events: [],
    };
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents(e) {
    e.preventDefault();

    const url = "http://localhost:3000/events";
    let token = localStorage.getItem("accessToken");
    let name = localStorage.getItem("username");

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },

      params: {
        name: name,
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        if (res.status === 200) this.setState({ events: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    // () => this.props.Test(this.state.events);
  }

  render() {
    const events = this.state.events;

    return (
      <>
        <button onClick={this.getEvents}>Get Events</button>
        <button
          onClick={() => {
            this.props.Test(events);
          }}
        >
          Populate calendar
        </button>

        <table>
          <thead>
            <tr>
              <th>Event date:</th>
              <th>Is booked:</th>
              <th>Event creator:</th>
              <th>Created date:</th>
            </tr>
          </thead>
          <tbody className="event-container" style={Object.assign({})}>
            {events &&
              events.map((event, index) => (
                <tr key={index}>
                  <td>{event.date}</td>
                  <td>{String(event.isBooked)}</td>
                  <td>{event.creator}</td>
                  <td>{event.postDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Events;
