import React, { useContext, useEffect } from "react";
import SellingBasketContext from "../../context/sellingBasket";
import AuthContext from "../../context/authContext";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import ValidSellRequestIsBasketEmpty from "./ValidSellRequestIsBasketEmpty";
import sellRequestAPI from "../../services/sellRequestAPI";

const SellRequestValidation = ({ history, checkForDuplicates }) => {
  //Current Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  const handleSubmit = async event => {
    event.preventDefault();

    const sellRequestData = {
      client: "/clients/" + authenticationInfos.customer.id,
      shop: "/shops/" + authenticationInfos.shop.id,
      amount: currentBasket.reduce((total, card) => {
        return total + card.price * card.quantity;
      }, 0),
      cardTotalQuantity: currentBasket.reduce((total, card) => {
        return total + card.quantity;
      }, 0),
      sellRequestCards: currentBasket.map(card => {
        return {
          language: "/languages/" + card.lang,
          CardCondition: "/card_conditions/" + card.condition,
          cards: card["@id"],
          cardQuantity: card.quantity,
          price: card.price,
          isFoil: card.isFoil === "Yes" ? true : false
        };
      })
    };

    try {
      const sendSellRequest = await sellRequestAPI.send(sellRequestData);
      //TODO : NOTIF success
      history.replace("/my_sell_requests");
    } catch (error) {
      console.log(error);
      //TODO : NOTIF ECHEC
    }
  };

  return (
    <div className="sellRequest-validation-block">
      <h2>Valider mon rachat</h2>
      <ValidSellRequestIsBasketEmpty
        handleSubmit={handleSubmit}
        checkForDuplicates={checkForDuplicates}
      />
    </div>
  );
};

export default SellRequestValidation;
