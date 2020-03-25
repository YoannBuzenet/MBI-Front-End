import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SetsContext from "../context/setsContext";
import SetListLoader from "./loaders/SetListLoader";

const SetList = props => {
  const { allSets, setAllSets } = useContext(SetsContext);

  //sorting sets by their name before displaying them
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
        <h2>Set Name</h2>
        <table className="setList-table">
          <tbody>
            {allSets.length === 0 && <SetListLoader />}
            {allSets.length > 0 &&
              allSets.map(set => {
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
