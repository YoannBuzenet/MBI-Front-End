import React, { useContext, useEffect } from "react";
import priceUpdateContext from "../../context/priceUpdateContext";

const ShopConditionPriceUpdate = ({ condition, oneLang, isFoil }) => {
  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //Context - building the memoization of all condition/lang possibilities
  const { allPrices, setAllPrices } = useContext(priceUpdateContext);

  useEffect(() => {
    console.log(condition, oneLang, isFoil);
    setAllPrices({ ...allPrices , (allPrices[oneLang][condition]: 0)});
  }, []);

  return (
    <p>
      {condition[gradingArea]} <input type="text" />
    </p>
  );
};

export default ShopConditionPriceUpdate;
