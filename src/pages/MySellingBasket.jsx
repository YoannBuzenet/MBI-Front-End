import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";

const MyCurrentSellRequest = props => {
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  console.log(currentBasket);

  const handleDelete = cardUuid => {
    const newCurrentBasket = currentBasket.filter(
      card => cardUuid !== card.uuid
    );
    setCurrentBasket(newCurrentBasket);
  };

  //Array to know the total of buying prices. As it's not stored everywhere we create memory here.
  const total_prices = [];

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
              <th>Prix</th>
              <th>Quantité</th>
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
                <td>{card.price}</td>
                <td>{card.quantity}</td>
                <td>{card.price * card.quantity}</td>
                {total_prices.push(card.price * card.quantity)}
                <td>
                  <i
                    className="fas fa-minus-circle delete-from-selling-basket"
                    onClick={() => handleDelete(card.uuid)}
                  ></i>
                </td>
              </tr>
            ))}
            <tr>
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
    </>
  );
};

export default MyCurrentSellRequest;
