import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./index.css";

import Calendar from "./calendar";
import Login from "./login";
import Users from "./users";
import Navigation from "./navigation";
// import user from "../../server/models/user";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isLoggedIn: false,
      isAdmin: false,
      events: [],
    };

    this.isAdmin = this.isAdmin.bind(this);
  }

  isAdmin(isAdmin) {
    // console.log(isAdmin);
    this.setState({ isAdmin: isAdmin, isLoggedIn: true });
  }

  render() {
    // const isLoggedIn = this.state.isLoggedIn;
    const events = this.state.events;
    const isAdmin = this.state.isAdmin;
    const isLoggedIn = this.state.isLoggedIn;
    // console.log(isAdmin);

    // let { isLoggedIn } = this.state;
    // const renderAuthButton = () => {
    //   if (isLoggedIn) {
    //     return <button>Logout</button>;
    //   } else {
    //     return <button>Login</button>;
    //   }
    // };

    return (
      <Router>
        <Navigation isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
        <main>
          <Route
            path="/login"
            // component={Login}
            render={(props) => <Login {...props} isAdmin={this.isAdmin} />}
          />
          <Route path="/users" component={Users} />
          <Route
            path="/calendar"
            render={(props) => <Calendar {...props} events={events} />}
          />
        </main>
      </Router>
    );
  }
}

export default App;
