import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Ranking = new Mongo.Collection("ranking");

if (Meteor.isServer) {
  Meteor.publish("Ranking", function rankingsToPublish() {
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

//Method to add to database, called by submit
Meteor.methods({
  "ranking.add"(rankingToAdd) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    //add to collection
    Ranking.insert({
      createdAt: Date.now(),
      owner: Meteor.user().username,
      title: rankingToAdd.title,
      list: rankingToAdd.list,
      comments: []
    });
  }
});

//Method to update, called by list being updated by community
Meteor.methods({
  "ranking.update"(ranking) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    } else {
      //user is logged in, sending an updated list, ^^
      console.log("ranking object id");
      console.log(ranking);
      var serverRanking = Ranking.findOne({ _id: ranking._id });
      console.log("serverRanking");
      console.log(serverRanking);
      //should return the ranking list we want to updated
      var serverRankingList = serverRanking.list;
      var userRankingList = ranking.list;
      console.log("UserRanking");
      console.log(ranking);
      //lists should be merged and order updated
      var newServerRankingList = mergeLists(serverRankingList, userRankingList);
      console.log(newServerRankingList);
      //Update the ranking with the new updated list
      Ranking.update(
        { _id: ranking._id },
        { $set: { list: newServerRankingList } }
      );
    }
  }
});

//do not duplicate then sort by content
function mergeLists(serverList, userList) {
  var resultList = [];
  serverList.forEach(element => {
    var userListElement = userList.find(function(userElement) {
      return userElement.content === element.content;
    });
    resultList.push({
      content: element.content,
      order: element.order + userListElement.order
    });
  });
  console.log(resultList);
  //sort list based on order
  resultList.sort((one, two) => {
    return one.order - two.order;
  });
  //update order to match mongo expected
  var counter = 0;
  resultList.forEach(function(item) {
    item.order = counter++;
  });
  return resultList;
}
