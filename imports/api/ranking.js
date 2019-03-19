import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Ranking = new Mongo.Collection("ranking");

if (Meteor.isServer) {
  Meteor.publish("messages", function messagesPublish() {
    return Ranking.find(
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
  "ranking.add"(ranking) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Ranking.insert({
      list: ranking,
      createdAt: Date.now(),
      owner: Meteor.user().username
    });
  }
});
