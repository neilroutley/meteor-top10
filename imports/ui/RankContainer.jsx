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

  //render a rank container and add the top ten lists, based on each ranking avalible in the database,
  render() {
    return (
      <div className=" primary-color border rounded">
        <h1 className="p-4 bg-light">Top Ranks</h1>
        <div className="row d-flex pt-4 justify-content-center">
          {this.props.rankings.map((ranking, ind) => (
            <TopTenList key={ind++} ranking={ranking} />
          ))}
        </div>
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
