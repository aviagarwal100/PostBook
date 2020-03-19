import React, { Component } from "react";
import Footer from "./Footer";
import Login from "./Login";
import Contact from "./Contact";
import About from "./About";
import Sign from "./Sign";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Body extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);
  }
  handleSuccessAuth(data) {
    this.props.isLogin(true);
    this.props.history.push("/dashboard");
    this.props.user(data);
  }

  render() {
    return (
      <div className="App">
        <Router basename="/#">
          <div>
            <div className="navbar navbar-dark fixed-top bg-dark">
              <Link className="navbar-brand display-4" to="/">
                PostBook
              </Link>
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-outline-light mx-1 py-1 px-2"
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-outline-light  mx-1 py-1 px-2"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-outline-success mx-1 active py-1 "
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <Switch>
              <Route exact path="/">
                <Login handleSuccessAuth={this.handleSuccessAuth} />
              </Route>
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/signup">
                <Sign handleSuccessAuth={this.handleSuccessAuth} />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
export default Body;
