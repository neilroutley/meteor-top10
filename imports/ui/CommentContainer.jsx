import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Comments } from "../api/comments.js";

class CommentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };
  }

  renderComments() {
    return this.props.comments.map(c => (
      <div className="card" key={c._id}>
        {c.owner} : {c.comment}
      </div>
    ));
  }

  onChange(evt) {
    console.log("change", evt.target.value);
    this.setState({
      comment: evt.target.value
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {
      Meteor.call("comments.insert", this.state.comment, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }

        console.log("Comment inserted", res);
        this.setState({
          comment: ""
        });
      });
    }
  }

  render() {
    console.log("Comments", this.props.comments);
    return (
      <div className="container">
        <h2>Comments</h2>
        <div className="comments">{this.renderComments()}</div>
        <h3>Enter a comment</h3>
        <label htmlFor="inComment">
          Comment:{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter a comment"
            value={this.state.comment}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          />
        </label>
      </div>
    );
  }
}

CommentContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("comments");
  return {
    comments: Comments.find({}).fetch(),
    user: Meteor.user(),
    ready: handle.ready()
  };
})(CommentContainer);
