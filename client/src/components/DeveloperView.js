import React, { Component } from "react";
import ActiveStory from "./ActiveStory";
import StoryList from "./StoryListTable";

class DeveloperView extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h4>Story List</h4>
          <StoryList />
        </div>
        <div className="col-md-6">
          <h4>Active Story</h4>
          <ActiveStory />
        </div>
      </div>
    );
  }
}

export default DeveloperView;
