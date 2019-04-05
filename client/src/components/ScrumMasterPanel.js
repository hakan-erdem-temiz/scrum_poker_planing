import React, { Component } from "react";
import TableBody from "../common/tableBody";
class ScrumMasterPanel extends Component {
  state = {
    storyNumber: 1
  };
  m = [
    {
      Voter: "voter 1 :",
      vote: "5"
    },
    {
      Voter: "voter 2 :",
      vote: "5"
    }
  ];
  render() {
    return (
      <div>
        <div>
          <p>{`Story ${this.state.storyNumber} is active`}</p>
        </div>
        <table>
          <TableBody columns={["", ""]} data={this.m} />
          <tbody>
            <tr>
              <td>Scrum Master: 15</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button> {`End Voting For Story ${this.state.storyNumber}`}</button>
        </div>
      </div>
    );
  }
}

export default ScrumMasterPanel;
