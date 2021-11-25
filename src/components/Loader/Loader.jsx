import React, { Component } from "react";
import logo from "../../assets/logo-x512.png";
import "./Loader.scss";

class Loader extends Component {
  render() {
    return (
      <div className="loader">
          <img src={logo} alt="storefront logo" />
      </div>
    );
  }
}

export default Loader;
