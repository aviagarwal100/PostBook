import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Setting from "./Setting";
import Profile from "./Profile";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.isLogin(false);
    this.props.history.push("/");
    this.props.handleLogout();
  }

  render() {
    return (
      <Router basename="/dashboard/#">
        <nav id="navbar-example2" className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            PostBook
          </Link>
          <ul className="nav nav-pills">
            <li className="nav-item name">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link  " to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item dropdown mr-2">
              <Link
                className="nav-link dropdown-toggle "
                data-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.user.username}
              </Link>
              <div className="dropdown-menu ">
                <Link className="dropdown-item" to="profile">
                  Profile
                </Link>
                <Link className="dropdown-item" to="setting">
                  Setting
                </Link>
                <div role="separator" className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            </li>
            <div className="mr-5 mt-1">
              <img
                className="circle"
                src={
                  this.props.user.profilepic1 !== null
                    ? this.props.user.profilepic1
                    : `data:${
                        this.props.user.profilepic.contentType
                      };base64,${Buffer.from(
                        this.props.user.profilepic.data.data
                      ).toString("base64")}`
                }
                alt="navUser"
                height="30"
                width="30"
              />
            </div>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/dashboard">
            <Home user={this.props.user} />
          </Route>
          <Route exact path="/">
            <Home user={this.props.user} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route exact path="/setting">
            <Setting handlelogout={this.handleLogout} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Dashboard;
