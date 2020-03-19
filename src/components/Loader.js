import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => (
  <ReactLoading
    type={"spinningBubbles"}
    color={"#2C3335"}
    height={"5%"}
    width={"5%"}
  />
);

export default Loader;
