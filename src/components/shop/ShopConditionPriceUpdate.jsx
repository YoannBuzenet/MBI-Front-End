import React, { useContext, useEffect, useState } from "react";
import priceBufferContext from "../../context/priceBufferContext";
import priceUpdateAPI from "../../services/priceUpdateAPI";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

//This component updates prices in context, send to API, and treats resp back to update context with new ID.
//Depending if updated lang is baseLang or not, and Mint condition or not, we update several languages or fields of the form, or just one.

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  index,
  cardID
}) => {
  //Current Authentication
  const { authenticationInfos } = useContext(AuthContext);

  // console.log(authenticationInfos.shop.shopData);

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //TODO : pass this in env variable
  const shop = 1;

  console.log(allPricesBuffer);

  const priceDisplayed =
    allPricesBuffer[index].langs[langID][conditionID][isFoil] === null
      ? ""
      : allPricesBuffer[index].langs[langID][conditionID][isFoil];

  const sendSmallBatchToAPI = () => {
    const batch = [];
    const allPricesCopy = [...allPricesBuffer];
    //Preparing Small Batch
    for (const objectToParse in allPricesCopy[index].langs[langID]) {
      // console.log(allPricesCopy[index].langs[langID][objectToParse]);
      if (
        allPricesCopy[index].langs[langID][objectToParse][
          isFoil + "idCardShopPrice"
        ]
      ) {
        const newPriceToSend = {
          id:
            allPricesCopy[index].langs[langID][objectToParse][
              isFoil + "idCardShopPrice"
            ],
          price: allPricesCopy[index].langs[langID][objectToParse][isFoil],
          isFoil: isFoil === 1 ? true : false,
          shop: shop,
          card: cardID,
          language: langID,
          cardCondition: parseInt(objectToParse)
        };
        batch.push(newPriceToSend);
      } else {
        const newPriceToSend = {
          price: allPricesCopy[index].langs[langID][objectToParse][isFoil],
          isFoil: isFoil === 1 ? true : false,
          shop: shop,
          card: cardID,
          language: langID,
          cardCondition: parseInt(objectToParse)
        };
        batch.push(newPriceToSend);
      }
    }
    console.log(batch);
    //sending the batch
    try {
      priceUpdateAPI
        .batchPriceUpdate(batch)
        .then(data => registerBatchResponseIntoContext(data.data));
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue. Merci de réessayer.");
    }
  };

  const registerBatchResponseIntoContext = data => {
    console.log(data);
    const contextCopy = [...allPricesBuffer];
    //Copy context
    //Parse Data
    for (let i = 0; i < data.length; i++) {
      const idCardShopPrice = data[i].id;
      const price = data[i].price;
      const shop = parseInt(data[i].shop.substr(7));
      const idcard = parseInt(data[i].card.substr(7));
      const languageID = parseInt(data[i].language.substr(11));
      const conditionID = parseInt(data[i].cardCondition.substr(17));
      const isFoil = data[i].isFoil === true ? 1 : 0;
      // TODO : check s'il y a oubli de la prise en des modifs dans le contexte
      setAllPricesBuffer(contextCopy);
    }
  };

  const sendBigBatchToAPI = () => {
    const batch = [];
    const allPricesCopy = [...allPricesBuffer];
    //Preparing Batch
    for (const LangToParse in allPricesCopy[index].langs) {
      for (const objectToParse in allPricesCopy[index].langs[LangToParse]) {
        // console.log(allPricesCopy[index].langs[LangToParse][objectToParse]);
        if (
          allPricesCopy[index].langs[LangToParse][objectToParse][
            isFoil + "idCardShopPrice"
          ]
        ) {
          const newPriceToSend = {
            id:
              allPricesCopy[index].langs[LangToParse][objectToParse][
                isFoil + "idCardShopPrice"
              ],
            price:
              allPricesCopy[index].langs[LangToParse][objectToParse][isFoil],
            isFoil: isFoil === 1 ? true : false,
            shop: shop,
            card: cardID,
            language: LangToParse,
            cardCondition: parseInt(objectToParse)
          };
          batch.push(newPriceToSend);
        } else {
          const newPriceToSend = {
            price:
              allPricesCopy[index].langs[LangToParse][objectToParse][isFoil],
            isFoil: isFoil === 1 ? true : false,
            shop: shop,
            card: cardID,
            language: LangToParse,
            cardCondition: parseInt(objectToParse)
          };
          batch.push(newPriceToSend);
        }
      }
    }
    console.log("big batch", batch);
    try {
      priceUpdateAPI
        .batchPriceUpdate(batch)
        .then(data => registerBatchResponseIntoContext(data.data));
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue. Merci de réessayer.");
    }
  };

  //This functions allows to update price on a card.
  // If Mint field is updated in BaseLang, we update all fields of all language in the same set, for non foil.
  // If mint is updated for non baselang, we update all the conditions only in this lang for non foil or foil
  // If another field is updated, we update just the field
  // Each time we update, we must wait for server response to add the new ID to our context, to be able to modify content.
  const handlechange = (event, conditionID, langID, isFoil, index, cardID) => {
    //Checking if user is typing a float number. This condition allows him to type it
    //Without this condition, user can't type a "." to type the complete floating number
    if (event.target.value[event.target.value.length - 1] === ".") {
      const allPricesCopy = [...allPricesBuffer];
      allPricesCopy[index].langs[langID][conditionID][isFoil] =
        event.target.value;
      setAllPricesBuffer(allPricesCopy);
    }

    //If it's a number, real logic triggers here
    else if (!isNaN(parseFloat(event.target.value))) {
      console.log(
        parseFloat(event.target.value),
        conditionID,
        langID,
        isFoil,
        index,
        cardID
      );

      const newPrice = parseFloat(event.target.value);

      if (
        conditionID === 1 &&
        langID === authenticationInfos.shop.shopData.baseLang.id
      ) {
        // console.log(
        //   "Updating everything in this variation index but foil cards"
        // );
        //AIM - update all languages and condition in the current set
        //1. Copy context
        const contextCopy = [...allPricesBuffer];
        //2. Update baselang
        var j = 1;
        for (const conditions in contextCopy[index].langs[
          authenticationInfos.shop.shopData.baseLang.id
        ]) {
          //On first condition the price is the one user did seize. So we just put it as it is.
          if (j === 1) {
            //Updating Price on context
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil] = newPrice;

            //Updating Was Updated property on context to create a CSS class
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil + "wasUpdated"] = true;
          } else {
            //Updating Prices on all non Mint conditions on BaseLang
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil] = priceUpdateAPI.smoothNumbers(
              (newPrice *
                authenticationInfos.shop.shopData.PercentPerConditions[j - 1]
                  .percent) /
                100
            );

            //Updating Was Updated property on context to create a CSS class
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil + "wasUpdated"] = true;
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
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ] = priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    authenticationInfos.shop.shopData.PercentPerLangs[
                      parseInt(language)
                    ].percentPerLang) /
                    100
                );

                //Updating Was Updated property on context to create a CSS class
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil + "wasUpdated"
                ] = true;
              } else {
                //Updating Price on all non BaseLang languages
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil
                ] = priceUpdateAPI.smoothNumbers(
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

                //Updating Was Updated property on context to create a CSS class
                contextCopy[index].langs[parseInt(language)][conditions][
                  isFoil + "wasUpdated"
                ] = true;
              }
              k++;
            }
          }
        }
        console.log(contextCopy);
        //4. Set context
        setAllPricesBuffer(contextCopy);
        //5. Build the batch object
        sendBigBatchToAPI();

        //6. Send the batch
        //7. Receive the batch, update context with ID Card Shop Price
      } else if (conditionID === 1) {
        if (isFoil === 0) {
          console.log(
            "Updating all conditions in given language and isFoilKey"
          );
          //update all conditions in the given languages
          const allPricesCopy = [...allPricesBuffer];
          allPricesCopy[index].langs[langID][1][isFoil] = newPrice;

          //A bit dirty
          //Browing each condition and setting the price following the percent stored in session.
          //As session's PercentPerConditions numbers are IN ARRAY, we are hacky and follow their index with -1. The day this order changes, this loop won't work. Solution : receinving data as object instead of array.
          var i = 1;
          for (const condition in allPricesCopy[index].langs[langID]) {
            if (i === 1) {
              allPricesCopy[index].langs[langID][i][isFoil] = newPrice;

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][
                isFoil + "wasUpdated"
              ] = true;
            } else {
              allPricesCopy[index].langs[langID][i][isFoil] =
                //If we want to make prices more stable integer, implement function here
                priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    authenticationInfos.shop.shopData.PercentPerConditions[
                      i - 1
                    ].percent) /
                    100
                );

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][
                isFoil + "wasUpdated"
              ] = true;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);

          //Preparing the batch to update API

          sendSmallBatchToAPI();
        } else if (isFoil === 1) {
          //update all conditions in the given languages
          const allPricesCopy = [...allPricesBuffer];
          allPricesCopy[index].langs[langID][1][isFoil] = newPrice;
          //A bit dirty
          //Browing each condition and setting the price following the percent stored in session.
          //As session's PercentPerConditions numbers are IN ARRAY, we are hacky and follow their index with -1. The day this order changes, this loop won't work. Solution : receinving data as object instead of array.
          var i = 1;
          for (const condition in allPricesCopy[index].langs[langID]) {
            if (i === 1) {
              allPricesCopy[index].langs[langID][i][isFoil] = newPrice;

              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][
                isFoil + "wasUpdated"
              ] = true;
            } else {
              allPricesCopy[index].langs[langID][i][isFoil] =
                //If we want to make prices more stable integer, implement function here
                priceUpdateAPI.smoothNumbers(
                  (newPrice *
                    authenticationInfos.shop.shopData.PercentPerConditionFoils[
                      i - 1
                    ].percent) /
                    100
                );
              //Updating Was Updated property on context to create a CSS class
              allPricesCopy[index].langs[langID][i][
                isFoil + "wasUpdated"
              ] = true;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);

          sendSmallBatchToAPI();
        }
      } else {
        const allPricesCopy = [...allPricesBuffer];
        //If price exists already : PUT
        if (
          allPricesBuffer[index].langs[langID][conditionID][isFoil] !== null
        ) {
          const objectToSend = {
            price: newPrice,
            isFoil: isFoil === 1 ? true : false,
            shop: "/shops/" + shop,
            language: "/languages/" + langID,
            cardCondition: "/card_conditions/" + conditionID,
            card: "/cards/" + cardID
          };

          allPricesBuffer[index].langs[langID][conditionID][
            isFoil + "wasUpdated"
          ] = true;

          priceUpdateAPI
            .putOnePrice(
              objectToSend,
              allPricesBuffer[index].langs[langID][conditionID][
                isFoil + "idCardShopPrice"
              ]
            )
            .then(response => console.log("la", response))
            .catch(error => console.log(error));
        } else {
          //If price didn't exist : POST

          const objectToSend = {
            price: newPrice,
            isFoil: isFoil === 1 ? true : false,
            shop: "/shops/" + shop,
            language: "/languages/" + langID,
            cardCondition: "/card_conditions/" + conditionID,
            card: "/cards/" + cardID
          };
          console.log(objectToSend);
          priceUpdateAPI
            .postOnePrice(objectToSend)
            .then(
              response =>
                (allPricesCopy[index].langs[langID][conditionID][
                  isFoil + "idCardShopPrice"
                ] = response.data.id)
            )
            .catch(error => console.log(error));
        }

        allPricesCopy[index].langs[langID][conditionID][isFoil] = newPrice;
        allPricesBuffer[index].langs[langID][conditionID][
          isFoil + "wasUpdated"
        ] = true;
        // console.log(allPricesCopy);
        setAllPricesBuffer(allPricesCopy);
        // console.log(allPricesCopy);
      }
    } else if (event.target.value === "") {
      //set the price to null in context
      const allPricesCopy = [...allPricesBuffer];
      allPricesCopy[index].langs[langID][conditionID][isFoil] = null;

      setAllPricesBuffer(allPricesCopy);
      //Delete in DB
      priceUpdateAPI.deleteOnePrice(
        allPricesBuffer[index].langs[langID][conditionID][
          isFoil + "idCardShopPrice"
        ]
      );
      allPricesCopy[index].langs[langID][conditionID][
        isFoil + "idCardShopPrice"
      ] = null;
    } else {
      toast.error("Merci de saisir un nombre.");
    }
  };

  const classInputUpdated = allPricesBuffer[index].langs[langID][conditionID][
    isFoil + "wasUpdated"
  ]
    ? "updated"
    : "not-updated";
  return (
    <p>
      <input
        key={parseInt(cardID + "" + conditionID + "" + langID + "" + isFoil)}
        type="text"
        value={priceDisplayed}
        onChange={event => {
          handlechange(event, conditionID, langID, isFoil, index, cardID);
        }}
        className={classInputUpdated}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
