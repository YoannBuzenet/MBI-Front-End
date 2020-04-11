import React, { useContext } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import BlackDivContext from "../context/blackDivModalContext";

const MKMConnectModal = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  //MKM Modal Control
  const { isMKMModalDisplayed, setIsMKMModalDisplayed } = useContext(
    MKM_ModalContext
  );
  //Black Div Control
  const { isBlackDivModalDisplayed, setIsBlackDivModalDisplayed } = useContext(
    BlackDivContext
  );

  const handleClick = (event) => {
    //Loading animation ?

    //Get info back from API to update MKM info on session to be able to do MKM API calls
    authAPI
      .refreshTokenAndInfos(authenticationInfos.refresh_token)
      .then((data) => {
        //Checker si la date de réception en session est VALIDE
        console.log(data);
        const authenticationInfoCopy = { ...authenticationInfos };
        authenticationInfoCopy.shop.accesToken = "updated";
        authenticationInfoCopy.shop.accesSecret = "updated";
        authenticationInfoCopy.shop.dateReceptionMKMToken = "updated";
        setAuthenticationInfos(authenticationInfoCopy);
        setIsMKMModalDisplayed("deactivated");
        setIsBlackDivModalDisplayed("deactivated");

        //Animation de validation ?

        return console.log(data);
      })
      .catch((err) => {
        toast.error(
          "Une erreur s'est produite. Merci de recommencer. En cas d'erreur prolongée, merci de contacter le support."
        );
        return console.log(err);
      });
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
          <p
            className="syncronization-button"
            onClick={(event) => handleClick(event)}
          >
            <span className="sync-symbol">&#8634;</span>
            <span className="button-content">Synchroniser tous les sites</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MKMConnectModal;
