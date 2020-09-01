import React, { useContext, useEffect, useState } from "react";
import ValidSellRequestAuthenticatedStep from "./ValidSellRequestAuthenticatedStep";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import SellingBasketContext from "../../context/sellingBasket";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const ValidSellRequestDuplicatesStep = ({
  handleSubmit,
  checkForDuplicates,
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
    console.log("check if there are duplicates in basket", check);
    setFinalCheck(check[0]);
    // console.log(check);
    // console.log("check1", check[1]);
    // console.log("check2", check[2]);
    if (check[1] !== undefined && check[2] !== undefined) {
      setErrorList([check[1], check[2]]);
      toast.error("Merci de retirer les doublons.");
    }
  }, [currentBasket]);

  return (
    <>
      {(!finalCheck && errorList.length === 0 && (
        <ValidSellRequestAuthenticatedStep handleSubmit={handleSubmit} />
      )) || (
        <div>
          <FormattedMessage
            id="app.sellRequestValidation.removeDuplicatesFrombasket"
            defaultMessage={`To submit your sell request, you must connect first.`}
          />
        </div>
      )}
    </>
  );
};

export default ValidSellRequestDuplicatesStep;
