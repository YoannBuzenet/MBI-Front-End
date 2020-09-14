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
import CardShopPriceAPI from "../services/CardShopPriceAPI";
import CardPageContext from "../context/cardsCardPageContext";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const CardLine = ({ card, handleAddSellingBasket, index, cardID }) => {
  // console.log(card);

  //Current Selling Request Basket
  const { currentBasket } = useContext(SellingBasketContext);

  useEffect(() => {
    console.log(currentBasket);
  }, [currentBasket]);

  //DEFINED langages and Conditions
  const { conditions } = useContext(GenericCardInfosContext);

  //CONTEXT - All cards displayed
  const { cardsCardPageContext, setCardsCardPageContext } = useContext(
    CardPageContext
  );

  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = ({ currentTarget }) => {
    // console.log(cardsCardPageContext[cardID]);
    const { name, value } = currentTarget;
    if (name !== "quantity") {
      setIsLoading(true);
    }

    const contextCopy = { ...cardsCardPageContext };

    //Updating the card following the new info

    if (name === "quantity" || name === "lang" || name === "condition") {
      var newValue = parseInt(value);
    } else {
      var newValue = value.toString();
    }

    contextCopy[cardID][name] = newValue;

    //IF anything but the quantity has been updated, we make an API call to get the new price
    if (name !== "quantity") {
      //API call to get the relevant price and UPDATE PRICE
      CardShopPriceAPI.getOnePrice(
        process.env.REACT_APP_SHOP_ID,
        cardID,
        contextCopy[cardID].lang,
        contextCopy[cardID].condition,
        contextCopy[cardID].isFoil,
        contextCopy[cardID].isSigned
      )
        .then((data) => {
          if (data.data["hydra:member"].length > 0) {
            contextCopy[cardID].price = data.data["hydra:member"][0].price;
          } else {
            contextCopy[cardID].price = 0;
          }
          setIsLoading(false);
          //mutating context and not seting it to gain performance

          setCardsCardPageContext(contextCopy);
        })
        .catch((error) => {
          toast.error(
            <FormattedMessage
              id="app.cardLineOneSet.priceUpdate.toast.failure"
              defaultMessage={`Price couldn't be loaded. Please try again.`}
            />
          );
        });
    } else {
      setCardsCardPageContext(contextCopy);
    }
  };
  //Getting the Picture URL
  const urlPictureCard = cardsAPI.getSmallPictureFromScryfallId(
    cardsCardPageContext[cardID]
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
          {cardsCardPageContext[cardID].name}
          {!isMobile && isOnHover && (
            <div className={hoverTopOrBottom}>
              <img
                src={urlPictureCard}
                alt={cardsCardPageContext[cardID].name}
              />
            </div>
          )}
        </Td>
        <Td>{cardsCardPageContext[cardID].set}</Td>
        <Td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.name + "id1"}
            onChange={(event) => {
              handleChange(event);
            }}
            value={card.lang}
          >
            {cardsCardPageContext[cardID].foreignData.length > 0 ? (
              [
                <option value="9" key="a">
                  EN
                </option>,
              ].concat(
                cardsCardPageContext[cardID].foreignData.map(
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
            id={cardsCardPageContext[cardID].name + "id2"}
            onChange={(event) => {
              handleChange(event);
            }}
            value={card.condition}
          >
            {conditions.length > 0
              ? process.env.REACT_APP_SHOP_GRADING_AREA === "EU"
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
            id={cardsCardPageContext[cardID].name + "id4"}
            onChange={(event) => {
              handleChange(event);
            }}
            value={cardsCardPageContext[cardID].isFoil}
          >
            {cardsCardPageContext[cardID].hasnonfoil && (
              <option value="No">
                {intl.formatMessage({
                  id: "app.generics.no",
                  defaultMessage: "No",
                })}
              </option>
            )}
            {cardsCardPageContext[cardID].hasfoil && (
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
            id={cardsCardPageContext[cardID].name + "id3"}
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
        <Td>
          {!isLoading && cardsCardPageContext[cardID].price}
          {isLoading && <div className="loading-loop"></div>}
        </Td>
        <Td className="AddButton">
          <FeatherIcon
            icon="plus-circle"
            size={isMobile ? config.iconSizeMobile : config.iconSizeDesktop}
            className="downsize-icon add-item-basket"
            onClick={() => {
              // console.log(cardsCardPageContext[cardID]);
              return handleAddSellingBasket({
                ...cardsCardPageContext[cardID],
              });
            }}
          />
        </Td>
      </Tr>
    </>
  );
};

export default CardLine;
