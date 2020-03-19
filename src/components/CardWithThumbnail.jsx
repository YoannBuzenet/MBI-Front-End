import React, { useState, useContext, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import cardsAPI from "../services/cardsAPI";

const CardWithThumbnail = ({ handleAddSellingBasket, card }) => {
  console.log(card);
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  const picture = cardsAPI.getSmallPictureFromScryfallId(card);

  const handleChange = ({ currentTarget }, currentCard) => {
    const { name, value } = currentTarget;
    if (name === "quantity") {
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
          <div className="card-title">{card.name}</div>
          <div className="card-language">{card.lang}</div>
          <div className="card-condition">{card.condition}</div>
          <div className="card-price">{card.price}€</div>
          <div className="card-set">
            {card.edition ? card.edition.name : null}
          </div>
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
            <p>
              Add <span> </span>
              <i
                className="fas fa-plus-circle add-item-basket"
                onClick={() =>
                  handleAddSellingBasket(currentBasket, currentCard)
                }
              ></i>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardWithThumbnail;
