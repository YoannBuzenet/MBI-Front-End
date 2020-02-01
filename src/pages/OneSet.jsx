import React from "react";
import SetList from "../components/setList";

const OneSet = props => {
  return (
    <>
      <div className="container">
        <h1>NOM EDITION</h1>
        <div className="content-split">
          <SetList />
          <div className="last-modification"></div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
