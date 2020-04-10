import React, { useContext, useState, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import genericCardAPI from "../services/genericCardAPI";
import cardsAPI from "../services/cardsAPI";
import { isMobile } from "react-device-detect";
import FeatherIcon from "feather-icons-react";
import { Tr, Td } from "react-super-responsive-table";

const CardLine = ({
  card,
  handleAddSellingBasket,
  index,
  setName,
  displaySets,
}) => {
  const LANGUAGE_ID_ENG = 9;
  const CONDITION_ID_NM = 2;
  const ISFOILTRUE = 1;
  const ISFOILFALSE = 0;
  const ISSIGNEDTRUE = 1;
  const ISSIGNEDFALSE = 0;

  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

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
    isSigned: "No",
    set: setName,
    price:
      card.hasnonfoil === 1
        ? card.allPrices[LANGUAGE_ID_ENG][CONDITION_ID_NM][ISFOILFALSE][
            ISSIGNEDFALSE
          ]
        : card.allPrices[LANGUAGE_ID_ENG][CONDITION_ID_NM][ISFOILTRUE][
            ISSIGNEDFALSE
          ],
  });

  useEffect(() => {
    setCurrentCard({
      ...card,
      quantity: 1,
      condition: 2,
      lang: 9,
      isFoil: card.hasnonfoil ? "No" : "Yes",
      set: setName,
      isSigned: "No",
      price:
        card.hasnonfoil === 1
          ? card.allPrices[LANGUAGE_ID_ENG][CONDITION_ID_NM][ISFOILFALSE][
              ISSIGNEDFALSE
            ]
          : card.allPrices[LANGUAGE_ID_ENG][CONDITION_ID_NM][ISFOILTRUE][
              ISSIGNEDFALSE
            ],
    });
  }, [card]);

  const handleChange = ({ currentTarget }, currentCard) => {
    console.log(currentCard);
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
        currentCard.allPrices[currentCard.lang][currentCard.condition][isFoil];
    }

    setCurrentCard({ ...currentCard, [name]: newValue, price: price });
  };

  //Getting the Picture URL
  const urlPictureCard = cardsAPI.getSmallPictureFromScryfallId(card);

  const hoverClassName = (e) => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  //TEMPORARY DEFAULT DEFINITION TODO : GET IT THROUGH API OR LOCAL ENV
  //ALSO DEFINED IN CARDSELLINGBASKET
  const gradingArea = "EU";

  return (
    <>
      <Tr
        key={index}
        onMouseEnter={(e) => {
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
      >
        <Td className="cardPictureHolder">
          {card.name}
          {!isMobile && isOnHover && (
            <div className={hoverTopOrBottom}>
              <img src={urlPictureCard} alt={card.name} />
            </div>
          )}
        </Td>
        <Td>{card.edition.name}</Td>
        <Td>
          {/* Select will have to be refactored with a .map on a Select Component */}
          <select
            name="lang"
            id={card.name + "id1"}
            onChange={(event) => {
              handleChange(event, currentCard);
            }}
          >
            {card.foreignData.length > 0 ? (
              [
                <option value="9" key="a">
                  EN
                </option>,
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
        </Td>
        <Td>
          <select
            name="condition"
            id={card.name + "id2"}
            onChange={(event) => {
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
        </Td>

        <Td>
          <select
            name="isFoil"
            id={card.name + "id4"}
            onChange={(event) => {
              handleChange(event, currentCard);
            }}
          >
            {card.hasnonfoil && <option value="No">No</option>}
            {card.hasfoil && <option value="Yes">Yes</option>}
          </select>
        </Td>
        <Td>
          <select
            name="isSigned"
            onChange={(event) => {
              handleChange(event, currentCard);
            }}
          >
            <option value="No">Non</option>
            <option value="Yes">Oui</option>
          </select>
        </Td>
        <Td>
          <select
            name="quantity"
            id={card.name + "id3"}
            onChange={(event) => {
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
        </Td>
        <Td>{currentCard.price || 0} </Td>
        <Td className="AddButton">
          <FeatherIcon
            icon="plus-circle"
            size="20"
            className="downsize-icon add-item-basket"
            onClick={() => {
              console.log(currentCard);
              return handleAddSellingBasket(currentBasket, currentCard);
            }}
          />
        </Td>
      </Tr>
    </>
  );
};

export default CardLine;
