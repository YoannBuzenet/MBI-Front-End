import React, { useContext } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";

const MKMConnectModal = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const handleClick = (event) => {
    //récupérer les infos sur l'API
    console.log(
      "récupération des infos de l API, mise à jour de la session, disparition de cette fenetre"
    );
  };

  return (
    <div className="MKM-connection-modal">
      <div>
        <div className="mkm-modal-container">
          <h2>Connection à Magic Card Market</h2>
          <div className="MKM-rule">
            <span className="styled-ol-number">1.</span>
            <p>Identifie toi sur le site MKM</p>
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
