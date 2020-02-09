import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellingBasketAPI from "../services/sellingBasketAPI";
import GenericCardInfosContext from "../context/genericCardInfosContext";

const CardLineSellingBasket = ({ card, index }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  useEffect(() => {
    if (isOnHover) {
      //If we neeed to change something on hover update, here it is
      console.log(currentCard);
      console.log(currentBasket);
    }
  }, [isOnHover]);

  const handleChange = ({ currentTarget }, currentCard, currentBasket) => {
    const { name, value } = currentTarget;
    if (name == "quantity") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }

    setCard({ ...currentCard, [name]: newValue });
  };

  const handleDelete = cardUuid => {
    const newCurrentBasket = currentBasket.filter(
      card => cardUuid !== card.uuid
    );
    setCurrentBasket(newCurrentBasket);
    SellingBasketAPI.save(newCurrentBasket);
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
        key={card.id}
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
            <div className="cardPictureOnHoverTop">
              <img src={urlCard} alt={card.name} />
            </div>
          )}
        </td>
        <td>{card.set}</td>
        <td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.cardName + "id1"}
            onChange={event => {
              handleChange(event, currentCard, currentBasket);
            }}
          >
            {card.foreignData.length > 0 ? (
              [
                <option value={card.lang} key={card.id + "2"}>
                  {card.lang == "9"
                    ? "EN"
                    : card.foreignData.filter(
                        currentlanguage =>
                          currentlanguage.language_id.id === parseInt(card.lang)
                      )[0].language_id.shortname}
                </option>
              ].concat(
                card.foreignData
                  .filter(
                    currentlanguage =>
                      currentlanguage.language_id.id !== parseInt(card.lang)
                  )
                  .map((foreignData, index) => (
                    <option
                      value={foreignData.language_id.id}
                      key={index + "3"}
                    >
                      {foreignData.language_id.shortname}
                    </option>
                  ))
              )
            ) : (
              <option value="9">EN</option>
            )}
          </select>
        </td>
        <td>
          <select
            name="condition"
            id={card.cardName + "id2"}
            onChange={event => {
              handleChange(event, currentCard, currentBasket);
            }}
          >
            <option value={card.condition}>{card.condition}</option>
            <option value="EXC">EXC</option>
            <option value="PL">PL</option>
          </select>
        </td>
        <td>
          <select
            name="isFoil"
            id={card.cardName + "id4"}
            onChange={event => {
              handleChange(event, currentCard, currentBasket);
            }}
          >
            <option value={card.isFoil == "Yes" ? "Yes" : "No"}>
              {card.isFoil == "Yes" ? "Yes" : "No"}
            </option>
            {card.hasfoil == 1 && card.hasnonfoil == 1 && (
              <option value={card.isFoil == "Yes" ? "No" : "Yes"}>
                {card.isFoil == "Yes" ? "No" : "Yes"}
              </option>
            )}
          </select>
        </td>

        <td>
          <select
            name="quantity"
            id={card.cardName + "id3"}
            onChange={event => {
              handleChange(event, currentCard, currentBasket);
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
        <td>{card.price}</td>
        <td>
          <i
            className="fas fa-minus-circle delete-from-selling-basket"
            onClick={() => handleDelete(card.uuid)}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default CardLineSellingBasket;
