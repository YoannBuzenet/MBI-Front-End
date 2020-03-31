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
  //Context - building the memoization of all condition/lang possibilities
  const { allPricesBuffer } = useContext(priceBufferContext);

  //STATE - Array to iterate and create the components for NON foil components
  const [nonFoilNonSignedArray, setNonFoilNonSignedArray] = useState([]);

  //STATE - Array to iterate and create the components for NON foil components
  const [nonFoilSignedArray, setNonFoilSignedArray] = useState([]);

  //STATE - Array to iterate and create the components for FOIL components
  const [foilNonSignedArray, setfoilNonSignedArray] = useState([]);

  //STATE - Array to iterate and create the components for FOIL components
  const [foilSignedArray, setFoilSignedArray] = useState([]);

  const isSignedTRUE = 1;
  const isSignedFALSE = 0;

  //TODO : check if logged at any load of admin page and put a toast if not logged

  function buildNonFoilNonSignedDisplayArray(context, index, idLang) {
    var array_to_display = [];

    // console.log(context[index].langs[idLang]);

    if (context[index].hasnonfoil === 1) {
      for (const conditionKey in context[index].langs[idLang]) {
        // console.log("conditionKey", conditionKey);
        for (const isFoilKey in context[index].langs[idLang][conditionKey]) {
          // console.log("isFoilKey", isFoilKey);
          // console.log(context[index].langs[idLang][conditionKey][isFoilKey]);
          if (isFoilKey === "0") {
            const priceValue =
              context[index].langs[idLang][conditionKey][isFoilKey][
                isSignedFALSE
              ];

            array_to_display.push({
              langKey: idLang,
              conditionKey: parseInt(conditionKey),
              isFoilKey: parseInt(isFoilKey),
              isSignedKey: 0,
              priceValue: priceValue,
              cardID: context[index].id,
              idCardShopPrice:
                context[index].langs[idLang][conditionKey][
                  isSignedFALSE + "idCardShopPrice"
                ]
            });
          }
        }
      }
    }

    // console.log(array_to_display);

    return array_to_display;
  }

  function buildNonFoilSignedDisplayArray(context, index, idLang) {
    var array_to_display = [];

    // console.log(context[index].langs[idLang]);

    if (context[index].hasnonfoil === 1) {
      for (const conditionKey in context[index].langs[idLang]) {
        // console.log("conditionKey", conditionKey);
        for (const isFoilKey in context[index].langs[idLang][conditionKey]) {
          // console.log("isFoilKey", isFoilKey);
          // console.log(context[index].langs[idLang][conditionKey][isFoilKey]);
          if (isFoilKey === "0") {
            const priceValue =
              context[index].langs[idLang][conditionKey][isFoilKey][
                isSignedTRUE
              ];
            array_to_display.push({
              langKey: idLang,
              conditionKey: parseInt(conditionKey),
              isFoilKey: parseInt(isFoilKey),
              isSignedKey: isSignedTRUE,
              priceValue: priceValue,
              cardID: context[index].id,
              idCardShopPrice:
                context[index].langs[idLang][conditionKey][
                  isFoilKey + "idCardShopPrice"
                ]
            });
          }
        }
      }
    }

    // console.log(array_to_display);

    return array_to_display;
  }

  function buildFoilNonSignedDisplayArray(context, index, idLang) {
    var array_to_display = [];

    // console.log(context[index].langs[idLang]);
    if (context[index].hasfoil === 1) {
      for (const conditionKey in context[index].langs[idLang]) {
        // console.log("conditionKey", conditionKey);
        for (const isFoilKey in context[index].langs[idLang][conditionKey]) {
          // console.log("isFoilKey", isFoilKey);
          // console.log(context[index].langs[idLang][conditionKey][isFoilKey]);
          if (isFoilKey === "1") {
            const priceValue =
              context[index].langs[idLang][conditionKey][isFoilKey][
                isSignedFALSE
              ];
            array_to_display.push({
              langKey: idLang,
              conditionKey: parseInt(conditionKey),
              isFoilKey: parseInt(isFoilKey),
              isSignedKey: isSignedFALSE,
              priceValue: priceValue,
              cardID: context[index].id
            });
          }
        }
      }
    }

    // console.log(array_to_display);

    return array_to_display;
  }

  function buildFoilSignedDisplayArray(context, index, idLang) {
    var array_to_display = [];

    // console.log(context[index].langs[idLang]);
    if (context[index].hasfoil === 1) {
      for (const conditionKey in context[index].langs[idLang]) {
        // console.log("conditionKey", conditionKey);
        for (const isFoilKey in context[index].langs[idLang][conditionKey]) {
          // console.log("isFoilKey", isFoilKey);
          // console.log(context[index].langs[idLang][conditionKey][isFoilKey]);
          if (isFoilKey === "1") {
            const priceValue =
              context[index].langs[idLang][conditionKey][isFoilKey][
                isSignedTRUE
              ];
            array_to_display.push({
              langKey: idLang,
              conditionKey: parseInt(conditionKey),
              isFoilKey: parseInt(isFoilKey),
              isSignedKey: isSignedTRUE,
              priceValue: priceValue,
              cardID: context[index].id
            });
          }
        }
      }
    }

    // console.log(array_to_display);

    return array_to_display;
  }

  useEffect(() => {
    setNonFoilNonSignedArray(
      buildNonFoilNonSignedDisplayArray(
        allPricesBuffer,
        index,
        oneLang.language_id.id
      )
    );

    setNonFoilSignedArray(
      buildNonFoilSignedDisplayArray(
        allPricesBuffer,
        index,
        oneLang.language_id.id
      )
    );

    setfoilNonSignedArray(
      buildFoilNonSignedDisplayArray(
        allPricesBuffer,
        index,
        oneLang.language_id.id
      )
    );

    setFoilSignedArray(
      buildFoilSignedDisplayArray(
        allPricesBuffer,
        index,
        oneLang.language_id.id
      )
    );
  }, []);

  return (
    <div>
      <form action="">
        <div>
          {nonFoilNonSignedArray.length > 0 && <p>Non Foil</p>}

          {nonFoilNonSignedArray.length !== 0 &&
            nonFoilNonSignedArray.map(infoContainer => {
              return (
                <ShopConditionPriceUpdate
                  key={parseInt(
                    infoContainer.cardID +
                      "" +
                      infoContainer.conditionKey +
                      "" +
                      infoContainer.langKey +
                      "" +
                      infoContainer.isFoilKey
                  )}
                  conditionID={infoContainer.conditionKey}
                  langID={infoContainer.langKey}
                  isFoil={infoContainer.isFoilKey}
                  isSigned={infoContainer.isSignedKey}
                  priceValue={infoContainer.priceValue}
                  index={index}
                  cardID={infoContainer.cardID}
                />
              );
            })}
          {nonFoilSignedArray.length > 0 && <p>Signé</p>}
          {nonFoilSignedArray.length !== 0 &&
            nonFoilSignedArray.map(infoContainer => {
              return (
                <ShopConditionPriceUpdate
                  key={parseInt(
                    infoContainer.cardID +
                      "" +
                      infoContainer.conditionKey +
                      "" +
                      infoContainer.langKey +
                      "" +
                      infoContainer.isFoilKey
                  )}
                  conditionID={infoContainer.conditionKey}
                  langID={infoContainer.langKey}
                  isFoil={infoContainer.isFoilKey}
                  isSigned={infoContainer.isSignedKey}
                  priceValue={infoContainer.priceValue}
                  index={index}
                  cardID={infoContainer.cardID}
                />
              );
            })}
        </div>
        <div>
          {foilNonSignedArray.length > 0 && <p>Foil</p>}

          {foilNonSignedArray.length !== 0 &&
            foilNonSignedArray.map(infoContainer => {
              return (
                <ShopConditionPriceUpdate
                  key={parseInt(
                    infoContainer.cardID +
                      "" +
                      infoContainer.conditionKey +
                      "" +
                      infoContainer.langKey +
                      "" +
                      infoContainer.isFoilKey
                  )}
                  conditionID={infoContainer.conditionKey}
                  langID={infoContainer.langKey}
                  isFoil={infoContainer.isFoilKey}
                  isSigned={infoContainer.isSignedKey}
                  priceValue={infoContainer.priceValue}
                  index={index}
                  cardID={infoContainer.cardID}
                />
              );
            })}
          {foilSignedArray.length > 0 && <p>Signé</p>}
          {foilSignedArray.length !== 0 &&
            foilSignedArray.map(infoContainer => {
              return (
                <ShopConditionPriceUpdate
                  key={parseInt(
                    infoContainer.cardID +
                      "" +
                      infoContainer.conditionKey +
                      "" +
                      infoContainer.langKey +
                      "" +
                      infoContainer.isFoilKey
                  )}
                  conditionID={infoContainer.conditionKey}
                  langID={infoContainer.langKey}
                  isFoil={infoContainer.isFoilKey}
                  isSigned={infoContainer.isSignedKey}
                  priceValue={infoContainer.priceValue}
                  index={index}
                  cardID={infoContainer.cardID}
                />
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
