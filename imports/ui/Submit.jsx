import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";

class Submit extends Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.list = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirectToHome: false
    };
  }

  //checks the list for duplicates
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

  //converts list to the correct list
  convertList() {
    let stringTitle =
      this.title.value.charAt(0).toUpperCase() + this.title.value.slice(1);
    return {
      title: stringTitle,
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
  //handles submit, checks array and then sends converted list to database
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
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="primary-color rounded border">
        <div className="bg-light border rounded">
          <h1 className="">Create Ranking</h1>
        </div>

        <div className="p-4 text-right">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="nameImput">
                Title:
              </label>
              <input
                type="text"
                name="title"
                ref={input => (this.title = input)}
                className="col mr-3"
                id="titleInput"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item1Input">
                Item 1:
              </label>
              <input
                name="item1"
                type="text"
                ref={input => (this.list.item1 = input)}
                className="form-control col mr-3"
                id="item1Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item2Input">
                Item 2:
              </label>
              <input
                name="item2"
                type="text"
                ref={input => (this.list.item2 = input)}
                className="form-control col mr-3"
                id="item2Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item3Input">
                Item 3:
              </label>
              <input
                name="item3"
                type="text"
                ref={input => (this.list.item3 = input)}
                className="form-control col mr-3"
                id="item3Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item4Input">
                Item 4:
              </label>
              <input
                name="item4"
                type="text"
                ref={input => (this.list.item4 = input)}
                className="form-control col mr-3"
                id="item4Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item5Input">
                Item 5:
              </label>
              <input
                name="item5"
                type="text"
                ref={input => (this.list.item5 = input)}
                className="form-control col mr-3"
                id="item5Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item6Input">
                Item 6:
              </label>
              <input
                name="item6"
                type="text"
                ref={input => (this.list.item6 = input)}
                className="form-control col mr-3"
                id="item6Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item7Input">
                Item 7:
              </label>
              <input
                name="item7"
                type="text"
                ref={input => (this.list.item7 = input)}
                className="form-control col mr-3"
                id="item7Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item8Input">
                Item 8:
              </label>
              <input
                name="item8"
                type="text"
                ref={input => (this.list.item8 = input)}
                className="form-control col mr-3"
                id="item8Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item9Input">
                Item 9:
              </label>
              <input
                name="item9"
                type="text"
                ref={input => (this.list.item9 = input)}
                className="form-control col mr-3"
                id="item9Input"
              />
            </div>

            <div className="form-group row">
              <label className="col-xl-2 col-sm-3 col-4" htmlFor="item10Input">
                Item 10:
              </label>
              <input
                name="item10"
                type="text"
                ref={input => (this.list.item10 = input)}
                className="form-control col mr-3"
                id="item10Input"
              />
            </div>
            <div className="text-center">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Submit;
