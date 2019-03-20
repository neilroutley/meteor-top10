import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

class Submit extends Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.list = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasDuplicates(a) {
    var counts = [];
    for (var i = 0; i <= a.length; i++) {
      if (counts[a[i]] === undefined) {
        counts[a[i]] = 1;
      } else {
        return true;
      }
    }
    return false;
  }

  convertList() {
    return {
      title: this.title.value,
      list: [
        { content: this.list.item1.value, order: 0 },
        { content: this.list.item2.value, order: 1 },
        { content: this.list.item3.value, order: 2 },
        { content: this.list.item4.value, order: 3 },
        { content: this.list.item5.value, order: 4 },
        { content: this.list.item6.value, order: 5 },
        { content: this.list.item7.value, order: 6 },
        { content: this.list.item8.value, order: 7 },
        { content: this.list.item9.value, order: 8 },
        { content: this.list.item10.value, order: 9 }
      ]
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.list);
    if (
      this.hasDuplicates(
        Array.from([
          this.list.item1.value,
          this.list.item2.value,
          this.list.item3.value,
          this.list.item4.value,
          this.list.item5.value,
          this.list.item6.value,
          this.list.item7.value,
          this.list.item8.value,
          this.list.item9.value,
          this.list.item10.value
        ])
      )
    ) {
      //array has hasDuplicates
      //alert("Duplicates not allowed");
      console.log("duplicates not allowed");
      return;
    }
    //otherwise convert to correct format and send to database
    var convertedList = this.convertList();
    console.log(convertedList);
    //also want to include the titleInput
    Meteor.call("ranking.add", convertedList, (err, res) => {
      if (err) {
        alert("There was error adding list check the console");
        console.log(err);
        return;
      }

      console.log("ranking updated", res);
      //reset form
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameImput">Title:</label>
            <input
              type="text"
              name="title"
              ref={input => (this.title = input)}
              className="form-control"
              id="titleInput"
              placeholder="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="item1Input">Item 1:</label>
            <input
              name="item1"
              type="text"
              ref={input => (this.list.item1 = input)}
              className="form-control"
              id="item1Input"
            />
            <label htmlFor="item2Input">Item 2:</label>
            <input
              name="item2"
              type="text"
              ref={input => (this.list.item2 = input)}
              className="form-control"
              id="item2Input"
            />
            <label htmlFor="item3Input">Item 3:</label>
            <input
              name="item3"
              type="text"
              ref={input => (this.list.item3 = input)}
              className="form-control"
              id="item3Input"
            />
            <label htmlFor="item4Input">Item 4:</label>
            <input
              name="item4"
              type="text"
              ref={input => (this.list.item4 = input)}
              className="form-control"
              id="item4Input"
            />
            <label htmlFor="item5Input">Item 5:</label>
            <input
              name="item5"
              type="text"
              ref={input => (this.list.item5 = input)}
              className="form-control"
              id="item5Input"
            />
            <label htmlFor="item6Input">Item 6:</label>
            <input
              name="item6"
              type="text"
              ref={input => (this.list.item6 = input)}
              className="form-control"
              id="item6Input"
            />
            <label htmlFor="item7Input">Item 7:</label>
            <input
              name="item7"
              type="text"
              ref={input => (this.list.item7 = input)}
              className="form-control"
              id="item7Input"
            />
            <label htmlFor="item8Input">Item 8:</label>
            <input
              name="item8"
              type="text"
              ref={input => (this.list.item8 = input)}
              className="form-control"
              id="item8Input"
            />
            <label htmlFor="item9Input">Item 9:</label>
            <input
              name="item9"
              type="text"
              ref={input => (this.list.item9 = input)}
              className="form-control"
              id="item9Input"
            />
            <label htmlFor="item10Input">Item 10:</label>
            <input
              name="item10"
              type="text"
              ref={input => (this.list.item10 = input)}
              className="form-control"
              id="item10Input"
            />
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default Submit;
