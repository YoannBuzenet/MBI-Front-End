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

  function buildNonFoilDisplayArray(context, index, idLang) {
    var array_to_display = [];

    // console.log(context[index].langs[idLang]);

    for (const conditionKey in context[index].langs[idLang]) {
      // console.log("conditionKey", conditionKey);
      for (const isFoilKey in context[index].langs[idLang][conditionKey]) {
        // console.log("isFoilKey", isFoilKey);
        // console.log(context[index].langs[idLang][conditionKey][isFoilKey]);
        if (isFoilKey === "0") {
          const priceValue =
            context[index].langs[idLang][conditionKey][isFoilKey];
          array_to_display.push({
            langKey: idLang,
            conditionKey: conditionKey,
            isFoilKey: isFoilKey,
            priceValue: priceValue
          });
        }
      }
    }

    console.log(array_to_display);

    return array_to_display;
  }

  function buildFoilDisplayArray(context, index, idLang) {
    var array_to_display = [];

    // console.log(context[index].langs[idLang]);

    for (const conditionKey in context[index].langs[idLang]) {
      // console.log("conditionKey", conditionKey);
      for (const isFoilKey in context[index].langs[idLang][conditionKey]) {
        // console.log("isFoilKey", isFoilKey);
        // console.log(context[index].langs[idLang][conditionKey][isFoilKey]);
        if (isFoilKey === "1") {
          const priceValue =
            context[index].langs[idLang][conditionKey][isFoilKey];
          array_to_display.push({
            langKey: idLang,
            conditionKey: conditionKey,
            isFoilKey: isFoilKey,
            priceValue: priceValue
          });
        }
      }
    }

    console.log(array_to_display);

    return array_to_display;
  }

  useEffect(() => {
    setNonFoilArray(
      buildNonFoilDisplayArray(allPricesBuffer, index, oneLang.language_id.id)
    );
    setfoilArray(
      buildFoilDisplayArray(allPricesBuffer, index, oneLang.language_id.id)
    );
  }, []);

  return (
    <div>
      <div>
        <p>Non Foil</p>
        <p>
          {nonFoilArray.length !== 0 &&
            nonFoilArray.map(infoContainer => {
              return (
                <ShopConditionPriceUpdate
                  conditionID={infoContainer.conditionKey}
                  langID={infoContainer.langKey}
                  isFoil={infoContainer.isFoilKey}
                  priceValue={infoContainer.priceValue}
                />
              );
            })}
        </p>
      </div>
      <div>
        <p>Foil</p>
        <p>
          {foilArray.length !== 0 &&
            foilArray.map(infoContainer => {
              return (
                <ShopConditionPriceUpdate
                  conditionID={infoContainer.conditionKey}
                  langID={infoContainer.langKey}
                  isFoil={infoContainer.isFoilKey}
                  priceValue={infoContainer.priceValue}
                />
              );
            })}
        </p>
      </div>
      <div>{allPricesBuffer[index].langs && "try display content"}</div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
