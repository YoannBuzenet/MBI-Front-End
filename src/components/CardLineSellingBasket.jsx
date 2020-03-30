import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellingBasketAPI from "../services/sellingBasketAPI";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import sellingBasketAPI from "../services/sellingBasketAPI";
import canSubmitContext from "../context/canSubmitSellRequestContext";
import genericCardAPI from "../services/genericCardAPI";
import CardShopPriceAPI from "../services/CardShopPriceAPI";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import CardDisplayOnPageContext from "../context/cardDisplayOnPageContext";
import BlackDivModalContext from "../context/blackDivModalContext";

//TODO : REQUEST PRICE FOR IS_SIGNED

const CardLineSellingBasket = ({ card, indexCard }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  //Black Div control
  const { isBlackDivModalDisplayed, setIsBlackDivModalDisplayed } = useContext(
    BlackDivModalContext
  );

  //Card display on whole page
  const { cardDisplayInformation, setCardDisplayInformation } = useContext(
    CardDisplayOnPageContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //Defining loading state, to know if component is loaded
  const [isLoading, setIsLoading] = useState(false);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  //TODO - PASS THIS AS ENV VARIABLE
  const shopID = 1;

  useEffect(() => {
    if (isOnHover) {
      //If we neeed to change something on hover update, here it is

      console.log(conditions);
    }
  }, [isOnHover]);

  const handleChange = ({ currentTarget }) => {
    setIsLoading(true);

    const contextCopy = [...currentBasket];

    const { name, value } = currentTarget;

    if (name === "quantity" || name === "lang") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }

    contextCopy[indexCard][name] = newValue;

    //Updating price
    CardShopPriceAPI.getOnePrice(
      shopID,
      currentBasket[indexCard].cardID,
      currentBasket[indexCard].lang,
      currentBasket[indexCard].condition,
      currentBasket[indexCard].isFoil
    )
      .then(data => {
        console.log(data);
        if (data.data["hydra:member"].length > 0) {
          contextCopy[indexCard].price = data.data["hydra:member"][0].price;
        } else {
          contextCopy[indexCard].price = 0;
        }

        setIsLoading(false);
        sellingBasketAPI.save(contextCopy);
        setCurrentBasket(contextCopy);
      })
      .catch(error => {
        toast.error(
          "Le prix n'a pu être chargé. Merci d'actualiser votre page ou d'essayer plus tard."
        );
      });
  };

  const handleDelete = () => {
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

  //Defining the class, if it must indicate error warning or not
  const sellingBasketLine = errorList.includes(indexCard) ? "error-line" : "";

  //TEMPORARY DEFAULT DEFINITION TODO : GET IT THOURGH API
  //ALSO DEFINED IN CARDLINE
  const gradingArea = "EU";

  const hoverClassName = e => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  const displayCardPlainPage = (event, urlCard) => {
    const newDisplayContext = { ...cardDisplayInformation };
    newDisplayContext.cardPictureUrl = urlCard;
    newDisplayContext.isDisplayed = true;
    setCardDisplayInformation(newDisplayContext);
    setIsBlackDivModalDisplayed(true);

    console.log("yay");
  };

  return (
    <>
      <tr
        key={card.id}
        onMouseEnter={e => {
          if (!isMobile) {
            setIsOnHover(!isOnHover);
            setHoverTopOrBottom(hoverClassName(e));
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsOnHover(!isOnHover);
          }
        }}
        className={sellingBasketLine || ""}
      >
        <td
          className="cardPictureHolder"
          onClick={event => {
            if (isMobile) {
              //FUNCTION TO DISPLAY THE CARD
              displayCardPlainPage(event, urlCard);
            }
          }}
        >
          {card.name}
          {!isMobile && isOnHover && (
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
              handleChange(event);
            }}
          >
            {card.foreignData.length > 0 ? (
              [
                <option value={card.lang} key={card.id + "2"}>
                  {card.lang === 9
                    ? "EN"
                    : card.foreignData.filter(currentlanguage => {
                        return currentlanguage.language_id.id === card.lang;
                      })[0].language_id.shortname}
                </option>
              ].concat(
                card.foreignData
                  .filter(
                    currentlanguage =>
                      currentlanguage.language_id.id !== card.lang
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
        </td>
        <td>
          <select
            name="condition"
            id={card.cardName + "id2"}
            onChange={event => {
              handleChange(event);
            }}
            value={card.condition}
          >
            {conditions.length > 0
              ? gradingArea === "EU"
                ? conditions
                    // .filter(condition => condition.id !== card.condition)
                    .map((condition, index) =>
                      condition.isEU ? (
                        <option key={index} value={condition.id}>
                          {condition.shortname}
                        </option>
                      ) : null
                    )
                : conditions
                    // .filter(condition => condition.id !== card.condition)
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
            value={card.isFoil}
            onChange={event => {
              handleChange(event);
            }}
          >
            <option value={card.isFoil === "Yes" ? "Yes" : "No"}>
              {card.isFoil == "Yes" ? "Yes" : "No"}
            </option>
            {card.hasfoil === 1 && card.hasnonfoil === 1 && (
              <option value={card.isFoil === "Yes" ? "No" : "Yes"}>
                {card.isFoil == "Yes" ? "No" : "Yes"}
              </option>
            )}
          </select>
        </td>

        <td>
          <select
            name="isSigned"
            value={card.isSigned}
            onChange={event => {
              handleChange(event);
            }}
          >
            <option value={card.isSigned === "Yes" ? "Yes" : "No"}>
              {card.isSigned === "Yes" ? "Yes" : "No"}
            </option>
            <option value={card.isSigned === "Yes" ? "No" : "Yes"}>
              {card.isSigned === "Yes" ? "No" : "Yes"}
            </option>
          </select>
        </td>

        <td>
          <select
            name="quantity"
            id={card.cardName + "id3"}
            onChange={event => {
              handleChange(event);
            }}
            value={card.quantity}
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
          {isLoading && <div className="loading-loop"></div>}
          {!isLoading && card.price}
        </td>
        <td>{card.price * card.quantity}</td>
        <td className="AddButton">
          <FeatherIcon
            icon="minus-circle"
            size="20"
            className="downsize-icon pointer"
            onClick={() => {
              console.log(card);
              return handleDelete();
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default CardLineSellingBasket;
