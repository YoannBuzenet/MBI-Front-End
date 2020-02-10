import React, { useContext, useEffect, useState } from "react";
import ValidSellRequestAuthenticatedStep from "./ValidSellRequestAuthenticatedStep";
import canSubmitContext from "../context/canSubmitSellRequestContext";
import SellingBasketContext from "../context/sellingBasket";

const ValidSellRequestDuplicatesStep = ({
  handleSubmit,
  checkForDuplicates
}) => {
  //Current Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Following errors in duplicates
  const [finalCheck, setFinalCheck] = useState(false);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  useEffect(() => {
    setFinalCheck(checkForDuplicates(currentBasket));
  }, [currentBasket]);

  console.log(finalCheck);

  return (
    <>
      {(!finalCheck && errorList.length == 0 && (
        <ValidSellRequestAuthenticatedStep handleSubmit={handleSubmit} />
      )) || (
        <div>
          Merci de retirer les doublons de votre rachat avant de le soumettre.
        </div>
      )}
    </>
  );
};

export default ValidSellRequestDuplicatesStep;
