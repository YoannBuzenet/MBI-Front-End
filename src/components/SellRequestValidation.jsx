import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import AuthContext from "../context/authContext";
import canSubmitContext from "../context/canSubmitSellRequestContext";
import ValidSellRequestIsBasketEmpty from "./ValidSellRequestIsBasketEmpty";

const SellRequestValidation = ({ history }) => {
  //Current Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  const handleSubmit = event => {
    event.preventDefault();

    // for (var i = 0; i < currentBasket.length; i++) {
    //   for (let j = i + 1; j <= currentBasket.length; j++) {
    //     if (
    //       currentBasket[i].name === currentBasket[j].name &&
    //       currentBasket[i].set === currentBasket[j] &&
    //       currentBasket[i].price === currentBasket[j] &&
    //       currentBasket[i].condition === currentBasket[j] &&
    //       currentBasket[i].lang === currentBasket[j] &&
    //       currentBasket[i].isFoil === currentBasket[j] &&
    //       currentBasket[i].uuid === currentBasket[j]
    //     ) {
    //       alert("no");
    //     }
    //   }
    // }

    console.log(errorList);
    if (errorList.length > 0) {
      console.log(
        "Vous ne pouvez pas encore soumettre vos rachats, merci de vérifier vos doublons."
      );
    }

    const sellRequestData = {
      client: "/client/" + authenticationInfos.customer.id,
      shop: "/shop/" + authenticationInfos.shop.id,
      amount: currentBasket.reduce((total, card) => {
        return total + card.price * card.quantity;
      }, 0),
      cardTotalQuantity: currentBasket.reduce((total, card) => {
        return total + card.quantity;
      }, 0),
      sellRequestCards: [
        {
          language: "/languages/3",
          CardCondition: "/card_conditions/1",
          cards: "/cards/500",
          cardQuantity: 2,
          price: 2,
          isFOil: false
        }
      ].concat(
        currentBasket.map(card => {
          return {
            language: "/languages/" + card.lang,
            CardCondition: "test",
            cards: card["@id"],
            cardQuantity: card.quantity,
            price: card.price,
            isFoil: card.isFoil === "Yes" ? true : false
          };
        })
      )
    };

    console.log(sellRequestData);

    //TODO : NOTIF success
    history.replace("/my_sell_requests");
  };

  return (
    <div className="sellRequest-validation-block">
      <h2>Valider mon rachat</h2>
      <ValidSellRequestIsBasketEmpty handleSubmit={handleSubmit} />
    </div>
  );
};

export default SellRequestValidation;
