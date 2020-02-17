import React, { useContext } from "react";
import AdminSellRequestContext from "../../context/adminSellRequestContext";

const ShopSellRequestStatusValidator = props => {
  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );

  //Determine the current status and the actions associated with it
  var status = "";
  //Keep this one for submit prop
  if (currentAdminSellRequest && currentAdminSellRequest.DateSubmit) {
    status = "Soumis";
  }

  if (currentAdminSellRequest && currentAdminSellRequest.dateEnvoi) {
    status = "Envoyé";
  }
  if (currentAdminSellRequest && currentAdminSellRequest.dateRecu) {
    status = "Reçu";
  }
  if (currentAdminSellRequest && currentAdminSellRequest.dateProcessing) {
    status = "En traitement";
  }
  if (currentAdminSellRequest && currentAdminSellRequest.dateApprovalPending) {
    status = "En attente de votre validation";
  }
  if (currentAdminSellRequest && currentAdminSellRequest.dateValidated) {
    status = "Validé";
  }
  if (currentAdminSellRequest && currentAdminSellRequest.dateCanceled) {
    status = "Cancelled";
  }

  return (
    <>
      {currentAdminSellRequest.id && (
        <p>Ceci est un menu d'options pour MAJ le statut du rachat</p>
      )}
      Statut actuel : {status}
    </>
  );
};

export default ShopSellRequestStatusValidator;
