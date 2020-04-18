import React, { useContext } from "react";
import ValidSellRequestDuplicatesStep from "./ValidSellRequestDuplicatesStep";
import SellingBasketContext from "../../context/sellingBasket";
import { FormattedMessage } from "react-intl";

const ValidSellRequestIsBasketEmpty = ({
  handleSubmit,
  checkForDuplicates,
}) => {
  //Current Basket
  const { currentBasket } = useContext(SellingBasketContext);

  return (
    <>
      {(currentBasket.length > 0 && (
        <div className="isCurrentBasketReady">
          <ValidSellRequestDuplicatesStep
            handleSubmit={handleSubmit}
            checkForDuplicates={checkForDuplicates}
          />
        </div>
      )) || (
        <div className="isCurrentBasketEmpty">
          <FormattedMessage
            id="app.sellRequestValidation.warningBasketIsEmpty"
            defaultMessage={`Your basket is empty.`}
          />
        </div>
      )}
    </>
  );
};

export default ValidSellRequestIsBasketEmpty;
