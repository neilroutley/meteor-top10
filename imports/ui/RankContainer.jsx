import React, { Component } from "react";
import TopTenList from "./TopTenList.jsx";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Ranking } from "../api/ranking.js";
import PropTypes from "prop-types";

class RankContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: this.props.rankings
    };
  }

  render() {
    return (
      <div className="row">
        {this.props.rankings.map((ranking, ind) => (
          <TopTenList key={ind++} ranking={ranking} />
        ))}
      </div>
    );
  }
}

RankContainer.propTypes = {
  rankings: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("Ranking");
  return {
    rankings: Ranking.find({}).fetch(),
    user: Meteor.user(),
    ready: handle.ready()
  };
})(RankContainer);
