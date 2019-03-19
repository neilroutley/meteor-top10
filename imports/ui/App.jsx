import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import MainTemplate from "./MainTemplate.jsx";
import Rank from "./Rank.jsx";

import { withTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="container text-center">
      <h1>Top 10</h1>
      <div className="">{Meteor.user() ? <Rank /> : <p>Please log in</p>}</div>
    </div>
  );
};

const AboutComponent = () => (
  <div className="container text-center">
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
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route component={NotFoundPage} />
          </Switch>
        </MainTemplate>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
