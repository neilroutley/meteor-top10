import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      _id: props._id,

      comment: {
        owner: "",
        body: ""
      }
    };

    // bind context to methods
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    //this.setState({ comment: { owner: Meteor.user().username } });

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    //servercomment
    let serverComment = {
      owner: Meteor.user().username,
      body: this.body.value
    };
    console.log("server comment");
    console.log(serverComment);
    Meteor.call(
      "comments.update",
      { comment: serverComment, _id: this.state._id },
      (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }

        console.log("Comment inserted", res);
        this.body.value = "";
      }
    );
    this.setState({ error: "", loading: false});
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return Meteor.user().username !== "" && this.body.value !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit} className="p-3 mb-3 border-bottom bg-light rounded">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="🤬 Your Comment"
              name="body"
              rows="5"
              ref={input => (this.body = input)}
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-sm btn-outline-primary">
              Comment &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
CommentForm.propTypes = {
  _id: PropTypes.string.isRequired
};

export default CommentForm;
