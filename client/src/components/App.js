import React, { Component } from "react";
import AddStroyList from "./AddStoryList";
import scrumPoker from "../media/images/scrumPoker.png";
import ScrumMasterView from "./ScrumMasterView";
import DeveloperView from "./DeveloperView";
import { Route, Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    endpoint: "localhost:3001",
    vote: "empty"
  };

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change vote", this.state.vote); // voter 'voted' to this.state.voter
  };

  // adding the function
  setVote = vote => {
    this.setState({ vote });
  };

  // componentDidMount = () => {
  //   const socket = socketIOClient(this.state.endpoint);
  //   setInterval(this.send(), 1000);
  //   socket.on("change vote", vote => {
  //     this.setState({ vote });
  //   });
  // };

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("change vote", vote => {
      this.setState({ vote });
      document.body.style.backgroundColor = vote;
    });

    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => this.send()}>Change vote</button>

          <button id="blue" onClick={() => this.setVote("Red")}>
            Voted
          </button>
          <button id="red" onClick={() => this.setVote("Blue")}>
            Not Voted
          </button>
        </div>
        <main className="container">
          <div>
            <div>
              <Image className="img-fluid" src={scrumPoker} alt="logo" />
            </div>
            <div>
              <Route
                path="/ScrumMasterView"
                exact
                component={ScrumMasterView}
              />
              <Route path="/" exact component={AddStroyList} />
              <Route path="/DeveloperView" exact component={DeveloperView} />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
