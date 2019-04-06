import React, { Component } from "react";
import ActiveStory from "./ActiveStory";
import ScrumMasterPanel from "./ScrumMasterPanel";
import StoryList from "./StoryListTable";

class ScrumMasterView extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h4>Story List</h4>
          <StoryList />
        </div>
        <div className="col-md-4">
          <h4>Active Story</h4>
          <ActiveStory isAdmin={true} />
        </div>
        <div className="col-md-4">
          <h4>Scrum Master Panel</h4>
          <ScrumMasterPanel />
        </div>
      </div>
    );
  }
}

export default ScrumMasterView;
