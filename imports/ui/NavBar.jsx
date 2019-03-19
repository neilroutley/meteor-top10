import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

export default class NavBar extends Component {
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-md navbar-dark primary-color">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Rank King
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    exact={true}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
              <div className="md-form my-0">
                <AccountsUIWrapper />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
