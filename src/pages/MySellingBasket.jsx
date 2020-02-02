import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";

const MyCurrentSellRequest = props => {
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  console.log(currentBasket);

  return (
    <>
      <div className="container">
        <h1>Ma demande de rachat</h1>
        <table>
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
              <tr key={index}>
                <td>{card.cardName}</td>
                <td>{card.set}</td>
                <td>{card.condition}</td>
                <td>{card.lang}</td>
                <td>{card.isFoil}</td>
                <td>{card.quantity}</td>
                <td>{card.price}</td>
                <td>{card.price * card.quantity}</td>
                <td>
                  <i className="fas fa-minus-circle"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCurrentSellRequest;
