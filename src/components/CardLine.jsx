import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";

const CardLine = ({ card, handleAddSellingBasket, index }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  useEffect(() => {
    if (isOnHover) {
      //If we neeed to change something on hover update, here it is
    }
  }, [isOnHover]);

  const handleChange = ({ currentTarget }, currentCard) => {
    const { name, value } = currentTarget;
    if (name == "quantity") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }

    setCard({ ...currentCard, [name]: newValue });
  };

  //Creating the specific link to get the scryffalID picture. It is composed of a static base, + the 2 first character of the ID, + the ID
  const firstCharac = card.scryfallid.substr(0, 1);
  const secondCharac = card.scryfallid.substr(1, 1);
  const urlCard =
    "https://img.scryfall.com/cards/small/front/" +
    firstCharac +
    "/" +
    secondCharac +
    "/" +
    card.scryfallid +
    ".jpg";

  return (
    <>
      <tr
        key={index}
        onMouseEnter={() => {
          setIsOnHover(!isOnHover);
        }}
        onMouseLeave={() => {
          setIsOnHover(!isOnHover);
        }}
      >
        <td className="cardPictureHolder">
          {card.name}
          {isOnHover && (
            //TODO : change className following the scrolling, to know if the position must be top or bottom, to stay in window
            //Other class CSS ready just aside this one, JS logic to make
            <div className="cardPictureOnHoverTop">
              <img src={urlCard} alt={card.name} />
            </div>
          )}
        </td>
        <td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.Name + "id1"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
            <option value="ES">ES</option>
          </select>
        </td>
        <td>
          <select
            name="condition"
            id={card.name + "id2"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            <option value="NM">NM</option>
            <option value="EXC">EXC</option>
            <option value="PL">PL</option>
          </select>
        </td>

        <td>
          <select
            name="isFoil"
            id={card.name + "id4"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            {card.hasfoil && <option value="Yes">Yes</option>}
            {card.hasnonfoil && <option value="No">No</option>}
          </select>
        </td>
        <td>
          <select
            name="quantity"
            id={card.name + "id3"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
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
        <td>2</td>
        <td>
          <i
            className="fas fa-plus-circle add-item-basket"
            onClick={() => {
              return handleAddSellingBasket(currentBasket, currentCard);
            }}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default CardLine;
