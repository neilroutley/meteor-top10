import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";

export const Comments = new Mongo.Collection("comments");

if (Meteor.isServer) {
  Meteor.publish("comments", function commentsPublish() {
    return Comments.find(
      {},
      {
        limit: 10,
        sort: {
          createdAt: -1
        }
      }
    );
  });
}

Meteor.methods({
  "comments.insert"(comment) {
    // check(comment, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Comments.insert({
      _id: comment._id,
      body: comment.body,
      createdAt: Date.now(),
      owner: Meteor.user().username
    });
  }
});
