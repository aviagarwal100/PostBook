import React, { Component } from "react";
import Loader from "./Loader";
import validator from "validator";

class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      isLoaded: true,
      error: "",
      e_name: "",
      e_username: "",
      e_email: "",
      e_password: "",
      e_gender: "",
      e_phone: ""
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
      !validator.isEmpty(this.state.e_name) ||
      !validator.isEmpty(this.state.e_password) ||
      !validator.isEmpty(this.state.e_username) ||
      !validator.isEmpty(this.state.e_phone) ||
      !validator.isEmpty(this.state.e_gender) ||
      !validator.isEmpty(this.state.e_email)
    ) {
      this.setState({ isLoaded: true });
      this.setState({ error: "Fields should  be filled properly" });
    } else if (
      validator.isEmpty(this.state.name) ||
      validator.isEmpty(this.state.password) ||
      validator.isEmpty(this.state.username) ||
      validator.isEmpty(this.state.phone) ||
      validator.isEmpty(this.state.gender) ||
      validator.isEmpty(this.state.email)
    ) {
      this.setState({ isLoaded: true });
      this.setState({ error: "Fields should not be left empty" });
    } else {
      const object = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender,
        phone: this.state.phone
      };
      event.preventDefault();
      fetch("https://protected-everglades-33510.herokuapp.com/api/auth/register", {
        method: "POST",
        mode:'no-cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: this.toFormUrlEncoded(object)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error !== "success") {
            this.setState({ isLoaded: true });
            this.setState({ error: data.error });
          } else {
            // transfer to secure page.
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
    const { name, value } = event.target;
    switch (name) {
      case "name":
        this.setState({
          e_name:
            value.length > 0 && value.match(/^[A-Z][a-z]+$/)
              ? ""
              : "Field should not be left empty and only one string is allowed"
        });
        break;
      case "username":
        this.setState({
          e_username: value.length <= 0 ? "Field should not be left empty" : ""
        });
        break;
      case "email":
        this.setState({
          e_email: validator.isEmail(value) ? "" : "Email should be valid"
        });
        break;
      case "password":
        this.setState({
          e_password:
            value.length >= 8
              ? ""
              : "Password should be of atleast 8 characters"
        });
        break;
      case "gender":
        this.setState({
          e_gender:
            value === "male" || value === "female" ? "" : "It should be valid"
        });
        break;
      default:
        this.setState({
          e_phone:
            value.length === 10 &&
            value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g)
              ? ""
              : "Phone should be valid"
        });
    }

    this.setState({
      [event.target.name]: event.target.value,
      [event.target.username]: event.target.value,
      [event.target.email]: event.target.value,
      [event.target.password]: event.target.value,
      [event.target.gender]: event.target.value,
      [event.target.phone]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-row sign_input">
                <div className="form-group col-md-6 my-2 mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control "
                    name="name"
                    onChange={this.handleInputChange}
                  />
                  <div className="spinner container error">
                    {this.state.e_name}
                  </div>
                </div>
                <div className="form-group col-md-6 my-2 mt-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control "
                    name="username"
                    onChange={this.handleInputChange}
                  />
                  <div className="spinner container error">
                    {this.state.e_username}
                  </div>
                </div>
                <div className="form-group col-md-6 my-4 ">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control "
                    name="email"
                    onChange={this.handleInputChange}
                  />
                  <div className="spinner container error">
                    {this.state.e_email}
                  </div>
                </div>
                <div className="form-group col-md-6 my-4">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control "
                    name="password"
                    onChange={this.handleInputChange}
                  />
                  <div className="spinner container error">
                    {this.state.e_password}
                  </div>
                </div>
              </div>

              <div className="form-row login_input">
                <div className="form-group col-md-6">
                  <label>Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gender"
                    onChange={this.handleInputChange}
                  />
                  <div className="spinner container error">
                    {this.state.e_gender}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>Phone no.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    onChange={this.handleInputChange}
                  />
                  <div className="spinner container error">
                    {this.state.e_phone}
                  </div>
                </div>
                <div className="spinner container">
                  You will get login after signup...
                </div>
                <div className="spinner container">
                  {this.state.isLoaded ? "" : <Loader />}
                </div>
                <div className="spinner container error">
                  {this.state.error}
                </div>
              </div>

              <button type="submit" className="btn btn-primary ">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Sign;
