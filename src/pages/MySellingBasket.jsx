import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellRequestValidation from "../components/SellRequestValidation";
import SellingBasketAPI from "../services/sellingBasketAPI";
import CardLineSellingBasket from "../components/CardLineSellingBasket";

const MyCurrentSellRequest = ({ history }) => {
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Array to know the total of buying prices. As it's not stored everywhere we create memory here.
  const total_prices = [];

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
                <th>Etat</th>
                <th>Langue</th>
                <th>Foil</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentBasket.map((card, index) => (
                <CardLineSellingBasket card={card} key={index} />
              ))}

              <tr className="total-line">
                <td></td>
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
                  {total_prices.reduce((total, number) => {
                    return total + number;
                  }, 0)}
                </td>
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
