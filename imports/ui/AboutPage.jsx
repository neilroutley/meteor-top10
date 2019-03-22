import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
  margin: 0,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  margin: 10,
  padding: grid,
  background: "8ac4ff"
});

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: Date("0000-00-0T00:00:00"),
      title: "About Top Ten",
      list: [
        { content: "Creating an account!", order: 0 },
        {
          content:
            "Figuring out what things you want to rank and creating a list",
          order: 1
        },
        { content: "Ranking other lists", order: 2 },
        { content: "Commenting on other lists", order: 3 },
        { content: "Reading your own lists comments", order: 4 },
        {
          content: "Seeing your list out of order and wanting to re-rank it",
          order: 5
        },
        {
          content:
            "Logging out and making a new account so you can rank your list how you wanted",
          order: 6
        },
        {
          content:
            "Checking your list again to make sure what YOU rated it is still correct",
          order: 7
        },
        {
          content:
            "Repeating steps over and over till you know your order is assured forever",
          order: 8
        },
        {
          content:
            "Realizing you can just rate a list as many times as you want, you don’t need to remake an account",
          order: 9
        }
      ],
      creator: "Guy K. Neil R.",
      _id: "0770770"
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder(list, startingIndex, endingIndex) {
    const resultList = Array.from(list);
    const [removed] = resultList.splice(startingIndex, 1);
    resultList.splice(endingIndex, 0, removed);
    this.setState({ list: resultList });
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

  //render a rank container and add the top ten lists, based on each ranking avalible in the database,
  render() {
    return (
      <div className="container text-center">
        <div className="topTenAboutContainer m-4" key={this.state.title}>
          <div>
            <div className="bg-light border rounded">
              <h1>{this.state.title}</h1>
            </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="media-body-about shadow-sm rounded bg-white border"
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
                            className="media-body-about p-2 shadow-sm rounded bg-light border"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className="col-2 d-inline-block border p-0 bg-white">
                              {(item.order = index + 1)}
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
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
