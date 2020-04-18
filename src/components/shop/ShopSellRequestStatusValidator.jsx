import React, { useContext, useState, useEffect } from "react";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import sellRequestAPI from "../../services/sellRequestAPI";
import { toast } from "react-toastify";
import MKMAPI from "../../services/MKMAPI";
import AuthContext from "../../context/authContext";
import MKM_ModalContext from "../../context/mkmModalConnectionContext";
import BlackDivContext from "../../context/blackDivModalContext";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

const ShopSellRequestStatusValidator = () => {
  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );

  //Current Authentication
  const { authenticationInfos } = useContext(AuthContext);

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKM_ModalContext);

  //Black Div Control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  const [availableOptions, setAvailableOptions] = useState([]);

  //We initialize the state to Cancelled so that the button to update the Sell Request remain hidden while the real status is being computed
  const [currentStatus, setCurrentStatus] = useState("Cancelled");

  // TRANSLATION

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const defaultOptionTranslation = intl.formatMessage({
    id: "app.shop.sellrequestValidator.defaultOption",
    defaultMessage: "Select a status",
  });

  const receivedStatusTranslation = intl.formatMessage({
    id: "app.shop.sellrequestValidator.receivedStatus",
    defaultMessage: "Received",
  });
  const awaitingProcessingStatusTranslation = intl.formatMessage({
    id: "app.shop.sellrequestValidator.awaitingProcessing",
    defaultMessage: "Awaiting Processing",
  });
  const awaitingCustomerValidationStatusTranslation = intl.formatMessage({
    id: "app.shop.sellrequestValidator.awaitingCustomerValidation",
    defaultMessage: "Awaiting Customer Validation",
  });
  const beingProcessedValidationStatusTranslation = intl.formatMessage({
    id: "app.shop.sellrequestValidator.beingProcessed",
    defaultMessage: "Being Processed",
  });

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
  }, [currentAdminSellRequest]);

  useEffect(() => {
    if (currentStatus === "Soumis" || currentStatus === "Envoyé") {
      setAvailableOptions([
        {
          status: receivedStatusTranslation,
          value: "dateRecu",
        },
        {
          status: awaitingProcessingStatusTranslation,
          value: "dateProcessing",
        },
        {
          status: awaitingCustomerValidationStatusTranslation,
          value: "dateApprovalPending",
        },
      ]);
    } else if (currentStatus === "Reçu") {
      setAvailableOptions([
        {
          status: beingProcessedValidationStatusTranslation,
          value: "dateProcessing",
        },
        {
          status: awaitingCustomerValidationStatusTranslation,
          value: "dateApprovalPending",
        },
      ]);
    } else if (currentStatus === "En traitement") {
      setAvailableOptions([
        {
          status: awaitingCustomerValidationStatusTranslation,
          value: "dateApprovalPending",
        },
      ]);
    }
  }, [currentStatus, currentAdminSellRequest]);

  const validateSellRequest = async (event) => {
    // console.log("le rachat va etre validé");

    //TODO : CHECK IS MKM CREDENTIALS ARE UP TO DATE
    //CHECK IF DATE IS STILL VALID
    if (authenticationInfos.shop.dateReceptionMKMToken) {
      const newData = {
        dateValidated: new Date(),
      };
      try {
        const API_update = await sellRequestAPI.updateAsShop(
          currentAdminSellRequest.id,
          newData
        );
        console.log("api update ok");

        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          dateValidated: API_update.data.dateValidated,
        });
        console.log("session update ok");

        //TODO - CHECK XML IS WELL FORMED AND SENT TO MKM
        MKMAPI.transformSellRequestIntoXML(currentAdminSellRequest);
        console.log("mkm prévenu");
      } catch (error) {
        toast.error(
          "Le rachat n'a pu être validé. Merci de recommencer ultérieurement."
        );
      }
    } else {
      toast.info(
        "Merci de suivre la procédure de synchronisation. Vous pourrez ensuite valider votre rachat."
      );
      setIsBlackDivModalDisplayed("activated");
      setIsMKMModalDisplayed("activated");
    }
  };

  const cancelSellRequest = () => {
    const newData = {
      dateCanceled: new Date(),
    };
    sellRequestAPI
      .updateAsShop(currentAdminSellRequest.id, newData)
      .then((data) => {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          dateCanceled: data.data.dateCanceled,
        });
      });
  };

  const handleChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    // console.log(value);

    const newData = {
      [value]: new Date(),
    };

    sellRequestAPI
      .updateAsShop(currentAdminSellRequest.id, newData)
      .then((data) => {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          [value]: data.data[value],
        });
        // console.log(data.data);
        // console.log(data.data[value]);
      });
  };

  return (
    <>
      {currentAdminSellRequest.id && currentStatus !== "Validé" && (
        <p>
          <FormattedMessage
            id="app.shop.sellrequestValidator.title"
            defaultMessage={`Update current status`}
          />
        </p>
      )}
      {availableOptions.length > 0 && (
        <select
          value="default"
          onChange={(event) => {
            handleChange(event);
          }}
        >
          {availableOptions
            .concat({ status: defaultOptionTranslation, value: "default" })
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
          <button onClick={(event) => validateSellRequest(event)}>
            <FormattedMessage
              id="app.shop.sellrequestValidator.validationCTA"
              defaultMessage={`Validate`}
            />
          </button>
          <button onClick={cancelSellRequest}>
            <FormattedMessage
              id="app.shop.sellrequestValidator.cancelCTA"
              defaultMessage={`Cancel`}
            />
          </button>
        </>
      )}
    </>
  );
};

export default ShopSellRequestStatusValidator;
