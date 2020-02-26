import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopConditionPriceUpdate from "./ShopConditionPriceUpdate";

const ShopOneLangAllConditionsCard = ({ oneLang, index }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  return (
    <div>
      <div>
        {conditions.map(condition => {
          return (
            <ShopConditionPriceUpdate
              condition={condition}
              key={condition.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
