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

  //TODO : check if logged at any load of admin page and put a toast if not logged

  // console.log("less info", allPricesBuffer[index].langs);

  useEffect(() => {
    console.log(
      allPricesBuffer,
      allPricesBuffer[index],
      "here there are more info",
      allPricesBuffer[index].langs,
      oneLang.language_id.id
    );
  }, [allPricesBuffer.lang]);

  return (
    <div>
      <div>
        {allPricesBuffer[index].langs &&
          Object.entries(allPricesBuffer[index].langs).map(
            data => data[1][1][1]
          )}
      </div>
      <div>{allPricesBuffer[index].langs && "try display content"}</div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
