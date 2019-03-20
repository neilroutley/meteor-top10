import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

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
      creator: props.ranking.creator,
      _id: props.ranking._id
    };
    debugger;

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSubmit = this.submitRanking.bind(this);
  }

  compare(arr1, arr2) {
    if (!arr1 || !arr2) return;

    let result;

    arr1.forEach((e1, i) =>
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
    return this.state.ranking.comments.map(com => (
      <div className="card" key={com._id}>
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

  render() {
    return (
      <div className="col-2" key={this.state.title}>
        <h1>{this.state.title}</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
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
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {index + "    "}
                        {(item.order = index)}
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}{" "}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={this.onSubmit}>Submit </button>
        {}
      </div>
    );
  }
}

TopTenList.propTypes = {
  // createdAt: PropTypes.Date.isRequired,
  // title: PropTypes.string.isRequired,
  // list: PropTypes.arrayOf(PropTypes.object).isRequired,
  // comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  // creator: PropTypes.object.isRequired,
  ranking: PropTypes.object.isRequired
};

export default TopTenList;
