import React, { Component } from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import _ from "lodash";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

class AddStoryList extends Component {
  state = {
    story: "",
    name: "",
    votersNumber: "",
    errors: { name: "", votersNumber: "" },
    endpoint: "localhost:3001"
  };

  //validate inputs
  validate = () => {
    const options = { abortEarly: false };
    const error = Joi.validate(this.state.data, this.schema, options);
    if (!error.error) return null;

    const errors = {};
    for (let item of error.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    let schema = {};

    //voters number and name has differnt schema
    switch (name) {
      case "name":
        schema.name = Joi.string()
          .alphanum()
          .min(1)
          .max(200)
          .required()
          .label("Name");
        break;
      case "votersNumber":
        schema.votersNumber = Joi.number()
          .min(1)
          .required()
          .label("Number of voters");
    }

    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChangeName = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty("name", input.value);

    //handle errors
    let error = { ...this.state.errors };
    if (errorMessage) {
      error.name = errorMessage;
    } else {
      delete error.name;
    }

    this.setState({ name: input.value, errors: error });
  };
  handleChangeNumber = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty("votersNumber", input.value);

    //handle errors
    let error = { ...this.state.errors };
    if (errorMessage) {
      error.votersNumber = errorMessage;
    } else {
      delete error.votersNumber;
    }

    this.setState({ votersNumber: input.value, errors: error });
  };
  handleChangeStory = e => {
    this.setState({ story: e.target.value });
  };

  disableButton() {
    let className = "btn btn-light ";
    return className.concat(
      className,
      _.isEmpty(this.state.errors) ? "" : "disabled"
    );
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    //[{ story: "", storyPoint: 0, Status: "not voted" }]

    let storyText = this.state.story.split("\n");
    let storyArray = [];

    storyText.map(story =>
      storyArray.push({ story: story, storyPoint: "", Status: "Not Voted" })
    );

    socket.emit("voters number", this.state.votersNumber); //send number of voters
    socket.emit("add story", storyArray); // voter 'voted' to this.state.voter
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3">
                  <p>Session Name</p>
                </div>
                <div className="col-md-9">
                  <textarea
                    style={{ width: "100%", resize: "none", height: 30 }}
                    placeholder="Name"
                    onChange={this.handleChangeName}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3">
                  <p style={{ width: 1000 }}>Number of voters</p>
                </div>
                <div className="col-md-9">
                  <textarea
                    style={{ width: "100%", resize: "none", height: 30 }}
                    placeholder="Number"
                    onChange={this.handleChangeNumber}
                    value={this.state.votersNumber}
                  />
                </div>
              </div>
            </div>
          </div>
          <p>Paste your story List (Each line will be converted as a story)</p>
          <textarea
            style={{ width: "100%", resize: "none", height: 300 }}
            placeholder="exp. Story1"
            onChange={this.handleChangeStory}
            value={this.state.story}
          />
          <div>
            <Link
              className={this.disableButton()}
              disabled={!_.isEmpty(this.state.errors)}
              style={{
                float: "right",
                padding: "10px 90px 10px 90px",
                marginTop: 20,
                borderColor: "black"
              }}
              to="/ScrumMasterView"
              onClick={() => this.send()}
            >
              Start Session
            </Link>

            {Object.values(this.state.errors).map((e, i) => (
              <p key={i} style={{ color: "red" }}>
                {e}
              </p>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

export default AddStoryList;
