import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellingBasketAPI from "../services/sellingBasketAPI";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import sellingBasketAPI from "../services/sellingBasketAPI";
import canSubmitContext from "../context/canSubmitSellRequestContext";
import genericCardAPI from "../services/genericCardAPI";

//In this component, following the edit of already added card was really difficult. I couldn't manage to update the basket if the card already existed.
//Thus, The only thing I could do was to see if the card was already in there : I added a warning and a standard synchro alert system
//It would be pretty to manage to see in real time which cards are similar and show them continuously. For this, a perfect handling of the current basket would be necessary.
//Feel free to remove the error system, and the error context, that I implemented to complete this incomplete system.
//Currently, if we wee that the card edited is already in the Basket, we changed a context variable to prevent from submitting the request.
//Problem is that each line in the basket is checking its errors. When the basket renders, all line wants to set CanSubmit. We need a more granular way to follow the error.

const CardLineSellingBasket = ({
  card,
  indexCard,
  updateSellingBasketCheckDuplicate
}) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //Using the current Card in state
  const [currentCard, setCard] = useState(card);

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //Defining loading state, to know if component is loaded
  const [isLoaded, setIsloaded] = useState(false);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  useEffect(() => {
    if (isOnHover) {
      //If we neeed to change something on hover update, here it is
      console.log(currentCard);
      // console.log(errorList);
      // console.log(currentBasket);
      console.log(conditions);
    }
  }, [isOnHover]);

  useEffect(() => {
    if (isLoaded) {
      //checkIfIfCardAlreadyHere(currentBasket, currentCard);
      //We remove the card then we add it again at the same Index
      const newBasket = currentBasket.filter(
        (card, index) => index !== indexCard
      );
      newBasket.splice(indexCard, 0, currentCard);

      setCurrentBasket(newBasket);

      sellingBasketAPI.save(newBasket);
    }
  }, [currentCard]);

  const handleChange = ({ currentTarget }, currentCard, currentBasket) => {
    const { name, value } = currentTarget;
    if (name == "quantity") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }

    setIsloaded(true);
    setErrorList([]);
    setCard({ ...currentCard, [name]: newValue });
    console.log(currentCard);
  };

  const handleDelete = card => {
    //We remove the card thanks to its index in the currentBasket
    const newBasket = currentBasket.filter(
      (card, index) => index !== indexCard
    );
    setCurrentBasket(newBasket);
    SellingBasketAPI.save(newBasket);
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

  //Defining the class, if it's error or not
  const sellingBasketLine = errorList.includes(indexCard) ? "error-line" : "";

  //TEMPORARY DEFAULT DEFINITION TODO : GET IT THOURGH API
  //ALSO DEFINED IN CARDLINE
  const gradingArea = "EU";

  const hoverClassName = e => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  return (
    <>
      <tr
        key={card.id}
        onMouseEnter={e => {
          setIsOnHover(!isOnHover);
          setHoverTopOrBottom(hoverClassName(e));
        }}
        onMouseLeave={() => {
          setIsOnHover(!isOnHover);
        }}
        className={sellingBasketLine || ""}
      >
        <td className="cardPictureHolder">
          {card.name}
          {isOnHover && (
            //TODO : change className following the scrolling, to know if the position must be top or bottom, to stay in window
            <div className={hoverTopOrBottom}>
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
            value={card.lang}
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
              ]
                .concat(
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
                .concat([
                  <option value="9" key={card.id + "3" + card.lang}>
                    EN
                  </option>
                ])
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
            value={card.condition}
          >
            {conditions.length > 0
              ? gradingArea === "EU"
                ? conditions
                    .filter(condition => condition.id !== card.condition)
                    .map((condition, index) =>
                      condition.isEU ? (
                        <option key={index} value={condition.id}>
                          {condition.shortname}
                        </option>
                      ) : null
                    )
                : conditions
                    .filter(condition => condition.id !== card.condition)
                    .map((condition, index) =>
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
            id={card.cardName + "id4"}
            value={currentCard.isFoil}
            onChange={event => {
              handleChange(event, currentCard, currentBasket);
            }}
          >
            <option value={currentCard.isFoil == "Yes" ? "Yes" : "No"}>
              {currentCard.isFoil == "Yes" ? "Yes" : "No"}
            </option>
            {card.hasfoil == 1 && card.hasnonfoil == 1 && (
              <option value={currentCard.isFoil == "Yes" ? "No" : "Yes"}>
                {currentCard.isFoil == "Yes" ? "No" : "Yes"}
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
            value={currentCard.quantity}
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
        <td>{card.price}</td>
        <td>
          <i
            className="fas fa-minus-circle delete-from-selling-basket"
            onClick={() => {
              console.log(currentCard);
              return handleDelete(currentCard);
            }}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default CardLineSellingBasket;
