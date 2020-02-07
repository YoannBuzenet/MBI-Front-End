import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";

const CardLine = ({ card, handleAddSellingBasket }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  const handleChange = ({ currentTarget }, currentCard) => {
    const { name, value } = currentTarget;
    if (name == "quantity") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }

    setCard({ ...currentCard, [name]: newValue });
  };

  return (
    <>
      <td>{card.cardName}</td>
      <td>
        {/* Select will have to be refactored with a .map on a Select Component */}
        <select
          name="lang"
          id={card.cardName + "id1"}
          onChange={event => {
            handleChange(event, currentCard);
          }}
        >
          <option value={card.lang}>{card.lang}</option>
          <option value="FR">FR</option>
          <option value="ES">ES</option>
        </select>
      </td>
      <td>
        <select
          name="condition"
          id={card.cardName + "id2"}
          onChange={event => {
            handleChange(event, currentCard);
          }}
        >
          <option value={card.condition}>{card.condition}</option>
          <option value="EXC">EXC</option>
          <option value="PL">PL</option>
        </select>
      </td>
      <td>
        <select
          name="quantity"
          id={card.cardName + "id3"}
          onChange={event => {
            handleChange(event, currentCard);
          }}
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
      <td>
        <select
          name="isFoil"
          id={card.cardName + "id4"}
          onChange={event => {
            handleChange(event, currentCard);
          }}
        >
          <option value={card.isFoil}>{card.isFoil}</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td>{card.price}</td>
      <td>
        <i
          className="fas fa-plus-circle add-item-basket"
          onClick={() => handleAddSellingBasket(currentBasket, currentCard)}
        ></i>
      </td>
    </>
  );
};

export default CardLine;
