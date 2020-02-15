import React, { useEffect } from "react";

const StatusCalculator = ({ sellRequest }) => {
  // useEffect(() => console.log(sellRequest), []);

  var status = "";
  //Keep this one for submit prop
  if (sellRequest && sellRequest.DateSubmit) {
    status = "Soumis";
  }

  if (sellRequest && sellRequest.dateEnvoi) {
    status = "Envoyé";
  }
  if (sellRequest && sellRequest.dateRecu) {
    status = "Reçu";
  }
  if (sellRequest && sellRequest.dateProcessing) {
    status = "En traitement";
  }
  if (sellRequest && sellRequest.dateApprovalPending) {
    status = "En attente de votre validation";
  }
  if (sellRequest && sellRequest.dateValidated) {
    status = "Validé";
  }
  if (sellRequest && sellRequest.dateCanceled) {
    status = "Cancelled";
  }

  return <>{status}</>;
};

export default StatusCalculator;
