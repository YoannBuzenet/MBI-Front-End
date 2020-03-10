import React, { useContext, useState, useEffect } from "react";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import sellRequestAPI from "../../services/sellRequestAPI";

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
  });

  useEffect(() => {
    if (currentStatus == "Soumis" || currentStatus === "Envoyé") {
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
    } else if (currentStatus === "Reçu") {
      setAvailableOptions([
        {
          status: "En traitement",
          value: "dateProcessing"
        },
        {
          status: "En attente de validation client",
          value: "dateApprovalPending"
        }
      ]);
    } else if (currentStatus === "En traitement") {
      setAvailableOptions([
        {
          status: "En attente de validation client",
          value: "dateApprovalPending"
        }
      ]);
    }
  }, [currentStatus]);

  const validateSellRequest = () => {
    // console.log("le rachat va etre validé");
    const newData = {
      dateValidated: new Date()
    };
    sellRequestAPI
      .updateAsShop(currentAdminSellRequest.id, newData)
      .then(data => {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          dateValidated: data.data.dateValidated
        });
      });
  };

  const cancelSellRequest = () => {
    const newData = {
      dateCanceled: new Date()
    };
    sellRequestAPI
      .updateAsShop(currentAdminSellRequest.id, newData)
      .then(data => {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          dateCanceled: data.data.dateCanceled
        });
      });
  };

  const handleChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    // console.log(value);

    const newData = {
      [value]: new Date()
    };

    sellRequestAPI
      .updateAsShop(currentAdminSellRequest.id, newData)
      .then(data => {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          [value]: data.data[value]
        });
        // console.log(data.data);
        // console.log(data.data[value]);
      });
  };

  // console.log(currentAdminSellRequest);

  return (
    <>
      {currentAdminSellRequest.id && (
        <p>Ceci est un menu d'options pour MAJ le statut du rachat</p>
      )}
      {availableOptions.length > 0 && (
        <select
          value="default"
          onChange={event => {
            handleChange(event);
          }}
        >
          {availableOptions
            .concat({ status: "Choisir un statut", value: "default" })
            .map((option, index) => {
              return (
                <option value={option.value} key={index}>
                  {option.status}
                </option>
              );
            })}
        </select>
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
