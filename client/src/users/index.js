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
      display: false,
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
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) this.setState({ users: res.data });

      })
      .catch((err) => {
        console.log("Permission denied, admin status required to see users");
        console.log(err);
        this.props.logOutUser();

      });
  }

  getUser(e) {
    e.preventDefault();

    const url = "http://localhost:3000/users/5f68af787fa7e20d74b5845a";
    let token = localStorage.getItem("accessToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) this.setState({ user: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addUser() {
    const url = "http://localhost:3000/users/";
    let token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
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
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUser = (_id) => {
    const url = "http://localhost:3000/users/" + _id;
    let token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
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
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteUser = (_id) => {
    const url = "http://localhost:3000/users/" + _id;
    let token = localStorage.getItem("accessToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .delete(url, config)
      .then((res) => {
        console.log(res);
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unlockForm = (_id) => {
    this.setState({ display: !this.state.display });

    // this.editUser(_id);
  };

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
    let users = this.state.users;
    users = this.filterRows(users);
    let display = "display-" + this.state.display;

    return (
      <>
        <h1>Users</h1>

        <table className="users-table">
          <thead>
            <tr>
              <Header updateFilter={(value) => this._updateFilter(value)} />
            </tr>
          </thead>

          <thead>
            <tr>
              <th colSpan="4">
                <h2>Add user</h2>
              </th>
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

          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <form onSubmit={() => this.editUser(user._id)}>
                      <label htmlFor={"nameInput" + index}>{user.name}</label>
                      <input
                        type="text"
                        onChange={this.onChangeValue}
                        id={"nameInput" + index}
                        placeholder={user.name}
                        name="nameInput"
                        className={display}
                      />
                    </form>
                  </td>
                  <td>{user._id}</td>
                  <td>
                    <form onSubmit={() => this.editUser(user._id)}>
                      
                      <label htmlFor="isAdminInput">
                        {String(user.isAdmin)}
                      </label>
                      <input
                        type="text"
                        onChange={this.onChangeValue}
                        name="isAdminInput"
                        id={"isAdminInput" + user._id}
                        placeholder={String(user.isAdmin)}
                        className={display}
                      />
                      
                    </form>
                  </td>

                  <td className="buttons-td">
                    <button
                      className="table-button"
                      onClick={() => this.unlockForm(user._id)}
                    >
                      Edit
                    </button>

                    <button
                      className={display}
                      onClick={() => this.editUser(user._id)}
                    >
                      Update
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
