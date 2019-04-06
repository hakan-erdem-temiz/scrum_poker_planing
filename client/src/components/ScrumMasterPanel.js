import React, { Component } from "react";
import TableBody from "../common/tableBody";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router-dom";

class ScrumMasterPanel extends Component {
  state = {
    storyNumber: 1,
    endpoint: "localhost:3001",
    voters: [],
    adminVote: null,
    isVoteDone: false,
    finalNumber: ""
  };

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("voters number", votersNumber => {
      let voters = [];
      for (let i = 1; i <= votersNumber; i++) {
        voters.push({
          voter: `voter ${i} : `,
          vote: "Not Voted"
        });
      }

      this.setState({ voters });
    });

    socket.on("add story point", pointAndIndex => {
      let storyNumber = pointAndIndex.index;
      storyNumber++;
      this.setState({ storyNumber });
    });
  };

  componentDidUpdate = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("selected number", selectedNumbers => {
      let voters = [];
      if (selectedNumbers.length > 1) {
        this.setState({ isVoteDone: true });
        let voteNumber = 1;
        for (let i = 0; i < selectedNumbers.length; i++) {
          if (selectedNumbers[i].isAdmin) {
            this.setState({ adminVote: selectedNumbers[i].number });
            continue; //this is admin not voter
          }
          voters.push({
            voter: `voter ${voteNumber} : `,
            vote: selectedNumbers[i].number
          });
          voteNumber++;
        }

        this.setState({ voters });
      }
    });
  };

  hanleClick = () => {
    const socket = socketIOClient(this.state.endpoint);
    //sending sockets
    socket.emit("add story point", {
      point: this.state.finalNumber,
      index: ""
    });

    //reset  voters

    let voters = [];
    for (let i = 1; i <= this.state.voters.length; i++) {
      voters.push({
        voter: `voter ${i} : `,
        vote: "Not Voted"
      });
    }

    this.setState({ voters });

    //reset
    this.setState({ isVoteDone: false });
  };

  handleChangeNumber = ({ currentTarget: input }) => {
    this.setState({ finalNumber: input.value });
  };

  render() {
    return (
      <div>
        <div>
          <p>{`Story ${this.state.storyNumber} is active`}</p>
        </div>
        <table>
          <TableBody columns={["", ""]} data={this.state.voters} />
          <tbody>
            <tr>
              <td>
                Scrum Master:{" "}
                {this.state.isVoteDone ? this.state.adminVote : "Not Voted"}
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.isVoteDone ? (
          <div style={{ textAlign: "center" }}>
            {this.state.voters.every(
              a => a.vote == this.state.voters[0].vote
            ) ? (
              ""
            ) : (
              <p style={{ color: "red" }}>Seems team has differnt votes</p>
            )}
            <div>
              <p>Please discuss and finalize the score below textbox</p>
            </div>
            <div>Final Score</div>
            <textarea
              style={{ width: 90, resize: "none", height: 30 }}
              placeholder="score"
              onChange={this.handleChangeNumber}
              value={this.state.votersNumber}
            />
          </div>
        ) : null}
        <div style={{ textAlign: "center" }}>
          <button
            disabled={!this.state.isVoteDone}
            onClick={() => {
              this.hanleClick();
            }}
          >
            {" "}
            {`End Voting For Story ${this.state.storyNumber}`}
          </button>
          {this.state.adminVote ? (
            ""
          ) : (
            <p style={{ color: "red" }}>
              You can not end voting till each teammate voted
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default ScrumMasterPanel;
