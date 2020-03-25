import React, { useState, useContext, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";

const CardWithThumbnail = ({ handleAddSellingBasket, card }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  const picture = cardsAPI.getSmallPictureFromScryfallId(card);

  return (
    <>
      <div
        className="card"
        onClick={() => (window.location.href = "/card/" + card.name)}
      >
        <div className="card-picture">
          <img src={picture} alt="" />
        </div>
        <div className="card-infos">
          <div className="card-title">{card.name}</div>
          <div className="card-set">
            {card.edition ? card.edition.name : null}
          </div>
          <Link to={"/card/" + card.name}>Voir la carte</Link>
        </div>
      </div>
    </>
  );
};

export default CardWithThumbnail;
