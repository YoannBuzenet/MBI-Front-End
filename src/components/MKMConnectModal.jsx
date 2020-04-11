import React, { useContext } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";

const MKMConnectModal = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

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
              &#8594; Clique ici
            </a>
          </p>
          <div className="MKM-rule">
            <span className="styled-ol-number">2.</span>
            <p>
              Une fois l'authentification réussie, tu seras redirigé sur
              www.mtgInterface.com. Connecte toi sur ce site.
            </p>
          </div>
          <div className="MKM-rule">
            <span className="styled-ol-number">3.</span>
            <p>
              Une fois identifié avec le message de validation sur
              www.mtgInterface.com, tu n'as plus qu'à cliquer sur ce bouton
              ci-dessous.
            </p>
          </div>
          <p className="syncronization-button">
            <span className="sync-symbol">&#8634;</span>
            <span className="button-content">Synchroniser tous les sites</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MKMConnectModal;
