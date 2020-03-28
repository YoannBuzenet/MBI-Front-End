import React, { useState, useEffect, useContext } from "react";
import sellRequestAPI from "../services/sellRequestAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { ToastContainer, toast } from "react-toastify";

const SellRequestStatusUpdater = ({
  currentSellRequest,
  setCurrentSellRequest,
  id
}) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  console.log(authenticationInfos);
  const [hasBeenSent, setHasBeenSent] = useState(true);

  console.log(currentSellRequest);

  useEffect(() => {
    if (currentSellRequest.id) {
      if (
        currentSellRequest.dateEnvoi == null &&
        currentSellRequest.dateRecu == null
      ) {
        setHasBeenSent(false);
        console.log(currentSellRequest);
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
          sellrequest => sellrequest.id == id
        ).dateEnvoi == null
      ) {
        setAuthenticationInfos({
          ...authenticationInfos,
          customer: {
            ...authenticationInfos.customer,
            SellRequests: authenticationInfos.customer.SellRequests.map(
              sellrequest =>
                sellrequest.id == id
                  ? (sellrequest = {
                      ...sellrequest,
                      dateEnvoi: currentSellRequest.dateEnvoi
                    })
                  : sellrequest
            )
          }
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
            sellrequest =>
              sellrequest.id == id
                ? (sellrequest = {
                    ...sellrequest,
                    dateEnvoi: currentSellRequest.dateEnvoi
                  })
                : sellrequest
          )
        }
      };
      authAPI.updateUserInfosLocalStorage(dataToUpdateOnLocalStorage);
    }
  }, [currentSellRequest]);

  //Registering the sell request as SENT
  const handleClick = (event, currentSellRequest) => {
    sellRequestAPI
      .update(currentSellRequest.id, { dateEnvoi: new Date() })
      .then(data =>
        setCurrentSellRequest({
          ...currentSellRequest,
          dateEnvoi: data.data.dateEnvoi
        })
      )
      .then(toast.success("Le rachat a été marqué comme envoyé."))
      .catch(error => {
        console.log(error);
        return toast.error(
          "Le rachat n'a pu être marqué comme envoyé. Merci de rééssayer."
        );
      });
  };

  return (
    <>
      {currentSellRequest && !hasBeenSent ? (
        <button
          onClick={event => {
            handleClick(event, currentSellRequest);
          }}
        >
          Marquer ce rachat comme envoyé
        </button>
      ) : null}
    </>
    // TODO : ADD A TRACKING NUMBER
  );
};

export default SellRequestStatusUpdater;
