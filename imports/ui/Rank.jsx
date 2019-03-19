import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Ranking } from "../api/ranking.js";

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

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.populateList()
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  populateList() {
    // get lists from database
    const lists = "one";
    return lists;
  }

  reorder(list, startingIndex, endingIndex) {
    const resultList = Array.from(list);
    const [removed] = resultList.splice(startingIndex, 1);
    resultList.splice(endingIndex, 0, removed);
    return resultList;
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
    return <div>logged in - testing</div>;
    // return (
    //   <DragDropContext onDragEnd={this.onDragEnd}>
    //     <Droppable droppableId="droppable">
    //       {(provided, snapshot) => (
    //         <div
    //           {...provided.droppableProps}
    //           ref={provided.innerRef}
    //           style={getListStyle(snapshot.isDraggingOver)}
    //         >
    //           {this.state.items.map((item, index) => (
    //             <Draggable key={item.id} draggableId={item.id} index={index}>
    //               {(provided, snapshot) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                   style={getItemStyle(
    //                     snapshot.isDragging,
    //                     provided.draggableProps.style
    //                   )}
    //                 >
    //                   {item.content}
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>
    //   </DragDropContext>
    // );
  }
}

Rank.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("Rankings");
  return {
    list: Ranking.find({}).fetch(),
    user: Meteor.user(),
    ready: handle.ready()
  };
})(Rank);
