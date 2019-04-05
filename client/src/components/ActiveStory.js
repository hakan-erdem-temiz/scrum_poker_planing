import React, { Component } from "react";
import _ from "lodash";

class ActiveStory extends Component {
  state = {
    selectedNumber: null
  };

  hanleClick = number => {
    this.setState({ selectedNumber: number });
    console.log(number);
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
                            this.state.selectedNumber != null &&
                            this.state.selectedNumber !== number
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
                : "Please Vote !!!"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveStory;
