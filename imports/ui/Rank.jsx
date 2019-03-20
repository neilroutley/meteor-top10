import React, { Component } from "react";

import PropTypes from "prop-types";


import {RankContainer} from "./RankContainer.jsx";



// EXAMPLE DATA
// {
//   createdAt: Date.now(),
//   owner: Meteor.user().username,
//   title: "",
//   list: [
//     { content: 'item1', order: 0, _id: '' },
//     { content: 'item2', order: 1, _id: '' },
//     { content: 'item3', order: 2, _id: 'item3' },
//     { content: 'item4', order: 3, _id: 'item4' },
//     { content: 'item5', order: 4, _id: 'item5' },
//     { content: 'item6', order: 5, _id: 'item6' },
//     { content: 'item7', order: 6, _id: 'item7' },
//     { content: 'item8', order: 7, _id: 'item8' },
//     { content: 'item9', order: 8, _id: 'item9' },
//     { content: 'item10', order: 9, _id: 'item10'},
//
//   ],
//   comments: [
//     {_id: "0", owner: "guy", body: "hello"}
//   ]
//
// }

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: this.props.rankings
      // createdAt: props.createdAt,
      // title: props.title,
      // list: props.list,
      // comments: props.comments,
      // owner: props.owner
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onChange(event) {
    console.log("change", event.target.value);
    this.setState({
      rankings: event.target.value
    });
  }

  reorder(list, startingIndex, endingIndex) {
    const resultList = Array.from(list);
    const [removed] = resultList.splice(startingIndex, 1);
    resultList.splice(endingIndex, 0, removed);
    return resultList;
  }

  renderComments() {
    return this.props.ranking.comments.map(com => (
      <div className="card" key={com._id}>
        {com.owner} : {com.body}
      </div>
    ));
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const list = this.reorder(
      this.state.list,
      result.source.index,
      result.destination.index
    );

    this.setState({ list });
  }

  submitRanking() {
    Meteor.call("ranking.update", this.state.ranking, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }

      console.log("ranking updated", res);
      this.setState({
        ranking: ""
      });
    });
  }

  renderRankings() {
    //map rank object in rankings to each proprtypes
    //rankings array is in props.rankings
  }

  render() {
    // EXAMPLE DATA
    // {
    //   createdAt: Date.now(),
    //   owner: Meteor.user().username,
    //   list: [
    //     { content: 'item1', order: 0, _id: 'item1' },
    //     { content: 'item2', order: 1, _id: 'item2' },
    //     { content: 'item3', order: 2, _id: 'item3' },
    //     { content: 'item4', order: 3, _id: 'item4' },
    //     { content: 'item5', order: 4, _id: 'item5' },
    //     { content: 'item6', order: 5, _id: 'item6' },
    //     { content: 'item7', order: 6, _id: 'item7' },
    //     { content: 'item8', order: 7, _id: 'item8' },
    //     { content: 'item9', order: 8, _id: 'item9' },
    //     { content: 'item10', order: 9, _id: 'item10'},
    //
    //   ],
    //   comments: [
    //     {_id: "0", owner: "guy", body: "hello"}
    //   ]
    //
    // }
    return (
      <div className="row">
        {this.state.rankings.map((ranking, ind) => (

        ))}
      </div>
    );
  }
}

Rank.propTypes = {
  // createdAt: PropTypes.Date.isRequired,
  // title: PropTypes.string.isRequired,
  // list: PropTypes.arrayOf(PropTypes.object).isRequired,
  // comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  // owner: PropTypes.object.isRequired,
  // ranking: PropTypes.arrayOf(PropTypes.object).isRequired
  rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("Ranking");
  return {
    rankings: Ranking.find({}).fetch(),
    user: Meteor.user(),
    ready: handle.ready()
  };
})(Rank);
