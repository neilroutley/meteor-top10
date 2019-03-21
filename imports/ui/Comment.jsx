import React, { Component } from "react";
import PropTypes from "prop-types";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: this.props.body,
      owner: this.props.owner
    };
  }
  render() {
    return (
      <div className="media mb-3 p-2">
        <img
          className="mr-3 bg-light rounded"
          width="48"
          height="48"
          src={`https://api.adorable.io/avatars/48/${this.state.owner.toLowerCase()}@adorable.io.png`}
          alt={this.state.owner}
        />

        <div className="media-body p-2 shadow-sm rounded bg-light border">
          {/*<small className="float-right text-muted">{createdAt}</small>*/}
          <h6 className="mt-0 mb-1 text-muted float-left">
            {this.state.owner}
          </h6>
          {this.state.body}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  owner: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Comment;
