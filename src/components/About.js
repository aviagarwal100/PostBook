import React, { Component } from "react";
import image from "../images/photo-256888_640.jpg";

class About extends Component {
  render() {
    return (
      <div>
        <div className="card about">
          <img className="card-img-top" src={image} alt="about" />
          <div className="card-body">
            <p className="card-text">
              We are in the business of providing the free pictures posted by
              world wide users.Which help us to explore the world.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
