import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import ValidSellRequestAcceptLegalConditions from "./ValidSellRequestAcceptLegalConditions";

const ValidSellRequestAuthenticatedStep = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  return (
    <>
      {(authenticationInfos.isAuthenticated && (
        <ValidSellRequestAcceptLegalConditions
          handleSubmit={props.handleSubmit}
        />
      )) || (
        <div className="userShouldConnect">
          Pour soumettre complètement votre rachat, vous devez vous inscrire ou
          vous connecter.
          <p>(Votre panier ne sera pas perdu)</p>
        </div>
      )}
    </>
  );
};

export default ValidSellRequestAuthenticatedStep;
