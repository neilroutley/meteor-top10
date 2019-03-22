import React, { Component } from "react";
import PropTypes from "prop-types";

import CommentList from "./CommentList.jsx";
import CommentForm from "./CommentForm.jsx";

class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments,
      _id: this.props._id
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
      <div className="commentBlock border-top rounded">
        <CommentForm _id={this.state._id} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

CommentSection.propTypes = {
  _id: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentSection;
