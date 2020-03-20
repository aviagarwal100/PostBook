import React, { Component } from "react";
import img from "../images/sunset-2021266_640.jpg";
//const axios = require("axios");

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: null,
      error: ""
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlelogout = this.handlelogout.bind(this);
    this.Delete = this.Delete.bind(this);
  }
  handlelogout() {
    this.props.handlelogout();
  }

  handleProfile(event) {
    event.preventDefault();
    const user = localStorage.getItem("user");
    const formData = new FormData();
    formData.append("profilepic", this.state.filename);
    formData.append("user", user);
    //const config = {
      //headers: {
        //"content-type": "multipart/form-data",
        
      //}
    //};
    if (this.state.filename !== null) {
      fetch("https://protected-everglades-33510.herokuapp.com/api/auth/upload", {method: "POST",headers: {
        "content-type": "multipart/form-data",
        
      },body:formData})
        .then(response => {
          if (response.message === "error") {
            alert("Problem in loading image...");
          } else {
            alert("The file is successfully uploaded");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            window.location.reload(false);
          }
        })
        .catch(error => {
          console.log("Error in uploading" + error);
        });
    } else {
      this.setState({ error: "Field should not be remain empty" });
    }
  }
  onChange(e) {
    this.setState({ filename: e.target.files[0] });
  }

  Delete() {
    alert(
      "Your photos will also be deleted.Are you sure you want to delete the account?"
    );
    var body = function() {
      return Object.entries(JSON.parse(localStorage.getItem("user")))
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
    };
    fetch("https://protected-everglades-33510.herokuapp.com/api/auth/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: body()
    })
      .then(response => {
        this.handlelogout();
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="card setting">
          <img className="card-img-top" src={img} alt="Card" />
          <div className="card-body">
            <div className=" subsetting">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Update</h5>
                  <p className="card-text">Have a updated profile picture.</p>
                  <form onSubmit={this.handleProfile}>
                    <input
                      type="file"
                      name="profilepic"
                      onChange={this.onChange}
                      className="mb-3"
                    />
                    <p className="error">{this.state.error}</p>
                    <div>
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className=" subsetting">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Delete Account</h5>
                  <p className="card-text">
                    If you want to delete the account for that click below...
                  </p>
                  <button className="btn btn-danger" onClick={this.Delete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Setting;
