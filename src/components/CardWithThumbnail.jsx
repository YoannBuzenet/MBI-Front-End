import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";

const CardWithThumbnail = ({ picture, handleAddSellingBasket, card }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  const handleChange = (event, card) => {
    card.quantity = parseInt(event.target.value);
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
              name=""
              id=""
              onChange={event => {
                handleChange(event, card);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <i
              className="fas fa-plus-circle add-item-basket"
              onClick={() => handleAddSellingBasket(currentBasket, card)}
            ></i>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardWithThumbnail;
