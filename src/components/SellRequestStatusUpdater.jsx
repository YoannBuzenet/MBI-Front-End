import React, { useState, useEffect, useContext } from "react";
import sellRequestAPI from "../services/sellRequestAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import mailAPI from "../services/mailAPI";
import SelectAppLangContext from "../context/selectedAppLang";

const SellRequestStatusUpdater = ({
  currentSellRequest,
  setCurrentSellRequest,
  id,
}) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  // console.log(authenticationInfos);
  const [hasBeenSent, setHasBeenSent] = useState(true);

  //App language
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  useEffect(() => {
    if (currentSellRequest.id) {
      if (
        currentSellRequest.dateEnvoi == null &&
        currentSellRequest.dateRecu == null
      ) {
        setHasBeenSent(false);
        // console.log(currentSellRequest);
        if (!hasBeenSent) {
          // console.log("ce rachat n'a pas été envoyé");
        }
      } else {
        setHasBeenSent(true);
      }
    }
  }, [currentSellRequest, hasBeenSent]);

  useEffect(() => {
    if (currentSellRequest.id && currentSellRequest.dateEnvoi) {
      if (
        hasBeenSent &&
        authenticationInfos.customer.SellRequests &&
        authenticationInfos.customer.SellRequests.find(
          (sellrequest) => sellrequest.id == id
        ).dateEnvoi == null
      ) {
        setAuthenticationInfos({
          ...authenticationInfos,
          customer: {
            ...authenticationInfos.customer,
            SellRequests: authenticationInfos.customer.SellRequests.map(
              (sellrequest) =>
                sellrequest.id == id
                  ? (sellrequest = {
                      ...sellrequest,
                      dateEnvoi: currentSellRequest.dateEnvoi,
                    })
                  : sellrequest
            ),
          },
        });
      }
    }
  }, [currentSellRequest, hasBeenSent]);

  //saving the change in local storage
  useEffect(() => {
    if (currentSellRequest.id) {
      var dataToUpdateOnLocalStorage = JSON.parse(
        window.localStorage.getItem("userInfos")
      );
      dataToUpdateOnLocalStorage = {
        ...dataToUpdateOnLocalStorage,
        client: {
          ...dataToUpdateOnLocalStorage.client,
          SellRequests: dataToUpdateOnLocalStorage.client.SellRequests.map(
            (sellrequest) =>
              sellrequest.id == id
                ? (sellrequest = {
                    ...sellrequest,
                    dateEnvoi: currentSellRequest.dateEnvoi,
                  })
                : sellrequest
          ),
        },
      };
      authAPI.updateUserInfosLocalStorage(dataToUpdateOnLocalStorage);
    }
  }, [currentSellRequest]);

  //Registering the sell request as SENT
  const handleClick = (event, currentSellRequest) => {
    sellRequestAPI
      .update(currentSellRequest.id, { dateEnvoi: new Date() })
      .then((response) => {
        setCurrentSellRequest({
          ...currentSellRequest,
          dateEnvoi: response.data.dateEnvoi,
        });
      })
      .then(
        toast.success(
          <FormattedMessage
            id="app.sellRequest.statusUpdate.toast.success"
            defaultMessage={`This Sell Request has been flagged as Sent.`}
          />
        )
      )
      .then(() => {
        mailAPI.sendMail({
          mailRequest: {
            action: "cardsSent",
            user: authenticationInfos,
            infos: [currentSellRequest],
            langID: currentLang.langID,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        return toast.error(
          <FormattedMessage
            id="app.sellRequest.statusUpdate.toast.failure"
            defaultMessage={`The sell request couldn't be updated. Please try again.`}
          />
        );
      });
  };

  return (
    <>
      {currentSellRequest &&
      !currentSellRequest.dateValidated &&
      !hasBeenSent ? (
        <p
          className="sellRequest-sending-button"
          onClick={(event) => {
            handleClick(event, currentSellRequest);
          }}
        >
          <FormattedMessage
            id="app.sellRequest.statusUpdate.button"
            defaultMessage={`Sent.`}
          />
        </p>
      ) : null}
    </>
    // TODO : ADD A TRACKING NUMBER
  );
};

export default SellRequestStatusUpdater;
