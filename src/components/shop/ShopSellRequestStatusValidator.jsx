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
import mailAPI from "../../services/mailAPI";
import SelectAppLangContext from "../../context/selectedAppLang";

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

  //App language
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  // TRANSLATION
  //Hook Intl to translate an attribute
  const intl = useIntl();

  console.log(currentAdminSellRequest);

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
    } else if (currentStatus === "Cancelled") {
      setAvailableOptions([
        {
          status: receivedStatusTranslation,
          value: "dateRecu",
        },
        {
          status: beingProcessedValidationStatusTranslation,
          value: "dateProcessing",
        },
        {
          status: awaitingCustomerValidationStatusTranslation,
          value: "dateApprovalPending",
        },
      ]);
    }
  }, [currentStatus, currentAdminSellRequest]);

  const validateSellRequest = async (event) => {
    if (
      authenticationInfos.shop &&
      authenticationInfos.shop.ExpirationMkmToken > new Date().getTime()
    ) {
      const newData = {
        dateValidated: new Date(),
        sellRequestCards: [
          currentAdminSellRequest.sellRequests.map((card) => {
            return {
              id: card.id,
              mkmSellPrice:
                card.mkmSellPrice && card.mkmSellPrice !== 0
                  ? card.mkmSellPrice
                  : card.AutomaticSellingPrice,
            };
          }),
        ],
      };

      if (
        currentAdminSellRequest.sellRequests.filter(
          (card) => card.mkmSellPrice === 0
        ).length > 0
      ) {
        toast.error(
          <FormattedMessage
            id="app.shop.MKMPOSTrequest.toast.errorPriceis0"
            defaultMessage={`One of your selling prices is set up to 0. Please check your selling prices.`}
          />
        );
        //Ending the whole function is a selling price is set to 0
        return;
      }

      console.log(newData);

      try {
        //1. We must create a XML object for each 100 items => Sell Request modulo 100
        //2. Header created + MKM Request
        //3. Confirm Request has been posted
        //4. Validate + update Sell Request UI to mark it's done + save the selling Price into Sell Request Card ID

        const header = MKMAPI.buildOAuthHeader(
          "POST",
          MKMAPI.URL_MKM_SANDBOX_ADD_STOCK,
          authenticationInfos.shop.appToken,
          authenticationInfos.shop.appSecret,
          authenticationInfos.shop.accessToken,
          authenticationInfos.shop.accessSecret
        );

        const numberOfCutsInSellRequests =
          currentAdminSellRequest.sellRequests.length % 100;

        for (let i = 0; i < numberOfCutsInSellRequests; i++) {
          let chunkOfRequest = currentAdminSellRequest.sellRequests.slice(
            i * 100,
            (i + 1) * 100
          );

          // console.log(chunkOfRequest);

          //Send the request HERE
          const XMLRequest = MKMAPI.transformSellRequestIntoXML(chunkOfRequest);

          MKMAPI.AddCardsToStock(XMLRequest, header);

          toast.success(
            <FormattedMessage
              id="app.shop.MKMPOSTrequest.toast.success"
              defaultMessage={`Cards have been posted to MCM successfully.`}
            />
          );

          //If everything happened without mistake, we update the Sell Request status to validated.

          const API_update = await sellRequestAPI.updateAsShop(
            currentAdminSellRequest.id,
            newData
          );

          setCurrentAdminSellRequest({
            ...currentAdminSellRequest,
            dateValidated: API_update.data.dateValidated,
          });

          mailAPI.sendMail({
            mailRequest: {
              action: "validated",
              user: authenticationInfos,
              infos: currentAdminSellRequest,
              langID: currentLang.langID,
            },
          });
        }
      } catch (error) {
        // console.log(error);
        // if (error.message) {
        //   console.log(error.message);
        // }
        toast.error(
          <FormattedMessage
            id="app.shop.MKMPOSTrequest.toast.failure"
            defaultMessage={`Cards couln't be added to MCM. Please try again.`}
          />
        );
      }
    } else {
      toast.info(
        <FormattedMessage
          id="app.shop.MKMPOSTrequest.toast.info"
          defaultMessage={`Please sync your account to MCM by following the procedure.`}
        />
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

    //Send ing Notification mail to customer
    mailAPI.sendMail({
      mailRequest: {
        action: "cancel",
        user: authenticationInfos,
        infos: currentAdminSellRequest,
        langID: currentLang.langID,
      },
    });
  };

  const handleChange = async ({ currentTarget }) => {
    const { value } = currentTarget;
    // console.log(value);

    let newData;

    //Preparing DB sending
    //As the Sell Request status is based on existing dates or not, we set non relevant one to null in order to stay up to date.
    if (value === "dateRecu") {
      newData = {
        [value]: new Date(),
        dateCanceled: null,
        dateProcessing: null,
        dateApprovalPending: null,
      };
    } else if (value === "dateProcessing") {
      newData = {
        [value]: new Date(),
        dateCanceled: null,
        dateApprovalPending: null,
      };
    } else {
      newData = {
        [value]: new Date(),
        dateCanceled: null,
      };
    }

    console.log("data pushing", newData);

    try {
      const dataSentToAPI = await sellRequestAPI.updateAsShop(
        currentAdminSellRequest.id,
        newData
      );
      //Preparing Context Updating
      //As the Sell Request status is based on existing dates or not, we set non relevant one to null in order to stay up to date.
      if (value === "dateRecu") {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          [value]: dataSentToAPI.data[value],
          dateApprovalPending: null,
          dateCanceled: null,
          dateProcessing: null,
        });
      } else if (value === "dateProcessing") {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          [value]: dataSentToAPI.data[value],
          dateApprovalPending: null,
          dateCanceled: null,
        });
      } else {
        setCurrentAdminSellRequest({
          ...currentAdminSellRequest,
          [value]: dataSentToAPI.data[value],
          dateCanceled: null,
        });
      }

      toast.success(
        <FormattedMessage
          id="app.shop.SellRequest.updatedSuccessfully"
          defaultMessage={`Please sync your account to MCM by following the procedure.`}
        />
      );
    } catch (err) {
      toast.error(
        <FormattedMessage
          id="app.shop.SellRequest.updatedSuccessfully"
          defaultMessage={`Please sync your account to MCM by following the procedure.`}
        />
      );
    }

    // console.log(data.data);
    // console.log(data.data[value]);

    let mailAction;
    console.log("value is:", value);
    switch (value) {
      case "dateRecu":
        mailAction = "received";
      case "dateProcessing":
        mailAction = "beingProcessed";
      case "dateApprovalPending":
        mailAction = "awaitingCustomerValidation";
    }

    mailAPI.sendMail({
      mailRequest: {
        action: mailAction,
        user: authenticationInfos,
        infos: currentAdminSellRequest,
        langID: currentLang.langID,
      },
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
      {availableOptions.length > 0 && currentStatus !== "Validé" && (
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
