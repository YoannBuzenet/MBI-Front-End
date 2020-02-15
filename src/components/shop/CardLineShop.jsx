import React, { useContext, useState, useEffect } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import genericCardAPI from "../../services/genericCardAPI";

const CardLineShop = ({
  card,
  indexCard,
  currentSellRequest,
  setCurrentSellRequest
}) => {
  console.log(card);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //Using the current Card in state
  const [currentCard, setCurrentCard] = useState({
    name: card.cards.name,
    scryfallid: card.cards.scryfallid,
    hasfoil: 1,
    hasnonfoil: 1,
    uuid: card.cards.uuid,
    foreignData: card.cards.foreignData,
    condition: card.CardCondition.id,
    lang: card.language.id,
    set: card.cards.edition.name,
    quantity: card.cardQuantity
  });

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

  //We transform what we got from the API into code that is compatible with the App
  useEffect(() => {
    setCurrentCard({
      name: card.cards.name,
      scryfallid: card.cards.scryfallid,
      hasfoil: 1,
      hasnonfoil: 1,
      uuid: card.cards.uuid,
      foreignData: card.cards.foreignData,
      condition: card.CardCondition.id,
      lang: card.language.id,
      set: card.cards.edition.name,
      quantity: card.cardQuantity
    });
    //      ICI on doit state la current card, transformer card en current card pour que ça match
    //      CE qu'on veut
    // @id: "/cards/5879"
    // @type: "Cards"
    // hasfoil: 1
    // hasnonfoil: 1
    // name: "Alchemist's Refuge"
    // scryfallid: "c767a897-52e3-4401-8104-930157bb2b02"
    // uuid: "eacc9092-28b1-5286-8636-59a63f4296d5"
    // foreignData: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // quantity: 1
    // condition: "2"
    // lang: "9"
    // isFoil: "No"
    // set: "Avacyn Restored"
    // price: 1
    //     Ce qu'on a
    //     @id: "/sell_request_cards/53"
    // @type: "SellRequestCard"
    // id: 53
    // price: 1
    // dateValidated: null
    // language:
    // @id: "/languages/1"
    // @type: "Language"
    // id: 1
    // name: "German"
    // shortname: "DE"
    // __proto__: Object
    // CardCondition:
    // @id: "/card_conditions/2"
    // @type: "CardCondition"
    // id: 2
    // shortname: "NM"
    // shortnameUS: "NM"
    // __proto__: Object
    // cards:
    // @id: "/cards/5168"
    // @type: "Cards"
    // name: "Ceta Disciple"
    // scryfallid: "b1c40c26-3b82-4f72-acb5-85fbdd51665a"
    // uuid: "a85a7827-3597-5138-b625-9f574ed45c96"
    // edition: {@id: "/sets/19", @type: "Sets", id: 19, name: "Apocalypse"}
    // foreignData: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
    // __proto__: Object
    // cardQuantity: 7
    // isFoil: false
  }, [card]);

  useEffect(() => {
    if (isLoaded) {
      //checkIfIfCardAlreadyHere(currentBasket, currentCard);
      //We remove the card then we add it again at the same Index
      const newSellRequest = currentSellRequest.filter(
        (card, index) => index !== indexCard
      );
      newSellRequest.splice(indexCard, 0, currentCard);

      setCurrentSellRequest(newSellRequest);

      //Save the sell request in local storage ?
      //sellingBasketAPI.save(newBasket);
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
    setCurrentCard({ ...currentCard, [name]: newValue });
    console.log(currentCard);
  };

  const handleDelete = card => {
    //We remove the card thanks to its index in the currentSellRequest
    const newSellRequest = currentSellRequest.filter(
      (card, index) => index !== indexCard
    );
    setCurrentSellRequest(newSellRequest);

    //Save current Sell Request in local storage ?
    //SellingBasketAPI.save(newSellRequest);
  };

  //Creating the specific link to get the scryffalID picture. It is composed of a static base, + the 2 first character of the ID, + the ID
  const firstCharac = currentCard.scryfallid.substr(0, 1);
  const secondCharac = currentCard.scryfallid.substr(1, 1);
  const urlCard =
    "https://img.scryfall.com/cards/small/front/" +
    firstCharac +
    "/" +
    secondCharac +
    "/" +
    currentCard.scryfallid +
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
          {card.cards.name}
          {isOnHover && (
            //TODO : change className following the scrolling, to know if the position must be top or bottom, to stay in window
            <div className={hoverTopOrBottom}>
              <img src={urlCard} alt={card.cards.name} />
            </div>
          )}
        </td>
        <td>{card.cards.edition.name}</td>
        <td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.cards.name + "id1"}
            value={card.language.id}
            onChange={event => {
              handleChange(event, currentCard, currentSellRequest);
            }}
          >
            {card.cards.foreignData.length > 0 ? (
              [
                <option value={card.language.id} key={card.id + "2"}>
                  {card.language.id == "9"
                    ? "EN"
                    : card.cards.foreignData.filter(
                        currentlanguage =>
                          currentlanguage.language_id.id ===
                          parseInt(card.language.id)
                      )[0].language_id.shortname}
                </option>
              ].concat(
                card.cards.foreignData
                  .filter(
                    currentlanguage =>
                      currentlanguage.language_id.id !==
                      parseInt(card.language.id)
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
            id={card.cards.name + "id2"}
            onChange={event => {
              handleChange(event, currentCard, currentSellRequest);
            }}
            value={card.CardCondition.id}
          >
            {conditions.length > 0
              ? gradingArea === "EU"
                ? conditions
                    .filter(condition => condition.id !== card.CardCondition.id)
                    .map((condition, index) =>
                      condition.isEU ? (
                        <option key={index} value={condition.id}>
                          {condition.shortname}
                        </option>
                      ) : null
                    )
                : conditions
                    .filter(condition => condition.id !== card.CardCondition.id)
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
            id={card.cards.name + "id4"}
            value={currentCard.isFoil}
            onChange={event => {
              handleChange(event, currentCard, currentSellRequest);
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
              handleChange(event, currentCard, currentSellRequest);
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

export default CardLineShop;
