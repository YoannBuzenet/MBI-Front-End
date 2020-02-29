import React, { useContext, useEffect, useState } from "react";

const ShopConditionPriceUpdate = ({ condition, oneLang, isFoil }) => {
  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  useEffect(() => {
    console.log(condition, oneLang, isFoil);
    // setPriceState({ ...priceState, [oneLang[condition[isFoil]]]: 0 });
  });

  return (
    <p>
      {condition[gradingArea]} <input type="text" />
    </p>
  );
};

export default ShopConditionPriceUpdate;
