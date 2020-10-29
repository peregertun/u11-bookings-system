import React from "react";
import axios from "axios";
import "./styles.css";
import Header from "./header.js";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isLoggedIn: false,
      users: [],
      user: [],
      nameFilter: [],
    };
    this.getUsers = this.getUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.addUser = this.addUser.bind(this);
    // this.onChangeValue = this.onChangeValue.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    const url = "http://localhost:3000/users/";
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
        // console.log(res);
        if (res.status === 200) this.setState({ users: res.data });
        // console.log(this.state.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUser(e) {
    e.preventDefault();

    const url = "http://localhost:3000/users/5f68af787fa7e20d74b5845a";
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
        console.log(res);
        if (res.status === 200) this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addUser(e) {
    e.preventDefault();

    const url = "http://localhost:3000/users/";
    let token = localStorage.getItem("accessToken");
    let name = localStorage.getItem("username");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },

      user: {
        name: name,
      },
      newUser: {
        name: this.state.nameInput,
        isAdmin: this.state.isAdminInput,
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

  editUser = (_id) => {
    // e.preventDefault();
    // console.log(_id);
    console.log(this.state.newName);

    const url = "http://localhost:3000/users/" + _id;
    let token = localStorage.getItem("accessToken");
    let name = localStorage.getItem("username");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },

      user: {
        name: name,
      },

      newUser: {
        name: this.state.nameInput,
        isAdmin: this.state.isAdminInput,
      },
    };

    axios
      .patch(url, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteUser = (_id) => {
    console.log(_id);
    const url = "http://localhost:3000/users/" + _id;
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
      .delete(url, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // unlockForm = (_id) => {
  //   this.setState({ editForm: "true" });

  //   // this.editUser(_id);
  // };

  onChangeValue = (event) => {
    event.preventDefault();
    // console.log(event.target.name);
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
    // this.setState({ newName: event.target.value });
    // this.setState({ isAdmin: event.target.value });
    console.log(this.state);
    // console.log(this.state.isAdmin);
  };

  _updateFilter(value) {
    this.setState({ nameFilter: value.toLowerCase() });
  }

  filterRows(users) {
    return users.filter(
      (user) => user.name.toLowerCase().indexOf(this.state.nameFilter) !== -1
    );
  }

  render() {
    // const isLoggedIn = this.state.isLoggedIn;
    // let editForm = this.state.editForm;

    let users = this.state.users;
    users = this.filterRows(users);

    return (
      <>
        <h1>Users</h1>
        {/* <button type="button" id="get-events" onClick={this.getUsers}>
          Get Users
        </button> */}

        {/* <button type="button" id="get-events" onClick={this.getUser}>
          Get User
        </button> */}

        <table className="users-table">
          <thead>
            <tr>
              <Header updateFilter={(value) => this._updateFilter(value)} />
            </tr>
            <tr>
              <th colSpan="2">User name</th>
              <th>Is admin</th>
              <th>Actions</th>
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
                      onSubmit={() => this.addUser()}
                      name="nameInput"
                      id="nameInput"
                      className="form-control"
                      placeholder="Name"
                    />
                    <label htmlFor="nameInput" className="control-label">
                      Name
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
                      onSubmit={() => this.addUser()}
                      name="isAdminInput"
                      id="isAdminInput"
                      className="form-control"
                      placeholder="true/false"
                    />
                    <label htmlFor="isAdminInput" className="control-label">
                      Admin
                    </label>
                  </div>
                </div>
              </td>
              <td>
                <button type="button" id="get-events" onClick={this.addUser}>
                  Add User
                </button>
              </td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>User name</th>
              <th>User id</th>
              <th>Is admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* {user && <td>{user}</td>} */}

          <tbody>
            {users &&
              users.length > 1 &&
              users.map((user, index) => (
                <tr
                  key={index}
                  //   className="event-container"
                  //   style={Object.assign({})}
                >
                  <td>
                    <form onSubmit={() => this.editUser(user._id)}>
                      <label htmlFor={"nameInput" + index}>{user.name}</label>
                      <input
                        type="text"
                        onChange={this.onChangeValue}
                        id={"nameInput" + index}
                        placeholder={user.name}
                        name="nameInput"
                      />
                    </form>
                  </td>
                  <td>{user._id}</td>
                  <td>
                    <form onSubmit={() => this.editUser(user._id)}>
                      {/* <fieldset> */}
                      <label htmlFor="isAdminInput">
                        {String(user.isAdmin)}
                      </label>
                      <input
                        type="text"
                        onChange={this.onChangeValue}
                        name="isAdminInput"
                        id="isAdminInput"
                        placeholder={String(user.isAdmin)}
                      />
                      {/* </fieldset> */}
                    </form>
                  </td>

                  <td>
                    <button
                      className="table-button"
                      onClick={() => this.editUser(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="table-button"
                      onClick={() => this.deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Users;
