import React from "react";
import SetList from "../components/SetList";
import LastModifications from "../components/LastModifications";

const mySellRequests = ({ handleAddSellingBasket }) => {
  return (
    <>
      <div className="container">
        <div className="content-split">
          <SetList />
          <LastModifications handleAddSellingBasket={handleAddSellingBasket} />
        </div>
      </div>
    </>
  );
};

export default mySellRequests;
