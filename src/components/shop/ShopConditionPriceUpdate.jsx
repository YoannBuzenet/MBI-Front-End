import React, { useContext, useEffect, useState } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import priceBufferContext from "../../context/priceBufferContext";
import PriceUpdateAPI from "../../services/priceUpdateAPI";

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  priceValue,
  index,
  cardID
}) => {
  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //TODO : pass this in env variable
  const baseLang = 3;

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const priceDisplayed =
    allPricesBuffer[index].langs[langID][conditionID][isFoil] === null
      ? ""
      : allPricesBuffer[index].langs[langID][conditionID][isFoil];
  // console.log(allPricesBuffer);
  // console.log(
  //   conditionID,
  //   langID,
  //   isFoil,
  //   priceValue,
  //   isInitialized,
  //   index,
  //   cardID
  // );

  const handlechange = (
    event,
    conditionID,
    langID,
    isFoil,
    baseLang,
    index,
    cardID
  ) => {
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

      if (conditionID === 1 && isFoil === 0 && langID === baseLang) {
        console.log("Updating everything but foil cards");
        //update all languages and condition in the current set
        // send the batch
      } else if (conditionID === 1) {
        console.log("Updating all conditions in given language and isFoilKey");
        //update all conditions in the given languages
        //send the batch
      } else {
        if (
          allPricesBuffer[index].langs[langID][conditionID][isFoil] !== null
        ) {
          console.log("I PUT YOU");
          // {
          // 	"price" : 11,
          // 	"isFoil" : true,
          // 	"shop" : "/shops/3",
          // 	"language" : "/languages/3",
          // 	"cardCondition" :"/card_conditions/3",
          // 	"card" : "/cards/21349"
          // }
        } else {
          console.log("I POST YOU");
          // {
          // 	"price" : 11,
          // 	"isFoil" : true,
          // 	"shop" : "/shops/3",
          // 	"language" : "/languages/3",
          // 	"cardCondition" :"/card_conditions/3",
          // 	"card" : "/cards/21349"
          // }
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

      console.log("delete");
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
          handlechange(
            event,
            conditionID,
            langID,
            isFoil,
            baseLang,
            index,
            cardID
          );
        }}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
