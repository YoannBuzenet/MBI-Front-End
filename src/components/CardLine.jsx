import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";

const CardLine = ({ card, handleAddSellingBasket }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  useEffect(() => {
    console.log(currentCard);
  });

  const handleChange = ({ currentTarget }, card) => {
    // card.quantity = parseInt(event.target.value);
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
        <select
          name="lang"
          id=""
          onChange={event => {
            handleChange(event, card);
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
          id=""
          onChange={event => {
            handleChange(event, card);
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
          id=""
          onChange={event => {
            handleChange(event, card);
          }}
        >
          <option value={card.quantity}>{card.quantity}</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </td>
      <td>
        <select
          name="isFoil"
          id=""
          onChange={event => {
            handleChange(event, card);
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
