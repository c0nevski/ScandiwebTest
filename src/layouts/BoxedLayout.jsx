import React, { Component } from "react";
import { Footer, Header } from "../components";

export class BoxedLayout extends Component {
  render() {
    return (
      <div className="boxed-layout">
        <div className="boxed-layout__container">
          {/* Header */}
          <Header />
          {/* Main content */}
          <div className="main-content">{this.props.children}</div>
          {/* Footer */}
          <Footer/>
        </div>
      </div>
    );
  }
}

export default BoxedLayout;
