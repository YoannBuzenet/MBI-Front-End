import React, { useContext } from "react";
import ValidSellRequestAuthenticatedStep from "./ValidSellRequestAuthenticatedStep";
import canSubmitContext from "../context/canSubmitSellRequestContext";

const ValidSellRequestDuplicatesStep = props => {
  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  return (
    <>
      {(errorList.length == 0 && (
        <ValidSellRequestAuthenticatedStep handleSubmit={props.handleSubmit} />
      )) || (
        <div>
          Merci de retirer les doublons de votre rachat avant de le soumettre.
        </div>
      )}
    </>
  );
};

export default ValidSellRequestDuplicatesStep;
