import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SetsContext from "../context/setsContext";

const SetList = props => {
  const { allSets, setAllSets } = useContext(SetsContext);

  allSets.sort(function(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

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
            {allSets.map(set => {
              return (
                <tr key={set.id}>
                  <td>
                    <Link to={"/sets/" + set.id} className="setList-link">
                      {set.name}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SetList;
