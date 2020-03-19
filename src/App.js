import React, { Component } from "react";
import "./App.css";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page404 from "./components/Page404";
import LoginError from "./components/LoginError";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: Boolean(localStorage.getItem("login")) || false,
      user: JSON.parse(localStorage.getItem("user")) || {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(data) {
    this.setState({ isLogin: data });
  }
  handleUser(data) {
    this.setState({ user: data.user });
    localStorage.setItem("login", true);
  }
  handleLogout() {
    this.setState({ user: {} });
    localStorage.removeItem("user");
    localStorage.removeItem("login");
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Body
                {...props}
                isLogin={this.handleLogin}
                user={this.handleUser}
              />
            )}
          />
          <Route
            exact
            path={this.state.isLogin === true ? "/dashboard" : "/"}
            render={props => (
              <Dashboard
                {...props}
                user={this.state.user}
                isLogin={this.handleLogin}
                handleLogout={this.handleLogout}
              />
            )}
          />
          <Route exact path="/dashboard">
            <LoginError />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
