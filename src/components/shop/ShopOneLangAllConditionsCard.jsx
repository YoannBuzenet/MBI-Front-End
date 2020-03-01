import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopConditionPriceUpdate from "./ShopConditionPriceUpdate";

const ShopOneLangAllConditionsCard = ({
  oneLang,
  index,
  isFoil,
  variation
}) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  console.log(variation);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
