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
    this.addEvent = this.addEvent.bind(this);
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

  addEvent(e) {
    e.preventDefault();
    console.log("hej");
    const url = "http://localhost:3000/events/";
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
              <th colSpan="4">
                <h2>Add event</h2>
              </th>
            </tr>
            <tr>
              <th colSpan="2">Date</th>
              <th>Is booked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">
                <div className="box">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      onChange={this.onChangeValue}
                      onSubmit={() => this.addEvent()}
                      name="dateInput"
                      id="dateInput"
                      className="form-control"
                      placeholder="Event date"
                    />
                    <label htmlFor="dateInput" className="control-label">
                      Event date
                    </label>
                  </div>
                </div>
              </td>
              <td>
                <div className="box">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      onChange={this.onChangeValue}
                      onSubmit={() => this.addEvent()}
                      name="isBookedInput"
                      id="isBookedInput"
                      className="form-control"
                      placeholder="true/false"
                    />
                    <label htmlFor="isBookedInput" className="control-label">
                      Is booked
                    </label>
                  </div>
                </div>
              </td>
              <td>
                <button type="button" id="get-events" onClick={this.addEvent}>
                  Add Event
                </button>
              </td>
            </tr>
          </tbody>

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
