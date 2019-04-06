import React, { Component } from "react";
import AddStroyList from "./AddStoryList";
import scrumPoker from "../media/images/scrumPoker.png";
import ScrumMasterView from "./ScrumMasterView";
import DeveloperView from "./DeveloperView";
import { Route, Switch, Redirect } from "react-router-dom";
import { Image } from "react-bootstrap";

class App extends Component {
  state = {
    endpoint: "localhost:3001"
  };

  render() {
    return (
      <React.Fragment>
        <main className="container" style={{ paddingTop: 30 }}>
          <div>
            <div className="row">
              <div className="col-6">
                <Image className="img-fluid" src={scrumPoker} alt="logo" />
              </div>
              <div className="col-6">
                <p>Share Link: http://localhost:3000/DeveloperView</p>
              </div>
            </div>
            <div>
              <Switch>
                <Route
                  path="/ScrumMasterView"
                  exact
                  component={ScrumMasterView}
                />
                <Route path="/DeveloperView" exact component={DeveloperView} />
                <Route path="/AddStroyList" component={AddStroyList} />
                <Redirect from="/" exact to="/AddStroyList" />
              </Switch>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
