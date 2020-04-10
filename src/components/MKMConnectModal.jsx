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
        <h2>Connection à Magic Card Market</h2>
        <p>
          <span className="styled-ol-number">1.</span>Identifie toi sur le site
          MKM
        </p>
        <p>
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
        <p>
          <span className="styled-ol-number">2.</span>Une fois
          l'authentification réussie, tu seras redirigé sur
          www.mtgInterface.com. Connecte toi sur ce site.
        </p>
        <p>
          <span className="styled-ol-number">3.</span>Une fois identifié avec le
          message de validation sur www.mtgInterface.com, tu n'as plus qu'à
          cliquer sur ce bouton ci-dessous :
        </p>
        <p className="syncronization-button">Synchroniser tous les sites</p>
      </div>
    </div>
  );
};

export default MKMConnectModal;
