import React, { useContext, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellRequestValidation from "../components/SellRequestValidation";
import SellingBasketAPI from "../services/sellingBasketAPI";
import CardLineSellingBasket from "../components/CardLineSellingBasket";

const MyCurrentSellRequest = ({ history, handleAddSellingBasket }) => {
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  useEffect(() => {}, [currentBasket]);

  return (
    <>
      <div className="all-content sell-request">
        <div className="left-content"></div>
        <div className="main-content">
          <h1>Ma demande de rachat</h1>
          <table className="zebra-table">
            <thead>
              <tr>
                <th>Nom de la carte</th>
                <th>Edition</th>
                <th>Langue</th>
                <th>Etat</th>
                <th>Foil</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentBasket.length > 0
                ? currentBasket.map((card, index) => {
                    return (
                      <CardLineSellingBasket
                        card={card}
                        key={index}
                        indexCard={index}
                        handleAddSellingBasket={handleAddSellingBasket}
                      />
                    );
                  })
                : null}

              <tr className="total-line">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <td>
                  Total cartes :
                  {currentBasket.reduce((total, card) => {
                    return total + card.quantity;
                  }, 0)}
                </td>
                <td>
                  Total :
                  {currentBasket.reduce((total, card) => {
                    return total + card.price * card.quantity;
                  }, 0)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right-content">
          <SellRequestValidation history={history} />
        </div>
      </div>
    </>
  );
};

export default MyCurrentSellRequest;
