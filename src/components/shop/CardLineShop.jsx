import React, { useContext, useState, useEffect } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import genericCardAPI from "../../services/genericCardAPI";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import sellRequestCardAPI from "../../services/sellRequestCardAPI";

const CardLineShop = ({ card, indexCard }) => {
  //Getting the Sell Request state by context
  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //STATE - creating card state from parent input
  const [currentCard, setCurrentCard] = useState(card);

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //Defining loading state, to know if component is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  useEffect(() => {
    if (isOnHover) {
      //If we neeed to change something on hover update, here it is
      console.log(currentCard);
      // console.log(errorList);
      // console.log(currentBasket);
      //console.log(conditions);
    }
  }, [isOnHover]);

  useEffect(() => {
    if (isLoaded) {
      //We remove the card then we add it again at the same Index
      // console.log("is loaded", currentCard);
      // console.log("is loaded", currentAdminSellRequest);
      var newSellRequest = currentAdminSellRequest;

      newSellRequest.sellRequests = currentAdminSellRequest.sellRequests.filter(
        (card, index) => index !== indexCard
      );
      newSellRequest.sellRequests.splice(indexCard, 0, currentCard);

      setCurrentAdminSellRequest(newSellRequest);
      // console.log(currentAdminSellRequest);
    }
  }, [currentCard]);

  const handleChange = ({ currentTarget }, currentCard) => {
    const { name, value } = currentTarget;
    console.log(name);
    console.log(value);
    if (name == "quantity" || name == "lang") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }
    //console.log("Check SetIsLoad Passage");
    setIsLoaded(true);
    //Blocked setErrorList because cause parent to re-render. Would be good to think about passing it as a state instead of context
    // setErrorList([]);
    setCurrentCard({
      ...currentCard,
      [name]: newValue
    });

    sellRequestCardAPI
      .update(currentCard, name, newValue)
      .catch(error => console.log(error));
    // console.log(currentCard);
  };

  const handleDelete = card => {
    //We remove the card thanks to its index in the currentSellRequest
    const newSellRequest = currentAdminSellRequest.filter(
      (card, index) => index !== indexCard
    );
    setCurrentAdminSellRequest(newSellRequest);
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
          {currentCard.name}
          {isOnHover && (
            //TODO : change className following the scrolling, to know if the position must be top or bottom, to stay in window
            <div className={hoverTopOrBottom}>
              <img src={urlCard} alt={currentCard.name} />
            </div>
          )}
        </td>
        <td>{currentCard.set}</td>
        <td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={currentCard.name + "id1"}
            value={currentCard.lang}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            {currentCard.foreignData.length > 0 ? (
              [
                <option value={currentCard.lang} key={currentCard.id + "2"}>
                  {currentCard.lang == "9"
                    ? "EN"
                    : currentCard.foreignData.filter(
                        currentlanguage =>
                          currentlanguage.language_id.id === currentCard.lang
                      )[0].language_id.shortname}
                </option>
              ].concat(
                currentCard.foreignData
                  .filter(
                    currentlanguage =>
                      currentlanguage.language_id.id !== currentCard.lang
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
            id={currentCard.name + "id2"}
            onChange={event => {
              handleChange(event, currentCard);
            }}
            value={currentCard.condition}
          >
            {conditions.length > 0
              ? gradingArea === "EU"
                ? conditions
                    .filter(condition => condition.id !== currentCard.condition)
                    .map((condition, index) =>
                      condition.isEU ? (
                        <option key={index} value={condition.id}>
                          {condition.shortname}
                        </option>
                      ) : null
                    )
                : conditions
                    .filter(condition => condition.id !== currentCard.condition)
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
            id={currentCard.name + "id4"}
            value={currentCard.isFoil}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            <option value={currentCard.isFoil == true ? "Yes" : "No"}>
              {currentCard.isFoil == true ? "Yes" : "No"}
            </option>
            {card.hasfoil == 1 && card.hasnonfoil == 1 && (
              <option value={currentCard.isFoil == true ? "No" : "Yes"}>
                {currentCard.isFoil == true ? "No" : "Yes"}
              </option>
            )}
          </select>
        </td>

        <td>
          <select
            name="quantity"
            id={currentCard + "id3"}
            onChange={event => {
              handleChange(event, currentCard);
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
        <td>
          <input
            type="text"
            onChange={event => {
              handleChange(event, currentCard);
            }}
            name="price"
            value={currentCard.price}
          />
        </td>
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
