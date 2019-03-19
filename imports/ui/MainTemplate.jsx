import React, { Component } from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar.jsx";
import Foot from "./Foot.jsx";

export default class MainTemplate extends Component {
  render() {
    return (
      <div>
        <NavBar />

        {this.props.children}

        <Foot />
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
