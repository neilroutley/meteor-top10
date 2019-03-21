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
    //this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // /**
  //  * Handle form input field changes & update the state
  //  */
  // // handleFieldChange = event => {
  // //   const { value, owner } = event.target;
  // //
  // //   this.setState({
  // //     ...this.state,
  // //     comment: {
  // //       ...this.state.comment,
  // //       [owner]: value
  // //     }
  // //   });
  // // };

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
        this.setState({
          comment: ""
        });
      }
    );
    this.setState({ error: "", loading: false });
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return Meteor.user().username !== "" && this.body !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group p-2">
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
            <button disabled={this.state.loading} className="btn btn-primary">
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
