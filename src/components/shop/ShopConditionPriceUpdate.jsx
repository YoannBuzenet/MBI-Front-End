import React, { useContext, useState } from "react";
import priceBufferContext from "../../context/priceBufferContext";
import priceUpdateAPI from "../../services/priceUpdateAPI";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";
import config from "../../services/config";

//Based on context defined in page ShopAdminOneCard
//This component updates prices in context, send some of data to API, and treats resp back to update context with new ID.
//Data that are saved in context and NOT sent to API (was updated property) only serve display purposes for UX improvment.
//Depending if updated lang is baseLang or not, and Mint condition or not, we update several languages or fields of the form, or just one.

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  isSigned,
  index,
  cardID,
}) => {
  const WAIT_INTERVAL = 1000;

  const [timer, setTimer] = useState(null);

  //Current Authentication
  const { authenticationInfos } = useContext(AuthContext);

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  const priceDisplayed =
    allPricesBuffer[index].langs[langID][conditionID][isFoil][isSigned] === null
      ? ""
      : allPricesBuffer[index].langs[langID][conditionID][isFoil][isSigned];

  const PercentPerSigned = authenticationInfos.shop.shopData.PercentPerSigned;

  const sendSmallBatchToAPI = () => {
    const batch = [];
    const allPricesCopy = [...allPricesBuffer];
    //Preparing Small Batch
    //Editing or creating the Card Shop Price if ID already exists
    for (const objectToParse in allPricesCopy[index].langs[langID]) {
      if (
        allPricesCopy[index].langs[langID][objectToParse][isFoil][
          isSigned + "idCardShopPrice"
        ]
      ) {
        const newPriceToSend = {
          id:
            allPricesCopy[index].langs[langID][objectToParse][isFoil][
              isSigned + "idCardShopPrice"
            ],
          price:
            allPricesCopy[index].langs[langID][objectToParse][isFoil][isSigned],
          isFoil: isFoil === 1 ? true : false,
          isSigned: isSigned === 1 ? true : false,
          isAltered: false,
          shop: config.shopID,
          card: cardID,
          language: langID,
          cardCondition: parseInt(objectToParse),
        };
        batch.push(newPriceToSend);
      } else {
        const newPriceToSend = {
          price:
            allPricesCopy[index].langs[langID][objectToParse][isFoil][isSigned],
          isFoil: isFoil === 1 ? true : false,
          isSigned: isSigned === 1 ? true : false,
          isAltered: false,
          shop: config.shopID,
          card: cardID,
          language: langID,
          cardCondition: parseInt(objectToParse),
        };
        batch.push(newPriceToSend);
      }
    }
    //sending the batch
    console.log(batch);
    try {
      priceUpdateAPI
        .batchPriceUpdate(batch)
        .then((data) => registerBatchResponseIntoContext(data.data));
    } catch (error) {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    }
  };

  const registerBatchResponseIntoContext = (data) => {
    const contextCopy = [...allPricesBuffer];
    //Copy context
    //Parse Data
    for (let i = 0; i < data.length; i++) {
      const idCardShopPrice = data[i].id;
      // const price = data[i].price;
      // const shop = parseInt(data[i].shop.substr(7));
      // const idcard = parseInt(data[i].card.substr(7));
      const languageID = parseInt(data[i].language.substr(11));
      const conditionID = parseInt(data[i].cardCondition.substr(17));
      const isFoil = data[i].isFoil === true ? 1 : 0;
      const isSigned = data[i].isSigned === true ? 1 : 0;
      // TODO : check s'il y a oubli de la prise en des modifs dans le contexte
      contextCopy[index].langs[languageID][conditionID][isFoil][
        isSigned + "idCardShopPrice"
      ] = idCardShopPrice;
    }
    setAllPricesBuffer(contextCopy);
  };

  const sendBigBatchToAPI = () => {
    const batch = [];
    const allPricesCopy = [...allPricesBuffer];
    //Preparing Batch
    for (const LangToParse in allPricesCopy[index].langs) {
      for (const objectToParse in allPricesCopy[index].langs[LangToParse]) {
        if (
          allPricesCopy[index].langs[LangToParse][objectToParse][isFoil][
            isSigned + "idCardShopPrice"
          ]
        ) {
          const newPriceToSend = {
            id:
              allPricesCopy[index].langs[LangToParse][objectToParse][isFoil][
                isSigned + "idCardShopPrice"
              ],
            price:
              allPricesCopy[index].langs[LangToParse][objectToParse][isFoil][
                isSigned
              ],
            isFoil: isFoil === 1 ? true : false,
            isSigned: isSigned === 1 ? true : false,
            isAltered: false,
            shop: config.shopID,
            card: cardID,
            language: LangToParse,
            cardCondition: parseInt(objectToParse),
          };
          batch.push(newPriceToSend);
        } else {
          const newPriceToSend = {
            price:
              allPricesCopy[index].langs[LangToParse][objectToParse][isFoil][
                isSigned
              ],
            isFoil: isFoil === 1 ? true : false,
            isSigned: isSigned === 1 ? true : false,
            isAltered: false,
            shop: config.shopID,
            card: cardID,
            language: LangToParse,
            cardCondition: parseInt(objectToParse),
          };
          batch.push(newPriceToSend);
        }
      }
    }
    console.log(batch);
    try {
      priceUpdateAPI
        .batchPriceUpdate(batch)
        .then((data) => registerBatchResponseIntoContext(data.data));
    } catch (error) {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    }
  };

  //This functions allows to update price on a card.
  // If Mint field is updated in BaseLang, we update all fields of all language in the same set, for non foil.
  // If mint is updated for non baselang, we update all the conditions only in this lang for non foil or foil
  // If another field is updated, we update just the field
  // Each time we update, we must wait for server response to add the new ID to our context, to be able to modify content.
  const handlechange = (
    event,
    conditionID,
    langID,
    isFoil,
    isSigned,
    index,
    cardID,
    timer
  ) => {
    setTimer(clearTimeout(timer));

    //Checking if user is typing a float number. This condition allows him to type it
    //Without this condition, user can't type a "." to type the complete floating number
    if (event.target.value[event.target.value.length - 1] === ".") {
      const allPricesCopy = [...allPricesBuffer];
      allPricesCopy[index].langs[langID][conditionID][isFoil][isSigned] =
        event.target.value;
      setAllPricesBuffer(allPricesCopy);
    }

    //If it's a number, real logic triggers here
    else if (!isNaN(parseFloat(event.target.value))) {
      const newPrice = parseFloat(event.target.value);

      if (
        conditionID === 1 &&
        langID === authenticationInfos.shop.shopData.baseLang.id
      ) {
        //AIM - update all languages and condition in the current set (NON SIGNED AND SIGNED)
        //1. Copy context
        const contextCopy = [...allPricesBuffer];
        //2. Update baselang
        var j = 1;
        for (const conditions in contextCopy[index].langs[
          authenticationInfos.shop.shopData.baseLang.id
        ]) {
          //On first condition the price is the one user did seize. So we just put it as it is.
          if (j === 1) {
            //Updating Price on context on NON SIGNED MINT
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][isSigned] = newPrice;

            //Updating Price on context for SIGNED MINT
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][1] = priceUpdateAPI.smoothNumbers(
              (newPrice * PercentPerSigned) / 100
            );
            //Updating 'Was Updated' property on context to create a CSS class
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][isSigned + "wasUpdated"] = true;

            if (isSigned === 0) {
              //Updating 'Was Updated' property on context to create a CSS class
              //We add this condition becase it is skipped otherwise
              contextCopy[index].langs[
                authenticationInfos.shop.shopData.baseLang.id
              ][conditions][isFoil][1 + "wasUpdated"] = true;
            }
          } else {
            //Updating Prices on all non Mint conditions on BaseLang on Signed and Non Signed
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][isSigned] = priceUpdateAPI.smoothNumbers(
              (newPrice *
                authenticationInfos.shop.shopData.PercentPerConditions[j - 1]
                  .percent) /
                100
            );

            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][1] = priceUpdateAPI.smoothNumbers(
              (((newPrice * PercentPerSigned) / 100) *
                authenticationInfos.shop.shopData.PercentPerConditions[j - 1]
                  .percent) /
                100
            );

            //Updating Was Updated property on context to create a CSS class
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][isSigned + "wasUpdated"] = true;

            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil][1 + "wasUpdated"] = true;
          }
          j++;
        }

        //3. Loop on everything, skip baselang
        for (const language in contextCopy[index].langs) {
          if (
            parseInt(language) === authenticationInfos.shop.shopData.baseLang.id
          ) {
            //If the current Lang is Baselang, we skip because we've updated it just above
          } else {
            //Browsing all languages
            //update the lang that is not baseLang
            var k = 1;
            for (const conditions in contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ]) {
              if (k === 1) {
                //Updating price on Mint condition on NON baseLang
                //Non Signed
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][isSigned] = priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    authenticationInfos.shop.shopData.PercentPerLangs[
                      parseInt(language)
                    ].percentPerLang) /
                    100
                );
                //Signed
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][1] = priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    (PercentPerSigned / 100) *
                    authenticationInfos.shop.shopData.PercentPerLangs[
                      parseInt(language)
                    ].percentPerLang) /
                    100
                );

                //Updating Was Updated property on context to create a CSS class(non signed)
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][isSigned + "wasUpdated"] = true;

                //Updating Was Updated property on context to create a CSS class(signed)
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][1 + "wasUpdated"] = true;
              } else {
                //Updating Price on all non BaseLang on non-Mint conditions (non signed)
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][isSigned] = priceUpdateAPI.smoothNumbers(
                  (((newPrice *
                    authenticationInfos.shop.shopData.PercentPerLangs[
                      parseInt(language)
                    ].percentPerLang) /
                    100) *
                    authenticationInfos.shop.shopData.PercentPerConditions[
                      k - 1
                    ].percent) /
                    100
                );
                //Updating Price on all non BaseLang on non-Mint conditions (signed)
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][1] = priceUpdateAPI.smoothNumbers(
                  (((newPrice *
                    (PercentPerSigned / 100) *
                    authenticationInfos.shop.shopData.PercentPerLangs[
                      parseInt(language)
                    ].percentPerLang) /
                    100) *
                    authenticationInfos.shop.shopData.PercentPerConditions[
                      k - 1
                    ].percent) /
                    100
                );

                //Updating Was Updated property on context to create a CSS class (non signed)
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][isSigned + "wasUpdated"] = true;

                //Updating Was Updated property on context to create a CSS class (signed)
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ][1 + "wasUpdated"] = true;
              }
              k++;
            }
          }
        }
        //4. Set context
        setAllPricesBuffer(contextCopy);
        //If we're updating Mint field NON baselang, just refresh this lang (non signed & signed)
      } else if (conditionID === 1) {
        //update all conditions in the given languages
        const allPricesCopy = [...allPricesBuffer];

        //Updating NON signed, so we update NON SIGNED and SIGNED
        if (isSigned === 0) {
          var i = 1;
          for (const condition in allPricesCopy[index].langs[langID]) {
            if (i === 1) {
              allPricesCopy[index].langs[langID][i][isFoil][0] = newPrice;

              allPricesCopy[index].langs[langID][i][
                isFoil
              ][1] = priceUpdateAPI.smoothNumbers(
                (newPrice * PercentPerSigned) / 100
              );

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][isFoil][
                0 + "wasUpdated"
              ] = true;

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][isFoil][
                1 + "wasUpdated"
              ] = true;
            } else {
              allPricesCopy[index].langs[langID][i][isFoil][0] =
                //If we want to make prices more stable integer, implement function here
                priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    authenticationInfos.shop.shopData.PercentPerConditions[
                      i - 1
                    ].percent) /
                    100
                );
              allPricesCopy[index].langs[langID][i][isFoil][1] =
                //If we want to make prices more stable integer, implement function here
                priceUpdateAPI.smoothNumbers(
                  (((newPrice * PercentPerSigned) / 100) *
                    authenticationInfos.shop.shopData.PercentPerConditions[
                      i - 1
                    ].percent) /
                    100
                );

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][isFoil][
                isSigned + "wasUpdated"
              ] = true;

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][isFoil][
                1 + "wasUpdated"
              ] = true;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);
        } else if (isSigned === 1) {
          var i = 1;
          for (const condition in allPricesCopy[index].langs[langID]) {
            if (i === 1) {
              allPricesCopy[index].langs[langID][i][isFoil][1] = newPrice;

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][isFoil][
                1 + "wasUpdated"
              ] = true;
            } else {
              allPricesCopy[index].langs[langID][i][isFoil][1] =
                //If we want to make prices more stable integer, implement function here
                priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    authenticationInfos.shop.shopData.PercentPerConditions[
                      i - 1
                    ].percent) /
                    100
                );

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][isFoil][
                1 + "wasUpdated"
              ] = true;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);
        }
      } else {
        const allPricesCopy = [...allPricesBuffer];

        allPricesCopy[index].langs[langID][conditionID][isFoil][
          isSigned
        ] = newPrice;
        allPricesBuffer[index].langs[langID][conditionID][isFoil][
          isSigned + "wasUpdated"
        ] = true;

        setAllPricesBuffer(allPricesCopy);
      }
      setTimer(
        setTimeout(
          () =>
            triggerAPISending(
              event,
              conditionID,
              langID,
              isFoil,
              isSigned,
              index,
              cardID,
              newPrice
            ),
          WAIT_INTERVAL
        )
      );
    } else if (event.target.value === "") {
      //set the price to null in context
      const allPricesCopy = [...allPricesBuffer];
      allPricesCopy[index].langs[langID][conditionID][isFoil][isSigned] = null;

      setAllPricesBuffer(allPricesCopy);
      //Delete in DB
      priceUpdateAPI.deleteOnePrice(
        allPricesBuffer[index].langs[langID][conditionID][isFoil][
          isSigned + "idCardShopPrice"
        ]
      );
      allPricesCopy[index].langs[langID][conditionID][isFoil][
        isSigned + "idCardShopPrice"
      ] = null;
    } else {
      toast.error("Merci de saisir un nombre.");
    }

    const triggerAPISending = (
      event,
      conditionID,
      langID,
      isFoil,
      isSigned,
      index,
      cardID,
      newPrice
    ) => {
      if (
        conditionID === 1 &&
        langID === authenticationInfos.shop.shopData.baseLang.id &&
        isSigned === 0
      ) {
        sendBigBatchToAPI();
      } else if (conditionID === 1) {
        if (isFoil === 0 || isFoil === 1) {
          sendSmallBatchToAPI();
        }
      } else {
        if (
          allPricesBuffer[index].langs[langID][conditionID][isFoil][
            isSigned + "idCardShopPrice"
          ] !== null
        ) {
          const objectToSend = {
            price: newPrice,
            isFoil: isFoil === 1 ? true : false,
            isSigned: isSigned === 1 ? true : false,
            isAltered: false,
            shop: "/shops/" + config.shopID,
            language: "/languages/" + langID,
            cardCondition: "/card_conditions/" + conditionID,
            card: "/cards/" + cardID,
          };

          allPricesBuffer[index].langs[langID][conditionID][isFoil][
            isSigned + "wasUpdated"
          ] = true;

          priceUpdateAPI
            .putOnePrice(
              objectToSend,
              allPricesBuffer[index].langs[langID][conditionID][
                isFoil + "idCardShopPrice"
              ]
            )
            .then((response) => console.log("la", response))
            .catch((error) => console.log(error));
        } else {
          const objectToSend = {
            price: newPrice,
            isFoil: isFoil === 1 ? true : false,
            isSigned: isSigned === 1 ? true : false,
            isAltered: false,
            shop: "/shops/" + config.shopID,
            language: "/languages/" + langID,
            cardCondition: "/card_conditions/" + conditionID,
            card: "/cards/" + cardID,
          };
          priceUpdateAPI
            .postOnePrice(objectToSend)
            .then(
              (response) =>
                (allPricesBuffer[index].langs[langID][conditionID][isFoil][
                  isSigned + "idCardShopPrice"
                ] = response.data.id)
            )
            .catch((error) => console.log(error));
        }
      }
    };
  };

  const classInputUpdated = allPricesBuffer[index].langs[langID][conditionID][
    isFoil
  ][isSigned + "wasUpdated"]
    ? "updated"
    : "not-updated";
  return (
    <p>
      <input
        key={parseInt(cardID + "" + conditionID + "" + langID + "" + isFoil)}
        type="text"
        value={priceDisplayed}
        onChange={(event) => {
          handlechange(
            event,
            conditionID,
            langID,
            isFoil,
            isSigned,
            index,
            cardID,
            timer
          );
        }}
        className={classInputUpdated + " conditionDisplay"}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
