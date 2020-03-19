import React, { Component } from "react";
const axios = require("axios");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      filename: null,
      title: null,
      error: ""
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }
  handleProfile(event) {
    event.preventDefault();
    const user = localStorage.getItem("user");
    const formData = new FormData();
    formData.append("profilepic", this.state.filename);
    formData.append("user", user);
    formData.append("title", this.state.title);
    const config = {
      mode:"no-cors",
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    if (this.state.filename !== null && this.state.title !== null) {
      axios
        .post("https://protected-everglades-33510.herokuapp.com/api/photo/upload", formData, config)
        .then(response => {
          if (response.message === "error") {
            alert("Problem in loading image...");
          } else {
            alert("The file is successfully uploaded");
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ error: "Field should not be remain empty" });
    }
  }
  onChange(e) {
    this.setState({ filename: e.target.files[0] });
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  render() {
    return (
      <div>
        <div className="card setting">
          <img
            className="profile"
            src={
              this.state.user.profilepic1 !== null
                ? this.state.user.profilepic1
                : `data:${
                    this.state.user.profilepic.contentType
                  };base64,${Buffer.from(
                    this.state.user.profilepic.data.data
                  ).toString("base64")}`
            }
            alt="profile"
          />
          <h5 className="card-text text-center">@{this.state.user.username}</h5>
          <div className="card-body">
            <div className=" subsetting">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Upload Photos</h4>
                  <p className="card-text">Have fun with photos</p>
                  <form onSubmit={this.handleProfile}>
                    <input
                      type="file"
                      name="profilepic"
                      onChange={this.onChange}
                      className="mb-3"
                    />
                    <h6 className="card-title">Title of photo:</h6>
                    <input
                      type="text"
                      name="title"
                      className="form-control mb-3"
                      id="formGroupExampleInput"
                      onChange={this.onChangeTitle}
                    />
                    <p className="error">{this.state.error}</p>
                    <div>
                      <button type="submit" className="btn btn-primary">
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
