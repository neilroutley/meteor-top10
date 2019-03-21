import React, { Component } from "react";

export default class CommentForm extends Component {
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
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, owner } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [owner]: value
      }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

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

    // persist the comments on server
    // let { comment } = this.state;
    // fetch("http://localhost:7777", {
    //   method: "post",
    //   body: JSON.stringify(comment)
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.error) {
    //       this.setState({ loading: false, error: res.error });
    //     } else {
    //       // add time return from api and push comment to parent state
    //       comment.time = res.time;
    //       this.props.addComment(comment);

    //       // clear the message box
    //       this.setState({
    //         loading: false,
    //         comment: { ...comment, body: "" }
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({
    //       error: "Something went wrong while submitting form.",
    //       loading: false
    //     });
    //   });
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.owner !== "" && this.state.comment.body !== "";
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
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.body}
              className="form-control"
              placeholder="🤬 Your Comment"
              name="body"
              rows="5"
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
