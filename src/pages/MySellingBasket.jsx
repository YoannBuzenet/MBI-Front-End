import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellRequestValidation from "../components/SellRequestValidation";

const MyCurrentSellRequest = ({ history }) => {
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  const handleDelete = cardUuid => {
    const newCurrentBasket = currentBasket.filter(
      card => cardUuid !== card.uuid
    );
    setCurrentBasket(newCurrentBasket);
  };

  //Function to update the amount of exemplar of one card
  const handleChange = (event, currentBasket, card) => {
    const updatedQuantity = parseInt(event.target.value);
    setCurrentBasket(
      currentBasket.map(cardInBasket => {
        return cardInBasket === card
          ? (card = { ...card, quantity: updatedQuantity })
          : cardInBasket;
      })
    );
  };

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
                  <td>
                    <select
                      name=""
                      id=""
                      onChange={event =>
                        handleChange(event, currentBasket, card)
                      }
                    >
                      <option value={card.quantity}>{card.quantity}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </td>
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
