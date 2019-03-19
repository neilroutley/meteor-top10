import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Ranking from "./ranking.jsx";
import NavBar from "./NavBar.jsx";

import { withTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      <h1>Top 10</h1>

      {Meteor.user() ? <Ranking /> : <div>Please log in</div>}
    </div>
  );
};

const AboutComponent = () => (
  <div>
    <h2>About</h2>
    <div>I am the Rank King</div>
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>Page not found</h2>
    <div>please send help</div>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route component={NotFoundPage} />
          </Switch>
          <br />
          <div>Made by Neil and Guy</div>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
