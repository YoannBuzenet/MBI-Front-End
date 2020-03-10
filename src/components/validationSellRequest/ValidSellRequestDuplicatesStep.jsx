import React, { useContext, useEffect, useState } from "react";
import ValidSellRequestAuthenticatedStep from "./ValidSellRequestAuthenticatedStep";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import SellingBasketContext from "../../context/sellingBasket";

const ValidSellRequestDuplicatesStep = ({
  handleSubmit,
  checkForDuplicates
}) => {
  //Current Basket
  const { currentBasket } = useContext(SellingBasketContext);

  //Following errors in duplicates
  const [finalCheck, setFinalCheck] = useState(false);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  useEffect(() => {
    // console.log(errorList.length);
    const check = checkForDuplicates(currentBasket);
    setFinalCheck(check[0]);
    // console.log(check);
    // console.log("check1", check[1]);
    // console.log("check2", check[2]);
    if (check[1] !== undefined && check[2] !== undefined) {
      //TODO NOTIFICATION
      setErrorList([check[1], check[2]]);
    }
  }, [currentBasket]);

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
