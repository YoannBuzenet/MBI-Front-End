import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import ValidSellRequestAcceptLegalConditions from "./ValidSellRequestAcceptLegalConditions";
import { FormattedMessage } from "react-intl";

const ValidSellRequestAuthenticatedStep = (props) => {
  //Current Authentication
  const { authenticationInfos } = useContext(AuthContext);

  return (
    <>
      {(authenticationInfos.isAuthenticated && (
        <ValidSellRequestAcceptLegalConditions
          handleSubmit={props.handleSubmit}
        />
      )) || (
        <div className="userShouldConnect">
          <FormattedMessage
            id="app.sellRequestValidation.mustConnectMessage"
            defaultMessage={`To submit your sell request, you must connect first.`}
          />
          <p>
            (
            <FormattedMessage
              id="app.sellRequestValidation.reminderMessageBasketWontBeLost"
              defaultMessage={`To submit your sell request, you must connect first.`}
            />
            )
          </p>
        </div>
      )}
    </>
  );
};

export default ValidSellRequestAuthenticatedStep;
