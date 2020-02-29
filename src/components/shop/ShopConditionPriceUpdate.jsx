import React, { useContext, useEffect, useState } from "react";

const ShopConditionPriceUpdate = ({
  condition,
  oneLang,
  isFoil,
  priceState,
  setPriceState
}) => {
  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  return (
    <p>
      {condition[gradingArea]} <input type="text" />
    </p>
  );
};

export default ShopConditionPriceUpdate;
