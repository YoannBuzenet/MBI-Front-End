import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopConditionPriceUpdate from "./ShopConditionPriceUpdate";

const ShopOneLangAllConditionsCard = ({ oneLang, index, isFoil }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  return (
    <div>
      <div>
        {conditions.map(condition => {
          return (
            <ShopConditionPriceUpdate
              oneLang={oneLang}
              condition={condition}
              key={condition.id}
              isFoil={isFoil}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
