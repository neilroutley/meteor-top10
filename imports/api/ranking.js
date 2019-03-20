import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";

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

Meteor.methods({
  //this is now a title and a list
  "ranking.add"(rankingToAdd) {
    //should look like title:, list{item}

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Ranking.insert({
      createdAt: Date.now(),
      owner: Meteor.user().username,
      title: rankingToAdd.title,
      list: rankingToAdd.list,
      comments: []
    });
  }
});

// EXAMPLE DATA
// {
//   createdAt: Date.now(),
//   owner: Meteor.user().username,
//   title: "",
//   list: [
//     { content: 'item1', order: 0, _id: '' },
//     { content: 'item2', order: 1, _id: '' },
//     { content: 'item3', order: 2, _id: 'item3' },
//     { content: 'item4', order: 3, _id: 'item4' },
//     { content: 'item5', order: 4, _id: 'item5' },
//     { content: 'item6', order: 5, _id: 'item6' },
//     { content: 'item7', order: 6, _id: 'item7' },
//     { content: 'item8', order: 7, _id: 'item8' },
//     { content: 'item9', order: 8, _id: 'item9' },
//     { content: 'item10', order: 9, _id: 'item10'},
//
//   ],
//   comments: [
//     {_id: "0", owner: "guy", body: "hello"}
//   ]
//
// // }
//
// createdAt: props.ranking.createdAt,
// title: props.ranking.title,
// list: props.ranking.list,
// comments: props.ranking.comments,
// creator: props.ranking.creator

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
  // var resultList = [];
  // serverList.forEach(element => {
  //   var userOrder = userList.find(userElement => {
  //     return element.content === userElement.content;
  //   }).order;
  //   resultList.push({
  //     content: element.content,
  //     order: (element.order + userOrder) / 2
  //   });
  //   element.order = (element.order + userOrder) / 2;
  // });
  // //sort list based on order
  // resultList.sort((one, two) => {
  //   return one.order < two.order ? one : two;
  // });
  // //update order to match mongo expected
  // var counter = 0;
  // resultList.forEach(function(item) {
  //   item.order = counter++;
  // });
  // //return
  // console.log("ResultList");
  // console.log(resultList);
  // return resultList;
}
