import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

const DateDisplayer = ({ dateToHandle }) => {
  //Hook Intl to translate an attribute
  const intl = useIntl();

  var date = "";

  if (dateToHandle !== null) {
    date = new Date(dateToHandle.date);
    date = intl.formatDate(date);
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
