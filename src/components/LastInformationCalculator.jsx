import React from "react";
import { useIntl } from "react-intl";

const LastInformationCalculator = ({ sellRequest }) => {
  var lastDate = "";

  //Hook Intl to translate an attribute
  const intl = useIntl();

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
    lastDate = new Date(lastDate);
    lastDate = intl.formatDate(lastDate);
  }

  return <>{lastDate}</>;
};

export default LastInformationCalculator;
