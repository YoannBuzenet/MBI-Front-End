import React, { useContext, useState } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopConditionPriceUpdate from "./ShopConditionPriceUpdate";
import priceBufferContext from "../../context/priceBufferContext";
import { useEffect } from "react";

const ShopOneLangAllConditionsCard = ({
  oneLang,
  isFoil,
  index,
  variation
}) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //Context - building the memoization of all condition/lang possibilities
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //STATE - Checking if context is fully loaded
  const [isContextLoaded, setIsContextLoaded] = useState(false);

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  // console.log("less info", allPricesBuffer[index].langs);

  useEffect(() => {
    console.log(
      allPricesBuffer,
      allPricesBuffer[index],
      "here there are more info",
      allPricesBuffer[index].langs,
      oneLang.language_id.id
    );
    if (!allPricesBuffer[index].langs) {
      console.log("we try to force a rerender to get full context.");
      setIsContextLoaded(true);
    }
  }, [allPricesBuffer.lang]);

  return (
    <div>
      <div>{Object.entries(allPricesBuffer[index]).map(data => data[0])}</div>
      <div>{allPricesBuffer[index].langs && "try display content"}</div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
