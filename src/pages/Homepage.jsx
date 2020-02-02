import React from "react";
import SetList from "../components/SetList";
import LastModifications from "../components/LastModifications";

const mySellRequests = props => {
  return (
    <>
      <div className="container">
        <h1>Home Page</h1>
        <div className="content-split">
          <SetList />
          <LastModifications />
        </div>
      </div>
    </>
  );
};

export default mySellRequests;
