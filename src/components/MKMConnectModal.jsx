import React, { useContext, useState } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import BlackDivContext from "../context/blackDivModalContext";
import CSSLoaderWaitingSpiral from "./loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage } from "react-intl";

const MKMConnectModal = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKM_ModalContext);
  //Black Div Control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //Loading
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    //Get info back from API to update MKM info on session to be able to do MKM API calls
    authAPI
      .refreshTokenAndInfos(authenticationInfos.refresh_token)
      .then((data) => {
        //TO DO Checker si la date de réception en session est VALIDE
        console.log(data);

        if (data.data.shop.dateReceptionMKMToken) {
          const authenticationInfoCopy = { ...authenticationInfos };

          authenticationInfoCopy.shop.accesToken = "updated";
          authenticationInfoCopy.shop.accesSecret = "updated";
          authenticationInfoCopy.shop.dateReceptionMKMToken = "updated";

          setAuthenticationInfos(authenticationInfoCopy);
          setIsMKMModalDisplayed("deactivated");
          setIsBlackDivModalDisplayed("deactivated");
          setIsLoading(false);

          toast.success("Vous êtes bien connecté à MKM.");
        } else {
          setIsLoading(false);

          toast.error(
            "Les données ne sont pas à jour. Merci de bien suivre les étapes."
          );
        }
      })
      .catch((err) => {
        toast.error(
          "Une erreur s'est produite. Merci de recommencer. En cas d'erreur prolongée, merci de contacter le support."
        );
        setIsLoading(false);
        return console.log(err);
      });
    setIsLoading(false);
  };

  return (
    <div className="MKM-connection-modal">
      <div>
        <div className="mkm-modal-container">
          <h2>Connection à Magic Card Market</h2>
          <div className="MKM-rule">
            <span className="styled-ol-number">1.</span>
            <p>S'identifier sur le site de MKM</p>
          </div>
          <p className="mkm_link_auth">
            <a
              href={
                MKMAPI.MKM_AUTHENTICATION_URL_BASE +
                authenticationInfos.shop.appToken
              }
              target="_blank"
            >
              &#8594; Cliquez ici &#8592;
            </a>
          </p>
          <div className="MKM-rule">
            <span className="styled-ol-number">2.</span>
            <p>
              Une fois l'authentification réussie, vous serez redirigé sur
              www.mtgInterface.com. Merci de vous identifier.
            </p>
          </div>
          <div className="MKM-rule">
            <span className="styled-ol-number">3.</span>
            <p>
              Une fois identifié avec le message de validation sur
              www.mtgInterface.com, il n'y a plus qu'à synchroniser.
            </p>
          </div>
          <div
            className="syncronization-button"
            onClick={(event) => {
              handleClick(event);
              return setIsLoading(true);
            }}
          >
            {isLoading && (
              <span className="CSS-Loader-MKM">
                <CSSLoaderWaitingSpiral />
              </span>
            )}
            {!isLoading && (
              <>
                <span className="sync-symbol">&#8634;</span>
                <span className="button-content">Synchroniser</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MKMConnectModal;
