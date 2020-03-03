import React, { useContext, useEffect, useState } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  priceValue,
  isInitialized
}) => {
  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const priceDisplayed = priceValue === null ? "" : priceValue;

  useEffect(() => {});

  return (
    <p>
      <input
        type="text"
        value={priceDisplayed}
        onChange={event => {
          console.log(event);
        }}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
