import React, { Component } from "react";
import _ from "lodash";
import socketIOClient from "socket.io-client";

class ActiveStory extends Component {
  state = {
    storyNumber: 1,
    selectedNumber: null,
    endpoint: "localhost:3001",
    vote: 0,
    isAdmin: null,
    sessionEnded: false
  };

  hanleClick = number => {
    this.setState({ selectedNumber: number });
    console.log(number);

    //sending sockets
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("selected number", {
      isAdmin: this.state.isAdmin,
      number: number
    }); // voter 'voted' to this.state.voter
  };

  componentDidMount = () => {
    this.setState({ isAdmin: this.props.isAdmin ? this.props.isAdmin : false });
  };

  componentDidUpdate = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("add story point", pointAndIndex => {
      console.log("add story point is null");
      this.setState({ selectedNumber: null });

      let storyNumber = pointAndIndex.index;
      storyNumber++;
      this.setState({ storyNumber });
    });

    socket.on("add story", story => {
      if (story.length < this.state.storyNumber) {
        this.setState({ sessionEnded: true });
        socket.disconnect();
      }
    });
  };

  render() {
    const numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, 223];
    return (
      <div>
        <div className="row">
          <div className="col" style={{ textAlign: "center" }}>
            <table className="table">
              <tbody>
                {_.chunk(numbers, 4).map((subArray, index) => (
                  <tr key={index}>
                    {subArray.map(number => (
                      <td className="border-0" key={number}>
                        <button
                          type="button"
                          disabled={
                            this.state.sessionEnded ||
                            (this.state.selectedNumber != null &&
                              this.state.selectedNumber !== number)
                          }
                          className="btn btn-light"
                          style={{
                            textAlign: "center",
                            padding: 0,
                            height: 50,
                            width: 50,
                            borderWidth: 4,
                            borderColor:
                              this.state.selectedNumber === number
                                ? "#90ee90"
                                : "black"
                          }}
                          onClick={() => this.hanleClick(number)}
                        >
                          {number}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ textAlign: "center" }}>
            <p>
              {this.state.selectedNumber
                ? `${this.state.selectedNumber} Voted`
                : this.state.sessionEnded
                ? "Session Ended Thanks!"
                : "Please Vote !!!"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveStory;
