import React, { useState, useContext, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";

const CardWithThumbnail = ({ picture, handleAddSellingBasket, card }) => {
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
      <div className="card">
        <div className="card-picture">
          <img src={picture} alt="" />
        </div>
        <div className="card-infos">
          <div className="card-title">{card.cardName}</div>
          <div className="card-language">{card.lang}</div>
          <div className="card-condition">{card.condition}</div>
          <div className="card-price">{card.price}€</div>
          <form action="">
            QTE
            <select
              name="quantity"
              id=""
              onChange={event => {
                handleChange(event, currentCard);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <i
              className="fas fa-plus-circle add-item-basket"
              onClick={() => handleAddSellingBasket(currentBasket, currentCard)}
            ></i>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardWithThumbnail;
