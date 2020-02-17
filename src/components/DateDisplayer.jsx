import React from "react";
import moment from "moment";

const DateDisplayer = ({ dateToHandle }) => {
  var date = "";

  if (dateToHandle !== null) {
    date = new Date(dateToHandle.date);
    date = moment(date);
    date = date.format("YYYY-MM-DD");
  } else {
    date = "A venir";
  }

  return <>{date}</>;
};

export default DateDisplayer;
