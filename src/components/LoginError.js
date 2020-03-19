import React, { Component } from "react";
import image from "../images/smartphone-4562985_640.jpg";

class LoginError extends Component {
  render() {
    return (
      <div>
        <div className="card Page">
          <img className="card-img-top" src={image} alt="PageNotFound" />
          <div className="card-body">
            <div className="card-text text-center">
              <h5>Please login or signup</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginError;
