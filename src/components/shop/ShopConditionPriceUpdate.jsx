import React from "react";

const ShopConditionPriceUpdate = ({ condition }) => {
  //TODO : pass this in env variable
  const gradingArea = "nameEU";
  return (
    <p>
      {condition[gradingArea]} <input type="text" />
    </p>
  );
};

export default ShopConditionPriceUpdate;
