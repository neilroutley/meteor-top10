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

  // renderComments() {
  //   return this.state.comments.map(c => (
  //     <div className="card" key={c._id}>
  //       {c.owner} : {c.comment}
  //     </div>
  //   ));
  // }

  renderComments() {
    return this.props.ranking.comments.map(c => (
      <div className="card" key={c._id}>
        {c.owner} : {c.body}
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
      Meteor.call(
        "comments.insert",
        { body: this.state.comment, _id: props.ranking._id },
        (err, res) => {
          if (err) {
            alert("There was error inserting check the console");
            console.log(err);
            return;
          }

          console.log("Comment inserted", res);
          this.setState({
            comment: ""
          });
        }
      );
    }
  }

  render() {
    console.log("Comments to render", this.props.ranking.comments);
    return (
      <div className="row">
        <h2>Enter a comment</h2>
        <label htmlFor="inComment">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a comment"
            value={this.state.comment}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          />
        </label>
        <h3>Comments</h3>
        <div className="">{this.renderComments()}</div>
      </div>
    );
  }
}

CommentContainer.propTypes = {
  ranking: PropTypes.object.isRequired
};

// export default withTracker(() => {
//   const handle = Meteor.subscribe("comments");
//   return {
//     comments: Comments.find().fetch(),
//     user: Meteor.user(),
//     ready: handle.ready()
//   };
// })(CommentContainer);

export default CommentContainer;
