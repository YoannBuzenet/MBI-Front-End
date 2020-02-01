import React from "react";
import SetList from "../components/setList";

const mySellRequests = props => {
  return (
    <>
      <div className="container">
        <h1>Home Page</h1>
        <div className="content-split">
          <SetList />
          <div className="last-modification">Les dernières modifications</div>
        </div>
      </div>
    </>
  );
};

export default mySellRequests;
