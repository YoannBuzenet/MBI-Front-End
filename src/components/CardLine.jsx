import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import genericCardAPI from "../services/genericCardAPI";

const CardLine = ({ card, handleAddSellingBasket, index, setName }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  //Using the current Card in state
  const [currentCard, setCard] = useState({
    ...card,
    quantity: 1,
    condition: "2",
    lang: "9",
    isFoil: card.hasnonfoil ? "No" : "Yes",
    set: setName,
    price: 1
  });

  useEffect(() => {
    setCard({
      ...card,
      quantity: 1,
      condition: "2",
      lang: "9",
      isFoil: card.hasnonfoil ? "No" : "Yes",
      set: setName,
      price: 1
    });
  }, [card]);

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  useEffect(() => {
    if (isOnHover) {
      // console.log(conditions);
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

  const hoverClassName = e => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  //TEMPORARY DEFAULT DEFINITION TODO : GET IT THOURGH API
  //ALSO DEFINED IN CARDSELLINGBASKET
  const gradingArea = "EU";

  return (
    <>
      <tr
        key={index}
        onMouseEnter={e => {
          setIsOnHover(!isOnHover);
          setHoverTopOrBottom(hoverClassName(e));
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
            <div className={hoverTopOrBottom}>
              <img src={urlCard} alt={card.name} />
            </div>
          )}
        </td>
        <td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.name + "id1"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            {card.foreignData.length > 0 ? (
              [
                <option value="9" key="a">
                  EN
                </option>
              ].concat(
                card.foreignData.map((foreignData, index) => (
                  <option value={foreignData.language_id.id} key={index}>
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
            id={card.name + "id2"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
            defaultValue="2"
          >
            {conditions.length > 0
              ? gradingArea === "EU"
                ? conditions.map((condition, index) =>
                    condition.isEU ? (
                      <option key={index} value={condition.id}>
                        {condition.shortname}
                      </option>
                    ) : null
                  )
                : conditions.map((condition, index) =>
                    condition.isUS ? (
                      <option value={condition.id} key={index}>
                        {condition.shortnameUS}
                      </option>
                    ) : null
                  )
              : null}
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
            {card.hasnonfoil && <option value="No">No</option>}
            {card.hasfoil && <option value="Yes">Yes</option>}
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
        <td>{card.price || 2} </td>
        <td>
          <i
            className="fas fa-plus-circle add-item-basket"
            onClick={() => {
              console.log(currentCard);
              return handleAddSellingBasket(currentBasket, currentCard);
            }}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default CardLine;
