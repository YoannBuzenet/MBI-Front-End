import React, { useContext, useState } from "react";
import ShopConditionPriceUpdate from "./ShopConditionPriceUpdate";
import priceBufferContext from "../../context/priceBufferContext";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import config from "../../services/config";

const ShopOneLangAllConditionsCard = ({ oneLang, index }) => {
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
              isSignedKey: isSignedFALSE,
              priceValue: priceValue,
              cardID: context[index].id,
              idCardShopPrice:
                context[index].langs[idLang][conditionKey][
                  isSignedFALSE + "idCardShopPrice"
                ],
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
                ],
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
              cardID: context[index].id,
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
              cardID: context[index].id,
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

  //In the render part here we check the grading area of the shop.
  // If it's Eu, we show the 7 conditions.
  // If it's US, we show the 6 they use.
  //There is a filter a all 4 array that may be displayed.

  return (
    <div>
      <form className="price-update-form">
        <div className="regular-cards">
          <div className="regular-non-signed">
            {nonFoilNonSignedArray.length > 0 && (
              <p>
                <FormattedMessage
                  id="app.shop.priceFormUpdate.nonFoil"
                  defaultMessage={`Regular`}
                />
              </p>
            )}

            {nonFoilNonSignedArray.length !== 0 &&
              nonFoilNonSignedArray
                .filter((futureFormField) => {
                  if (process.env.REACT_APP_SHOP_GRADING_AREA === "US") {
                    return futureFormField.conditionKey !== 5;
                  } else {
                    return futureFormField;
                  }
                })
                .map((infoContainer) => {
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
          <div className="regular-signed">
            {nonFoilSignedArray.length > 0 && (
              <p>
                <FormattedMessage
                  id="app.shop.priceFormUpdate.regular-signed"
                  defaultMessage={`Regular Signed`}
                />
              </p>
            )}
            {nonFoilSignedArray.length !== 0 &&
              nonFoilSignedArray
                .filter((futureFormField) => {
                  if (process.env.REACT_APP_SHOP_GRADING_AREA === "US") {
                    return futureFormField.conditionKey !== 5;
                  } else {
                    return futureFormField;
                  }
                })
                .map((infoContainer) => {
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
        </div>
        <div className="foil-cards">
          <div className="foil-non-signed">
            {foilNonSignedArray.length > 0 && (
              <p>
                <FormattedMessage
                  id="app.shop.priceFormUpdate.foil"
                  defaultMessage={`Foil`}
                />
              </p>
            )}

            {foilNonSignedArray.length !== 0 &&
              foilNonSignedArray
                .filter((futureFormField) => {
                  if (process.env.REACT_APP_SHOP_GRADING_AREA === "US") {
                    return futureFormField.conditionKey !== 5;
                  } else {
                    return futureFormField;
                  }
                })
                .map((infoContainer) => {
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
          <div className="foil-signed">
            {foilSignedArray.length > 0 && (
              <p>
                <FormattedMessage
                  id="app.shop.priceFormUpdate.foil-signed"
                  defaultMessage={`Signed`}
                />
              </p>
            )}
            {foilSignedArray.length !== 0 &&
              foilSignedArray
                .filter((futureFormField) => {
                  if (process.env.REACT_APP_SHOP_GRADING_AREA === "US") {
                    return futureFormField.conditionKey !== 5;
                  } else {
                    return futureFormField;
                  }
                })
                .map((infoContainer) => {
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
        </div>
      </form>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
