import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import CommentSection from "./CommentSection.jsx";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
  margin: 0,
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class TopTenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: props.ranking.createdAt,
      title: props.ranking.title,
      list: props.ranking.list,
      comments: props.ranking.comments,
      comment: "",
      creator: props.ranking.creator,
      _id: props.ranking._id
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSubmit = this.submitRanking.bind(this);
  }

  compare(arr1, arr2) {
    if (!arr1 || !arr2) return;

    let result;

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

  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.ranking.list, prevProps.ranking.list)) {
      this.setState({
        createdAt: this.props.ranking.createdAt,
        title: this.props.ranking.title,
        list: this.props.ranking.list,
        comments: this.props.ranking.comments,
        creator: this.props.ranking.creator,
        _id: this.props.ranking._id
      });
    }
  }

  submitRanking(event) {
    event.preventDefault();
    Meteor.call("ranking.update", this.state, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }

      console.log("ranking updated", res);
    });
  }

  reorder(list, startingIndex, endingIndex) {
    const resultList = Array.from(list);
    const [removed] = resultList.splice(startingIndex, 1);
    resultList.splice(endingIndex, 0, removed);
    this.setState({ list: resultList });
    return resultList;
  }

  renderComments() {
    return this.state.comments.map(com => (
      <div className="" key={com._id}>
        {com.owner} : {com.body}
      </div>
    ));
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const list = this.reorder(
      this.state.list,
      result.source.index,
      result.destination.index
    );

    this.setState({ list });
  }

  onChange(evt) {
    console.log("change", evt.target.value);
    this.setState({
      comment: evt.target.value
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {
      this.setState({
        comments: [
          ...this.state.comments,
          {
            owner: Meteor.user().username,
            body: this.state.comment,
            createdAt: Date.now()
          }
        ]
      });
      console.log("comments should have" + this.state.comment);
      console.log(this.state.comments);
      this.setState({ comment: "" });
    }
  }

  render() {
    return (
      <div className="" key={this.state.title}>
        <h1>{this.state.title}</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="media-body p-2 shadow-sm rounded bg-white border"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.list.map((item, index) => (
                  <Draggable
                    key={item.content}
                    draggableId={item.content}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="media-body p-2 shadow-sm rounded bg-light border"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="col-2 d-inline-block border p-0 bg-white">
                          {(item.order = index)}
                        </div>
                        <div className="col-10 d-inline-block">
                          {item.content}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}{" "}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={this.onSubmit} className="btn btn-primary m-4">
          Submit{" "}
        </button>
        <CommentSection _id={this.state._id} comments={this.state.comments} />
      </div>
    );
  }
}

TopTenList.propTypes = {
  ranking: PropTypes.object.isRequired
};

export default TopTenList;
