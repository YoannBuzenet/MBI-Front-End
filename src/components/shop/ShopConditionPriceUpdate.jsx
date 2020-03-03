import React, { useContext, useEffect, useState } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import priceBufferContext from "../../context/priceBufferContext";

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  priceValue,
  isInitialized
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

  const priceDisplayed = priceValue === null ? "" : priceValue;

  const handlechange = (
    event,
    conditionID,
    langID,
    isFoil,
    isInitialized,
    baseLang
  ) => {
    //Checking the input is a number
    if (!isNaN(parseInt(event.target.value))) {
      console.log(
        parseInt(event.target.value),
        conditionID,
        langID,
        isFoil,
        isInitialized
      );
      if (conditionID === 1 && isFoil === 0 && langID === baseLang) {
        console.log("on met tout à jour pour le NON foil");
        //update all languages and condition in the current set
        // send the batch
      } else if (conditionID === 1) {
        console.log(
          "on met toutes les conditions dans la langue donnée et le isFoil donné"
        );
        //update all conditions in the given languages
        //send the batch
      } else {
        console.log("on PUT/POST juste celui-là");
        //send the PUT/POST of this element
      }
    } else {
      //TODO : toast to tell to put a number
      console.log("type a number please");
    }
  };

  useEffect(() => {});

  return (
    <p>
      <input
        type="text"
        value={priceDisplayed}
        onChange={event => {
          handlechange(
            event,
            conditionID,
            langID,
            isFoil,
            isInitialized,
            baseLang
          );
        }}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
