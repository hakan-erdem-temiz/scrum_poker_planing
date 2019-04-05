import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th className="bg-secondary" key={index}>
              {" "}
              {column}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
