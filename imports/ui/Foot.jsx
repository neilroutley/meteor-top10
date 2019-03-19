import React, { Component } from "react";
import { Link } from "react-router-dom";

class Foot extends Component {
  render() {
    return (
      <footer className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <h5>About</h5>
              <p>Online Ranking King!</p>
            </div>
            <div className="col-lg-4 col-sm-6">
              <h5>Books</h5>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-sm-12">
              <h5>Authors</h5>
              <p>Copyright &copy; 2019 - Neil Routley &amp; Guy Kachur</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Foot;
