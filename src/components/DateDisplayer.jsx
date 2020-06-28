import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

const DateDisplayer = ({ dateToHandle }) => {
  console.log(dateToHandle);
  //Hook Intl to translate an attribute
  const intl = useIntl();

  var date = "";

  if (dateToHandle !== null) {
    if (dateToHandle.date) {
      date = new Date(dateToHandle.date);
      date = intl.formatDate(date);
    } else {
      date = intl.formatDate(dateToHandle);
    }
  } else {
    date = (
      <FormattedMessage
        id="app.dateDisplayer.dateNotKnownYet"
        defaultMessage={`N/A`}
      />
    );
  }

  console.log(date);

  return <>{date}</>;
};

export default DateDisplayer;
