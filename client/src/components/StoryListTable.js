import React, { Component } from "react";
import Table from "../common/table";
class StoryList extends Component {
  m = [
    {
      story: "story1",
      storyPoint: "5",
      status: "voted"
    },
    {
      story: "story2",
      storyPoint: "6",
      status: "not voted"
    }
  ];
  render() {
    return <Table columns={["Story", "Story Point", "Status"]} data={this.m} />;
  }
}

export default StoryList;
