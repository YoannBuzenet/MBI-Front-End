import React, { useEffect } from "react";

const StatusCalculator = ({ sellRequest }) => {
  // useEffect(() => console.log(sellRequest), []);

  var status = "";
  //Keep this one for submit prop
  if (sellRequest.DateSubmit) {
    status = "Soumis";
  }

  if (sellRequest.dateEnvoi) {
    status = "Envoyé";
  }
  if (sellRequest.dateRecu) {
    status = "Reçu";
  }
  if (sellRequest.dateProcessing) {
    status = "En traitement";
  }
  if (sellRequest.dateApprovalPending) {
    status = "En attente de votre validation";
  }
  if (sellRequest.dateValidated) {
    status = "Validé";
  }
  if (sellRequest.dateCanceled) {
    status = "Cancelled";
  }

  return <>{status}</>;
};

export default StatusCalculator;
