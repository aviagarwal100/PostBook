import React, { Component } from "react";
import Loader from "./Loader";
import validator from "validator";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      isLoaded: true,
      e_email: "",
      e_password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toFormUrlEncoded(object) {
    return Object.entries(object)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoaded: false });
    if (
      !validator.isEmpty(this.state.e_email) ||
      !validator.isEmpty(this.state.e_password)
    ) {
      this.setState({ isLoaded: true });
      this.setState({ error: "Please input email and password properly" });
    } else {
      const object = {
        email: this.state.email,
        password: this.state.password
      };
      fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: this.toFormUrlEncoded(object)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error !== "success") {
            this.setState({ isLoaded: true });
            this.setState({ error: data.error });
          } else {
            // Transfer to secure page.
            this.setState({ isLoaded: true });
            localStorage.setItem("user", JSON.stringify(data.user));
            this.props.handleSuccessAuth(data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.password]: event.target.value
    });
    const { name, value } = event.target;
    switch (name) {
      case "email":
        this.setState({
          e_email: validator.isEmail(value) ? "" : "Email is not valid"
        });
        break;
      default:
        this.setState({
          e_password:
            value.length >= 8
              ? ""
              : "Password should be of atleast 8 characters"
        });
    }
  }

  render() {
    return (
      <div className="image">
        <div className="jumbotron jumbotron-fluid">
          <div className="container login">
            <h1 className="display-4">PostBook</h1>
            <p className="lead"></p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group ">
              <label>Email address </label>
              <input
                type="email"
                className="form-control input"
                id="exampleInputEmail1"
                placeholder="Enter email"
                onChange={this.handleInputChange}
                name="email"
              />
              <div className="spinner container error">
                {this.state.e_email}
              </div>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control input"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={this.handleInputChange}
                name="password"
              />
              <div className="spinner container error">
                {this.state.e_password}
              </div>
            </div>
            <div className="form-group login_input">
              <div className="spinner container">
                {this.state.isLoaded ? "" : <Loader />}
              </div>
              <div className="spinner container error">{this.state.error}</div>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
