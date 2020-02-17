import React, { useContext, useState, useEffect } from "react";
import AdminSellRequestContext from "../../context/adminSellRequestContext";

const ShopSellRequestStatusValidator = props => {
  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );

  const [availableOptions, setAvailableOptions] = useState([]);

  //We initialize the state to Cancelled so that the button to update the Sell Request remain hidden while the real status is being computed
  const [currentStatus, setCurrentStatus] = useState("Cancelled");

  useEffect(() => {
    //Keep this one for submit prop
    if (currentAdminSellRequest && currentAdminSellRequest.DateSubmit) {
      setCurrentStatus("Soumis");
    }

    if (currentAdminSellRequest && currentAdminSellRequest.dateEnvoi) {
      setCurrentStatus("Envoyé");
    }
    if (currentAdminSellRequest && currentAdminSellRequest.dateRecu) {
      setCurrentStatus("Reçu");
    }
    if (currentAdminSellRequest && currentAdminSellRequest.dateProcessing) {
      setCurrentStatus("En traitement");
    }
    if (
      currentAdminSellRequest &&
      currentAdminSellRequest.dateApprovalPending
    ) {
      setCurrentStatus("En attente de votre validation");
    }
    if (currentAdminSellRequest && currentAdminSellRequest.dateValidated) {
      setCurrentStatus("Validé");
    }
    if (currentAdminSellRequest && currentAdminSellRequest.dateCanceled) {
      setCurrentStatus("Cancelled");
    }

    if (currentStatus == "soumis") {
      setAvailableOptions([
        {
          status: "Reçu",
          value: "dateRecu"
        },
        {
          status: "En traitement",
          value: "dateProcessing"
        },
        {
          status: "En attente de validation client",
          value: "dateApprovalPending"
        }
      ]);
    }
  });

  const validateSellRequest = () => {
    console.log("le rachat va etre validé");
  };

  const cancelSellRequest = () => {
    console.log("le rachat va etre annulé");
  };

  return (
    <>
      {currentAdminSellRequest.id && (
        <p>Ceci est un menu d'options pour MAJ le statut du rachat</p>
      )}
      {currentStatus !== "Validé" && currentStatus !== "Cancelled" && (
        <>
          <button onClick={validateSellRequest}>Valider</button>
          <button onClick={cancelSellRequest}>Annuler</button>
        </>
      )}
    </>
  );
};

export default ShopSellRequestStatusValidator;
