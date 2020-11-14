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

    this.setAdmin = this.setAdmin.bind(this);
  }

  setAdmin(user) {
    this.setState({
      user: user,
    });

    console.log(this.state);
  }

  render() {
    const user = this.state.user;

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
        <Navigation user={user} />
        <main>
          <Route
            path="/login"
            // component={Login}
            render={(props) => <Login {...props} setAdmin={this.setAdmin} />}
          />
          <Route path="/users" component={Users} />
          <Route path="/calendar" component={Calendar} />
          {/* <Route
            path="/calendar"
            render={(props) => <Calendar {...props} events={events} />}
          /> */}
        </main>
      </Router>
    );
  }
}

export default App;
