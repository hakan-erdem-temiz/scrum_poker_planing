import React, { Component } from "react";
import Table from "../common/table";
import socketIOClient from "socket.io-client";

class StoryList extends Component {
  state = {
    stories: [],
    endpoint: "localhost:3001"
  };

  componentDidMount = () => {
    //taking stories at inital
    const socket = socketIOClient(this.state.endpoint);
    socket.on("add story", stories => {
      console.log("story");
      if (stories != this.state.stories) this.setState({ stories });
      console.log(stories);
      console.log("story");
    });
  };

  render() {
    return (
      <Table
        columns={["Story", "Story Point", "Status"]}
        data={this.state.stories}
      />
    );
  }
}

export default StoryList;
