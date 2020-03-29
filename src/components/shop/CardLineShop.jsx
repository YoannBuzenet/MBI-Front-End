import React, { useContext, useState, useEffect } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import genericCardAPI from "../../services/genericCardAPI";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import sellRequestCardAPI from "../../services/sellRequestCardAPI";
import cardsAPI from "../../services/cardsAPI";
import EditionChoosingModal from "../EditionChoosingModal";
import sellRequestAPI from "../../services/sellRequestAPI";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import FeatherIcon from "feather-icons-react";

const CardLineShop = ({ card, indexCard }) => {
  //Getting the Sell Request state by context
  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList } = useContext(canSubmitContext);

  //DEFINED langages and Conditions
  const { conditions } = useContext(GenericCardInfosContext);

  //STATE - creating card state from parent input
  const [currentCard, setCurrentCard] = useState(card);
  // console.log(currentCard);

  //STATE Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //STATE Defining loading state, to know if component is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  //STATE - defining if the edition choosing modal is ON or OFF
  const [isModal, setIsModal] = useState(false);

  //STATE - stocking the different editions that are provided in the modal
  const [editionInformations, setEditionInformation] = useState();

  //STATE - knowing if a card has just been deleted
  const [cardHasBeenDeleted, setCardHasBeenDeleted] = useState(false);

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

      setCurrentAdminSellRequest({
        ...newSellRequest,
        amount: newSellRequest.sellRequests.reduce((total, card) => {
          return total + card.quantity * card.price;
        }, 0),
        cardTotalQuantity: newSellRequest.sellRequests.reduce((total, card) => {
          return total + card.quantity;
        }, 0)
      });
      // console.log(currentAdminSellRequest);
    }
  }, [currentCard]);

  //Triggers if a card is deleted
  useEffect(() => {
    if (cardHasBeenDeleted) {
      // console.log("card has been deleted : ", cardHasBeenDeleted);
      var newSellRequest = currentAdminSellRequest;

      newSellRequest.sellRequests = currentAdminSellRequest.sellRequests.filter(
        (card, index) => index !== indexCard
      );

      setCurrentAdminSellRequest({
        ...newSellRequest,
        amount: newSellRequest.sellRequests.reduce((total, card) => {
          return total + card.quantity * card.price;
        }, 0),
        cardTotalQuantity: newSellRequest.sellRequests.reduce((total, card) => {
          return total + card.quantity;
        }, 0)
      });

      const newData = {
        cardTotalQuantity: newSellRequest.sellRequests.reduce((total, card) => {
          return total + card.quantity;
        }, 0),
        amount: newSellRequest.sellRequests.reduce((total, card) => {
          return total + card.price * card.quantity;
        }, 0)
      };

      //UPDATING THE WHOLE SELL REQUEST ON API
      // (ADD TOAST IF FAILURE)
      sellRequestAPI
        .updateAsShop(newSellRequest.id, newData)
        .then(data => console.log("update OK"));
    }
  }, [cardHasBeenDeleted]);

  const handleChange = ({ currentTarget }, currentCard) => {
    const { name, value } = currentTarget;
    console.log(name);
    console.log(value);
    if (name === "quantity" || name === "lang") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }
    //console.log("Check SetIsLoad Passage");
    setIsLoaded(true);
    //Blocked setErrorList because cause parent to re-render. Would be good to think about passing it as a state instead of context OR make the provider as near as possible of the content
    // setErrorList([]);
    setCurrentCard({
      ...currentCard,
      [name]: newValue
    });

    sellRequestCardAPI
      .update(currentCard, name, newValue)
      .catch(error => console.log(error));
    // console.log(currentCard);

    if (name === "quantity") {
      const newData = {
        cardTotalQuantity: currentAdminSellRequest.sellRequests.reduce(
          (total, card) => {
            return total + card.quantity;
          },
          0
        ),
        amount: currentAdminSellRequest.sellRequests.reduce((total, card) => {
          return total + card.price * card.quantity;
        }, 0)
      };
      console.log(newData);

      //UPDATING THE WHOLE SELL REQUEST ON API
      // (ADD TOAST IF FAILURE)
      sellRequestAPI
        .updateAsShop(currentAdminSellRequest.id, newData)
        .then(data => console.log("update OK"));
    }
  };

  const changeEdition = (event, currentCard) => {
    setIsModal(true);
    cardsAPI
      .getByName(currentCard.name)
      .then(data => setEditionInformation(data.data["hydra:member"]));
  };

  const updateDBAndContextWithNewEdition = (event, index) => {
    //Closing the Modal Window
    setIsModal(false);

    //Getting the new card from the state given by the ChangeEdition Method, thanks to the value chosen in the modal window
    const newCard = editionInformations[parseInt(event.target.value)];
    const IRItoUpdate = newCard.id;

    //Checking IF the current language exist in the set we're about to update. If not, we put English by default ( id 9)
    var langNextCard;
    const result = newCard.foreignData.filter(
      lang => lang.language_id.id == currentCard.lang
    );

    if (result.length > 0) {
      langNextCard = currentCard.lang;
    } else {
      langNextCard = 9;
    }

    //TOAST IF LANG IS CHANGED

    //API Request to update the card in DB
    sellRequestCardAPI.setUpdate(IRItoUpdate, langNextCard, currentCard.id);

    //Updating the context. Updating this state triggers a context update on useEffect
    setCurrentCard({
      ...currentCard,
      set: newCard.edition.name,
      lang: langNextCard,
      foreignData: newCard.foreignData
    });
  };

  const handleDelete = card => {
    //Telling the API to delete the sell request card
    sellRequestCardAPI
      .delete(card.id)
      .then(data => setCardHasBeenDeleted(true));
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
      <Tr
        onMouseEnter={e => {
          setIsOnHover(!isOnHover);
          setHoverTopOrBottom(hoverClassName(e));
        }}
        onMouseLeave={() => {
          setIsOnHover(!isOnHover);
        }}
        className={sellingBasketLine || ""}
      >
        <Td className="cardPictureHolder">
          {currentCard.name}
          {isOnHover && (
            //TODO : change className following the scrolling, to know if the position must be top or bottom, to stay in window
            <div className={hoverTopOrBottom}>
              <img src={urlCard} alt={currentCard.name} />
            </div>
          )}
        </Td>
        <Td>
          {currentCard.set}
          {isModal && (
            <EditionChoosingModal
              editionInformations={editionInformations}
              currentCard={currentCard}
              updateDBAndContextWithNewEdition={
                updateDBAndContextWithNewEdition
              }
              setIsModal={setIsModal}
            />
          )}
        </Td>
        <Td onClick={event => changeEdition(event, currentCard)}>
          <FeatherIcon
            icon="refresh-ccw"
            size="20"
            className="downsize-icon pointer"
          />
        </Td>
        <Td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          {/* Select LANG */}
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
                //Find the selected value
                <option value={currentCard.lang} key={currentCard.id + "2"}>
                  {currentCard.lang == "9"
                    ? "EN"
                    : currentCard.foreignData.filter(
                        currentlanguage =>
                          currentlanguage.language_id.id === currentCard.lang
                      )[0].language_id.shortname}
                </option>
                //Add the non selected languages among what's possible in this card
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
                  .concat([
                    <option value="9" key={card.id + "3" + card.lang}>
                      EN
                    </option>
                  ])
              )
            ) : (
              <option value="9">EN</option>
            )}
          </select>
        </Td>
        <Td>
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
        </Td>
        <Td>
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
        </Td>
        <Td>
          <select
            name="isSigned"
            value={card.isSigned}
            onChange={event => {
              handleChange(event, currentCard);
            }}
          >
            <option value={card.isSigned === "Yes" ? "Yes" : "No"}>
              {card.isSigned === "Yes" ? "Yes" : "No"}
            </option>
            <option value={card.isSigned === "Yes" ? "No" : "Yes"}>
              {card.isSigned === "Yes" ? "No" : "Yes"}
            </option>
          </select>
        </Td>
        <Td>
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
        </Td>
        <Td>
          <input
            type="text"
            onChange={event => {
              handleChange(event, currentCard);
            }}
            name="price"
            value={currentCard.price}
          />
        </Td>
        <Td>{currentCard.quantity * currentCard.price}</Td>
        <Td>
          <i
            className="fas fa-minus-circle delete-from-selling-basket"
            onClick={() => {
              console.log(currentCard);
              return handleDelete(currentCard);
            }}
          ></i>
        </Td>
      </Tr>
    </>
  );
};

export default CardLineShop;
