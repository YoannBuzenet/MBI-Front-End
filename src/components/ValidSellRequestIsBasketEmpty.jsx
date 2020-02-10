import React, { useContext } from "react";
import ValidSellRequestDuplicatesStep from "./ValidSellRequestDuplicatesStep";
import SellingBasketContext from "../context/sellingBasket";

const ValidSellRequestIsBasketEmpty = props => {
  //Current Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  return (
    <>
      {(currentBasket.length > 0 && (
        <div className="isCurrentBasketReady">
          <ValidSellRequestDuplicatesStep handleSubmit={props.handleSubmit} />
        </div>
      )) || (
        <div className="isCurrentBasketEmpty">
          Votre panier est vide. Pour le valider, merci d'ajouter des cartes à
          votre rachat.
        </div>
      )}
    </>
  );
};

export default ValidSellRequestIsBasketEmpty;
