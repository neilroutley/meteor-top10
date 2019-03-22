import React, { Component } from "react";
import Comment from "./Comment.jsx";
import PropTypes from "prop-types";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.comments, prevProps.comments)) {
      this.setState({
        comments: this.props.comments
      });
    }
  }

  compare(arr1, arr2) {
    if (!arr1 || !arr2) return;
    // if (arr1.length === 0 && arr2.length === 0) {
    //   return true;
    // }
    let result = true;

    arr1.forEach(e1 =>
      arr2.forEach(e2 => {
        if (e1.length > 1 && e2.length) {
          result = this.compare(e1, e2);
        } else if (e1 !== e2) {
          result = false;
        } else {
          result = true;
        }
      })
    );

    return result;
  }

  render() {
    return (
      <div className="commentList text-left">
        <h5 className="text-muted mb-3">
          <span className="badge badge-success ml-2">
            {this.state.comments.length}
          </span>{" "}
          Comment{this.state.comments.length > 0 ? "s" : ""}
        </h5>

        {this.state.comments.length === 0 ? (
          <div className="alert text-center alert-info m-2">
            Be the first to comment
          </div>
        ) : null}

        {this.state.comments.map((comment, index) => (
          <Comment key={index} body={comment.body} owner={comment.owner} />
        ))}
      </div>
    );
  }
}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentList;
