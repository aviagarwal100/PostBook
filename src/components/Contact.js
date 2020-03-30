import React from "react";
import image from "../images/contact-2860030_640.jpg";

function Contact() {
  return (
    <div>
      <div className="card contact">
        <img className="card-img-top" src={image} alt="Contact" />
        <div className="card-body">
          <form
            action="https://formspree.io/aviagarwal100@gmail.com"
            method="POST"
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="_replyto"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="@email"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                name="message"
                rows="2"
              ></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-success text-center" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Contact;
