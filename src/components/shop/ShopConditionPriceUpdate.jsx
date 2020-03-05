import React, { useContext, useEffect, useState } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import priceBufferContext from "../../context/priceBufferContext";
import priceUpdateAPI from "../../services/priceUpdateAPI";
import AuthContext from "../../context/authContext";

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  priceValue,
  index,
  cardID
}) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log(authenticationInfos.shop.shopData);

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //TODO : pass this in env variable
  const shop = 3;

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const priceDisplayed =
    allPricesBuffer[index].langs[langID][conditionID][isFoil] === null
      ? ""
      : allPricesBuffer[index].langs[langID][conditionID][isFoil];
  // console.log(allPricesBuffer);

  const idCardShopPrice =
    allPricesBuffer[index].langs[langID][conditionID][
      isFoil + "idCardShopPrice"
    ];

  const handlechange = (event, conditionID, langID, isFoil, index, cardID) => {
    //Checking the input is a number
    // console.log(event.target.value);
    if (!isNaN(parseInt(event.target.value))) {
      console.log(
        parseInt(event.target.value),
        conditionID,
        langID,
        isFoil,
        index,
        cardID
      );

      const newPrice = parseInt(event.target.value);

      if (
        conditionID === 1 &&
        isFoil === 0 &&
        langID === authenticationInfos.shop.shopData.baseLang
      ) {
        console.log("Updating everything but foil cards");
        //update all languages and condition in the current set
        // send the batch
      } else if (conditionID === 1) {
        if (isFoil === 0) {
          console.log(
            "Updating all conditions in given language and isFoilKey"
          );
          //update all conditions in the given languages
          const allPricesCopy = [...allPricesBuffer];
          allPricesCopy[index].langs[langID][1][isFoil] = newPrice;

          //A bit dirty
          //Browing each condition and setting the price following the percent stored in session.
          //As session's PercentPerConditions numbers are IN ARRAY, we are hacky and follow their index with -1. The day this order changes, this loop won't work. Solution : receinving data as object instead of array.
          var i = 1;
          for (const condition in allPricesCopy[index].langs[langID]) {
            if (i === 1) {
              allPricesCopy[index].langs[langID][i][isFoil] = newPrice;
            } else {
              allPricesCopy[index].langs[langID][i][isFoil] =
                //If we want to make prices more stable integer, implement function here
                (newPrice *
                  authenticationInfos.shop.shopData.PercentPerConditions[i - 1]
                    .percent) /
                100;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);

          //send the batch
        } else if (isFoil === 1) {
          //update all conditions in the given languages
          const allPricesCopy = [...allPricesBuffer];
          allPricesCopy[index].langs[langID][1][isFoil] = newPrice;
          //A bit dirty
          //Browing each condition and setting the price following the percent stored in session.
          //As session's PercentPerConditions numbers are IN ARRAY, we are hacky and follow their index with -1. The day this order changes, this loop won't work. Solution : receinving data as object instead of array.
          var i = 1;
          for (const condition in allPricesCopy[index].langs[langID]) {
            if (i === 1) {
              allPricesCopy[index].langs[langID][i][isFoil] = newPrice;
            } else {
              allPricesCopy[index].langs[langID][i][isFoil] =
                //If we want to make prices more stable integer, implement function here
                (newPrice *
                  authenticationInfos.shop.shopData.PercentPerConditionFoils[
                    i - 1
                  ].percent) /
                100;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);
        }
      } else {
        if (
          allPricesBuffer[index].langs[langID][conditionID][isFoil] !== null
        ) {
          const objectToSend = {
            price: newPrice,
            isFoil: isFoil === 1 ? true : false,
            shop: "/shops/" + shop,
            language: "/languages/" + langID,
            cardCondition: "/card_conditions/" + conditionID,
            card: "/cards/" + cardID
          };

          priceUpdateAPI
            .putOnePrice(objectToSend, idCardShopPrice)
            .then(response => console.log("la", response))
            .catch(error => console.log(error));
        } else {
          const objectToSend = {
            price: newPrice,
            isFoil: isFoil === 1 ? true : false,
            shop: "/shops/" + shop,
            language: "/languages/" + langID,
            cardCondition: "/card_conditions/" + conditionID,
            card: "/cards/" + cardID
          };
          priceUpdateAPI
            .postOnePrice(objectToSend)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }

        const allPricesCopy = [...allPricesBuffer];
        allPricesCopy[index].langs[langID][conditionID][isFoil] = newPrice;
        setAllPricesBuffer(allPricesCopy);
        // console.log(allPricesCopy);
      }
    } else if (event.target.value === "") {
      //set the price to null in context
      const allPricesCopy = [...allPricesBuffer];
      allPricesCopy[index].langs[langID][conditionID][isFoil] = null;
      setAllPricesBuffer(allPricesCopy);
      //Delete in DB
      priceUpdateAPI.deleteOnePrice(idCardShopPrice);
    } else {
      //TODO : toast to tell to put a number
      console.log("type a number please");
    }
  };

  useEffect(() => {
    // console.log(allPricesBuffer);
  });

  return (
    <p>
      <input
        key={parseInt(cardID + "" + conditionID + "" + langID + "" + isFoil)}
        type="text"
        value={priceDisplayed}
        onChange={event => {
          handlechange(event, conditionID, langID, isFoil, index, cardID);
        }}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
