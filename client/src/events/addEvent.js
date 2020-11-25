import React from "react";
import "../App.css";
import axios from "axios";

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
    };
    this.addEvent = this.addEvent.bind(this);
  }

  addEvent(e) {
    e.preventDefault();

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
        date: this.props.selectedDay,
        isBooked: this.state.isBookedInput,
        creator: name,
      },
    };

    axios
      .post(url, config)
      .then((res) => {
        console.log(res);
        //rerender med nytt event
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
    return (
      <>
        <table>
          <thead>
            <tr>
              <th colSpan="4">
                <h2>Add event</h2>
              </th>
            </tr>
            <tr>
              <th colSpan="1">Date</th>
              <th colSpan="3">Is booked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="box">{this.props.selectedDay}</div>
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
        </table>
      </>
    );
  }
}

export default AddEvent;
