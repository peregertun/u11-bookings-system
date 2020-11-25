import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./index.css";

import Calendar from "./calendar";
import Login from "./login";
import Users from "./users";
import Navigation from "./navigation";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
    };

    this.loginUser = this.loginUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  loginUser(user) {
    this.setState({
      user: user,
    });
  }

  logOutUser() {
    console.log("removing user name from state");
    this.setState({
      user: "",
    });
  }

  render() {
    const user = this.state.user;

    return (
      <Router>
        <Navigation user={user} loginUser={this.loginUser} logOutUser={this.logOutUser} />
 
        <main>
          <Route
            path="/login"
            render={(props) => <Login {...props} loginUser={this.loginUser} />}
          />
          <Route path="/users" 
          render={(props) => <Users {...props} logOutUser={this.logOutUser} />}
          />
          <Route path="/calendar" component={Calendar} />
        </main>
      </Router>
    );
  }
}

export default App;
