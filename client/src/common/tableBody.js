import React, { Component } from "react";

class TableBody extends Component {
  render() {
    const { data } = this.props;
    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((val, index) => (
              <td key={index}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
