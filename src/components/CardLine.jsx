import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import genericCardAPI from "../services/genericCardAPI";
import cardsAPI from "../services/cardsAPI";
import { isMobile } from "react-device-detect";
import FeatherIcon from "feather-icons-react";
import { Tr, Td } from "react-super-responsive-table";
import CardDisplayOnPageContext from "../context/cardDisplayOnPageContext";
import BlackDivModalContext from "../context/blackDivModalContext";
import config from "../services/config";
import { useIntl } from "react-intl";
import CardPageContext from "../context/cardsCardPageContext";

const CardLine = ({ card, handleAddSellingBasket, index, setName }) => {
  //Current Selling Request Basket
  const { currentBasket } = useContext(SellingBasketContext);

  //DEFINED langages and Conditions
  const { conditions } = useContext(GenericCardInfosContext);

  //CONTEXT - All cards displayed
  const { cardsCardPageContext, setCardsCardPageContext } = useContext(
    CardPageContext
  );

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivModalContext);

  //Card display on whole page
  const { cardDisplayInformation, setCardDisplayInformation } = useContext(
    CardDisplayOnPageContext
  );

  const handleChange = ({ currentTarget }, currentCard) => {
    // console.log(currentCard);
    //Updating the card following the new info
    const { name, value } = currentTarget;
    if (name === "quantity" || name === "lang" || name === "condition") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }
    var isFoil = currentCard.isFoil === "Yes" ? 1 : 0;
    var isSigned = currentCard.isSigned === "Yes" ? 1 : 0;
    var price;
    //To know how to browse the price object, we must know which property has been changed
    if (name === "lang") {
      price =
        currentCard.allPrices[newValue][currentCard.condition][isFoil][
          isSigned
        ];
    } else if (name === "condition") {
      price =
        currentCard.allPrices[currentCard.lang][newValue][isFoil][isSigned];
    } else if (name === "isFoil") {
      isFoil = newValue === "Yes" ? 1 : 0;
      price =
        currentCard.allPrices[currentCard.lang][currentCard.condition][isFoil][
          isSigned
        ];
    } else if (name === "isSigned") {
      isSigned = newValue === "Yes" ? 1 : 0;
      price =
        currentCard.allPrices[currentCard.lang][currentCard.condition][isFoil][
          isSigned
        ];
    } else {
      price =
        currentCard.allPrices[currentCard.lang][currentCard.condition][isFoil][
          isSigned
        ];
    }
    // Set context Here
    // handlechange to do entirely
    // setCurrentCard({ ...currentCard, [name]: newValue, price: price });
  };

  //Getting the Picture URL
  const urlPictureCard = cardsAPI.getSmallPictureFromScryfallId(
    cardsCardPageContext[index]
  );

  const hoverClassName = (e) => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  const displayCardPlainPage = (event, urlCard) => {
    const newDisplayContext = { ...cardDisplayInformation };
    newDisplayContext.cardPictureUrl = urlCard;
    newDisplayContext.isDisplayed = true;
    setCardDisplayInformation(newDisplayContext);
    setIsBlackDivModalDisplayed("activated");
  };

  //Hook Intl to translate an attribute
  const intl = useIntl();

  return (
    <>
      <Tr
        key={index}
        onMouseEnter={(e) => {
          if (!isMobile) {
            setIsOnHover(true);
            setHoverTopOrBottom(hoverClassName(e));
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsOnHover(false);
          }
        }}
      >
        <Td
          className="cardPictureHolder"
          onClick={(event) => {
            if (isMobile) {
              //FUNCTION TO DISPLAY THE CARD
              displayCardPlainPage(event, urlPictureCard);
            }
          }}
        >
          {cardsCardPageContext[index].name}
          {!isMobile && isOnHover && (
            <div className={hoverTopOrBottom}>
              <img
                src={urlPictureCard}
                alt={cardsCardPageContext[index].name}
              />
            </div>
          )}
        </Td>
        <Td>
          {cardsCardPageContext[index].edition
            ? cardsCardPageContext[index].edition.name
            : null}
        </Td>
        <Td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.name + "id1"}
            onChange={(event) => {
              handleChange(event);
            }}
          >
            {cardsCardPageContext[index].foreignData.length > 0 ? (
              [
                <option value="9" key="a">
                  EN
                </option>,
              ].concat(
                cardsCardPageContext[index].foreignData.map(
                  (foreignData, index) => (
                    <option value={foreignData.language_id.id} key={index}>
                      {foreignData.language_id.shortname}
                    </option>
                  )
                )
              )
            ) : (
              <option value="9">EN</option>
            )}
          </select>
        </Td>
        <Td>
          <select
            name="condition"
            id={cardsCardPageContext[index].name + "id2"}
            onChange={(event) => {
              handleChange(event);
            }}
            defaultValue="2"
          >
            {conditions.length > 0
              ? config.gradingArea === "EU"
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
        </Td>

        <Td>
          <select
            name="isFoil"
            id={cardsCardPageContext[index].name + "id4"}
            onChange={(event) => {
              handleChange(event);
            }}
          >
            {cardsCardPageContext[index].hasnonfoil && (
              <option value="No">
                {intl.formatMessage({
                  id: "app.generics.no",
                  defaultMessage: "No",
                })}
              </option>
            )}
            {cardsCardPageContext[index].hasfoil && (
              <option value="Yes">
                {intl.formatMessage({
                  id: "app.generics.yes",
                  defaultMessage: "Yes",
                })}
              </option>
            )}
          </select>
        </Td>
        <Td>
          <select
            name="isSigned"
            onChange={(event) => {
              handleChange(event);
            }}
          >
            <option value="No">
              {intl.formatMessage({
                id: "app.generics.no",
                defaultMessage: "No",
              })}
            </option>
            <option value="Yes">
              {intl.formatMessage({
                id: "app.generics.yes",
                defaultMessage: "Yes",
              })}
            </option>
          </select>
        </Td>
        <Td>
          <select
            name="quantity"
            id={cardsCardPageContext[index].name + "id3"}
            onChange={(event) => {
              handleChange(event);
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
        </Td>
        <Td>{cardsCardPageContext[index].price || 0} </Td>
        <Td className="AddButton">
          <FeatherIcon
            icon="plus-circle"
            size="20"
            className="downsize-icon add-item-basket"
            onClick={() => {
              return handleAddSellingBasket(
                currentBasket,
                cardsCardPageContext[index]
              );
            }}
          />
        </Td>
      </Tr>
    </>
  );
};

export default CardLine;
