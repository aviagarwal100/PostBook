import React, { Component } from "react";
import image from "../images/magnifying-4340698_640.jpg";

class Page404 extends Component {
  render() {
    return (
      <div>
        <div className="card Page">
          <img className="card-img-top" src={image} alt="PageNotFound" />
          <div className="card-body">
            <div className="card-text text-center">
              <h5>404</h5>
              Page Not Found
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Page404;
