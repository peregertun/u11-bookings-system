import React from "react";
import "../App.css";
import axios from "axios";

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };

    this.getEvents = this.getEvents.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  componentDidMount() {
    this.getEvents();
  }

  async getEvents() {
    const url = "https://u11-bookings-system-backend.herokuapp.com/events";
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
    await axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) this.setState({ events: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.Test(this.state.events);
  }

  addEvent(e) {
    e.preventDefault();
    console.log("hej");
    const url = "https://u11-bookings-system-backend.herokuapp.com/events/";
    let token = localStorage.getItem("accessToken");
    let name = localStorage.getItem("username");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },

      user: {
        name: name,
      },
      event: {
        date: this.state.dateInput,
        isBooked: this.state.isBookedInput,
        creator: name,
      },
    };

    axios
      .post(url, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeValue = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  render() {
    const events = this.state.events;

    return (
      <>
        {/* <button onClick={this.getEvents}>Get Events</button>
        <button
          onClick={() => {
            this.props.Test(events);
          }}
        >
          Populate calendar
        </button> */}

        <table>
          <thead>
            <tr>
              <th colSpan="4">
                <h2>All events</h2>
              </th>
            </tr>

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
