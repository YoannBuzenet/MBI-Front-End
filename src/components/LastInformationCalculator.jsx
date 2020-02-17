import React from "react";
import moment from "moment";

const LastInformationCalculator = ({ sellRequest }) => {
  //TODO GIVE A FORMAT FOLLOWING THE AREA (EN date, EU/FR date)
  var lastDate = "";

  //Keep this one for submit prop
  if (sellRequest.DateSubmit) {
    lastDate = sellRequest.DateSubmit;
  }

  if (sellRequest.dateEnvoi) {
    lastDate = sellRequest.dateEnvoi;
  }
  if (sellRequest.dateRecu) {
    lastDate = sellRequest.dateRecu;
  }
  if (sellRequest.dateProcessing) {
    lastDate = sellRequest.dateProcessing;
  }
  if (sellRequest.dateApprovalPending) {
    lastDate = sellRequest.dateApprovalPending;
  }
  if (sellRequest.dateValidated) {
    lastDate = sellRequest.dateValidated;
  }
  if (sellRequest.dateCanceled) {
    lastDate = sellRequest.dateCanceled;
  }

  if (lastDate.length > 0) {
    console.log(lastDate);
    console.log(typeof lastDate);
    lastDate = new Date(lastDate);
    lastDate = moment(lastDate);
    lastDate = lastDate.format("YYYY-MM-DD");
  }

  return (
    <>
      {lastDate}
      {/* {lastDate.getFullYear() +
        " " +
        lastDate.getFullYear() +
        " " +
        lastDate.getFullYear()} */}
    </>
  );
};

export default LastInformationCalculator;
