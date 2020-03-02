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

  useEffect(() => {});

  return (
    <p>
      <input type="text" />
    </p>
  );
};

export default ShopConditionPriceUpdate;
