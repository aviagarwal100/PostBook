import React, { Component } from "react";
import Footer2 from "../reusable components/Footer2";
import img from "../images/camera-581126_640.jpg";
import { Link } from "react-router-dom";
import download from "downloadjs";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      data: {},
      original: [],
      error1: "",
      search: "",
      originalSearch: [],
      array: [],
      error2: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  toFormUrlEncoded(object) {
    return Object.entries(object)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/photo/post", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: this.toFormUrlEncoded(JSON.parse(localStorage.getItem("user")))
    })
      .then(response => response.json())
      .then(data => {
        if (data.error === "error") {
          this.setState({ error: "Please upload photos" });
        } else if (data.error === "success") {
          this.setState({ data: data });
          this.setState({ original: data.original.reverse().slice(0, 10) });
          this.setState({ originalSearch: data.original.reverse() });
          if (this.state.original === undefined) {
            this.setState({ error1: "No Post is avaliable" });
          }
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }
  onSearch(e) {
    let temp = [];
    const len = this.state.originalSearch.length;
    for (let i = 0; i < len; i++) {
      if (
        this.state.originalSearch[i].title.toLowerCase() ===
        this.state.search.toLowerCase()
      ) {
        temp.unshift(this.state.originalSearch[i]);
      }
    }
    if (temp.length !== 0) {
      this.setState({ array: temp });
      this.setState({ error2: "" });
    } else {
      this.setState({ array: [] });
      this.setState({
        error2: "Searched post is not correct or not available."
      });
    }
  }

  render() {
    return (
      <div>
        <div className="card bg-dark text-white mx-5 my-5">
          <img
            className="card-img"
            src={img}
            alt="Camera1"
            width="270"
            height="600"
          />
          <div className="card-img-overlay my-5">
            <h1 className="card-title text-center home_camera ">PostBook</h1>
            <p className="card-text text-center">Have a fun with images.</p>
            <p className="card-text text-center">Click below...</p>
            <div className="text-center my-5">
              <Link className="btn btn-success " to="/profile">
                Upload Photos
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-5 text-center">
          <h1>Recent Post</h1>
          <h5 className="mt-5">{this.state.error1}</h5>
        </div>
        <div className="container">
          <div className=" mb-5 mx-4 row">
            {this.state.data.picture !== undefined
              ? this.state.original.map((value, index) => (
                  <div
                    key={index}
                    className="card slider1 col-sm-12 col-md-4 px-0 mb-3"
                  >
                    <img
                      className="card-img-top"
                      alt="Camera2"
                      src={`data:${
                        value.profilepic.contentType
                      };base64,${Buffer.from(
                        value.profilepic.data.data
                      ).toString("base64")}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.title}</h5>
                      <h6 className="card-text text-muted cross">
                        {this.state.data.picture[0] !== undefined &&
                        value.name === this.state.data.picture[0].name
                          ? "you"
                          : "@" + value.name}
                      </h6>
                      <Link
                        to="#"
                        onClick={() => {
                          download(
                            `data:${
                              value.profilepic.contentType
                            };base64,${Buffer.from(
                              value.profilepic.data.data
                            ).toString("base64")}`,
                            "image.png"
                          );
                        }}
                        className="fa fa-download down"
                      ></Link>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>

        <div className="mb-5 text-center">
          <h1>The Post You Want</h1>
          <input
            type="text"
            className="form-control input"
            onChange={this.onChange}
            id="formGroupExampleInput"
            placeholder="Search the post that you want..."
          />
          <button
            className="btn btn-outline-success inputsearch"
            onClick={this.onSearch}
            type="submit"
          >
            Search
          </button>
        </div>
        <div className="container">
          <div className=" mb-5 mx-4 row">
            {this.state.array.length !== 0 ? (
              this.state.array.map((value, index) => (
                <div
                  key={index}
                  className="card slider1 col-sm-12 col-md-4 px-0 mb-3"
                >
                  <img
                    className="card-img-top"
                    alt="Camera3"
                    src={`data:${
                      value.profilepic.contentType
                    };base64,${Buffer.from(value.profilepic.data.data).toString(
                      "base64"
                    )}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{value.title}</h5>
                    <h6 className="card-text text-muted cross">
                      {this.state.data.picture[0] !== undefined &&
                      value.name === this.state.data.picture[0].name
                        ? "you"
                        : "@" + value.name}
                    </h6>
                    <Link
                      to="#"
                      onClick={() => {
                        download(
                          `data:${
                            value.profilepic.contentType
                          };base64,${Buffer.from(
                            value.profilepic.data.data
                          ).toString("base64")}`,
                          "image.png"
                        );
                      }}
                      className="fa fa-download down"
                    ></Link>
                  </div>
                </div>
              ))
            ) : this.state.error2 === "" ? (
              <div className="searchmessage">
                Please search with correct post's title
              </div>
            ) : (
              <div className="searchmessage">
                <h6>{this.state.error2}</h6>
              </div>
            )}
          </div>
        </div>
        <div className="mb-5 text-center">
          <h1>Your Post</h1>
          <h5 className="mt-5">{this.state.error}</h5>
        </div>
        <div className="container">
          <div className=" mb-5 mx-4 row">
            {this.state.data.picture !== undefined
              ? this.state.data.picture.map((value, index) => (
                  <div
                    key={index}
                    className="card slider1 col-sm-12 col-md-4 px-0 mb-3"
                  >
                    <img
                      className="card-img-top"
                      alt="Camera4"
                      src={`data:${
                        value.profilepic.contentType
                      };base64,${Buffer.from(
                        value.profilepic.data.data
                      ).toString("base64")}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.title}</h5>

                      <Link
                        onClick={() => {
                          download(
                            `data:${
                              value.profilepic.contentType
                            };base64,${Buffer.from(
                              value.profilepic.data.data
                            ).toString("base64")}`,
                            "image.png"
                          );
                        }}
                        className="fa fa-download down"
                      ></Link>

                      <Link to="#" className="fa fa-times cross"></Link>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <Footer2 />
      </div>
    );
  }
}

export default Home;
