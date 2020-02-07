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

  const handleSubmit = event => {
    event.preventDefault();
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
                <label for="checkbox-compliance">
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
