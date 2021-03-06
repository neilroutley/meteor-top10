import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import MainTemplate from "./MainTemplate.jsx";
import Submit from "./Submit.jsx";
import RankContainer from "./RankContainer.jsx";
import AboutPage from "./AboutPage.jsx";

import { withTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="container text-center">
      {Meteor.user() ? <RankContainer /> : <p>Please log in</p>}
    </div>
  );
};

const CreateComponent = () => {
  return (
    <div className="container col-md-8 col-lg-6">
      <div className=" container text-center">
        {Meteor.user() ? <Submit /> : <p>Please log in</p>}
      </div>
    </div>
  );
};

const AboutComponent = () => (
  <div className="container text-center">
    <AboutPage />
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>Page not found</h2>
    <div>please send help</div>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <Router>
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/create" component={CreateComponent} />
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
