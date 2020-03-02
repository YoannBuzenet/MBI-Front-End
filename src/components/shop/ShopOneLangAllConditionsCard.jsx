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

  //STATE - Array to iterate and create the components for NON foil components
  const [nonFoilArray, setNonFoilArray] = useState([]);

  //STATE - Array to iterate and create the components for FOIL components
  const [foilArray, setfoilArray] = useState([]);

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //TODO : check if logged at any load of admin page and put a toast if not logged

  function buildNonFoilDisplayArray(context) {
    var array_to_display = [];

    return array_to_display;
  }

  function buildFoilDisplayArray(context) {
    var array_to_display = [];

    return array_to_display;
  }

  useEffect(() => {
    console.log(
      allPricesBuffer[index].langs[oneLang.language_id.id],
      oneLang.language_id.id
    );
    setNonFoilArray(buildNonFoilDisplayArray(allPricesBuffer));
    setfoilArray(buildFoilDisplayArray(allPricesBuffer));
  }, []);

  return (
    <div>
      <div>
        <p>Non Foil</p>
        <p>
          {nonFoilArray.map(infoContainer => {
            return "lol";
          })}
        </p>
      </div>
      <div>
        <p>Foil</p>
        <p>
          {foilArray.map(infoContainer => {
            return "lolFoil";
          })}
        </p>
      </div>
      <div>{allPricesBuffer[index].langs && "try display content"}</div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
