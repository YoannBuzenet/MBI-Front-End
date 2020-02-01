import React from "react";
import { Link } from "react-router-dom";
const SetList = props => {
  return (
    <>
      <div className="left-div">
        <table className="setList-table">
          <thead>
            <tr>
              <th>Set Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/sets/1" className="setList-link">
                  Name 1
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/sets/IDSET" className="setList-link">
                  Name 2
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/sets/IDSET" className="setList-link">
                  Name 3
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SetList;
