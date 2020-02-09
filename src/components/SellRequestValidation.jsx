import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import AuthContext from "../context/authContext";

const SellRequestValidation = ({ history }) => {
  //Current Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  // console.log(authenticationInfos);

  const handleSubmit = event => {
    event.preventDefault();

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
          price: 2
        }
      ].concat(
        currentBasket.map(card => {
          return {
            language: "test",
            CardCondition: "test",
            cards: "test",
            cardQuantity: 1,
            price: 1
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
      {/* Div is changing if the user has an empty basket or not */}
      {(currentBasket.length > 0 && (
        <div className="isCurrentBasketReady">
          {authenticationInfos.isAuthenticated ? (
            <div className="isUserAuthenticated">
              <form action="" onSubmit={handleSubmit}>
                <input type="checkbox" required id="checkbox-compliance" />
                <label htmlFor="checkbox-compliance">
                  J'accepte les conditions générales de ventes.
                </label>
                <button className="sellRequest-validation-button" type="submit">
                  Valider mon rachat
                </button>
              </form>
            </div>
          ) : (
            <div className="userShouldConnect">
              Pour soumettre complètement votre rachat, vous devez vous inscrire
              ou vous connecter.
              <p>(Votre panier ne sera pas perdu)</p>
            </div>
          )}
        </div>
      )) || (
        <div className="isCurrentBasketEmpty">
          Votre panier est vide. Pour le valider, merci d'ajouter des cartes à
          votre rachat.
        </div>
      )}
    </div>
  );
};

export default SellRequestValidation;
