import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import genericCardAPI from "../services/genericCardAPI";
import cardsAPI from "../services/cardsAPI";
import CardShopPriceAPI from "../services/CardShopPriceAPI";
import cardsOneSetContext from "../context/cardsOneSetContext";

const CardLineOneSet = ({
  card,
  cardID,
  handleAddSellingBasket,
  index,
  setName,
  displaySets
}) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current Cards displayed in One Set Page
  const { cardsContext, setCardsContext } = useContext(cardsOneSetContext);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //Using the current Card in state, with default data : English, Near Mint, Non foil...
  const [currentCard, setCurrentCard] = useState({
    ...card,
    quantity: 1,
    condition: 2,
    lang: 9,
    isFoil: card.hasnonfoil ? "No" : "Yes",
    set: setName
  });

  useEffect(() => {
    setCurrentCard({
      ...card,
      quantity: 1,
      condition: 2,
      lang: 9,
      isFoil: card.hasnonfoil ? "No" : "Yes",
      set: setName
    });
  }, [card]);

  console.log(cardsContext[cardID]);

  const handleChange = ({ currentTarget }, currentCard) => {
    //Updating the card following the new info
    const { name, value } = currentTarget;
    if (name === "quantity") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }
    //TODO
    //API call to get the relevant price

    setCurrentCard({ ...currentCard, [name]: newValue });
  };

  //Getting the Picture URL
  const urlPictureCard = cardsAPI.getSmallPictureFromScryfallId(card);

  const hoverClassName = e => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  //TEMPORARY DEFAULT DEFINITION TODO : GET IT THROUGH API OR LOCAL ENV
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
          {cardsContext[cardID].name}
          {isOnHover && (
            <div className={hoverTopOrBottom}>
              <img src={urlPictureCard} alt={card.name} />
            </div>
          )}
        </td>
        {displaySets && <td>{cardsContext[cardID].set}</td>}
        <td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={cardsContext[cardID].name + "id1"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            {cardsContext[cardID].foreignData.length > 0 ? (
              [
                <option value="9" key="a">
                  EN
                </option>
              ].concat(
                cardsContext[cardID].foreignData.map((foreignData, index) => (
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
            id={cardsContext[cardID].name + "id2"}
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
            {cardsContext[cardID].hasnonfoil && <option value="No">No</option>}
            {cardsContext[cardID].hasfoil && <option value="Yes">Yes</option>}
          </select>
        </td>
        <td>
          <select
            name="quantity"
            id={cardsContext[cardID].name + "id3"}
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
        {/* PRICE */}

        <td>{cardsContext[cardID].price}</td>

        <td className="AddButton">
          <i
            className="fas fa-plus-circle add-item-basket"
            onClick={() => {
              console.log(currentCard);
              return handleAddSellingBasket(
                currentBasket,
                cardsContext[cardID]
              );
            }}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default CardLineOneSet;
