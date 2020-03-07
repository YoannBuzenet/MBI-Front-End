import React, { useContext, useEffect, useState } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import priceBufferContext from "../../context/priceBufferContext";
import priceUpdateAPI from "../../services/priceUpdateAPI";
import AuthContext from "../../context/authContext";

const ShopConditionPriceUpdate = ({
  conditionID,
  langID,
  isFoil,
  priceValue,
  index,
  cardID
}) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  // console.log(authenticationInfos.shop.shopData);

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  //TODO : pass this in env variable
  const shop = 3;

  // console.log(allPricesBuffer);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  // console.log(allPricesBuffer);

  const priceDisplayed =
    allPricesBuffer[index].langs[langID][conditionID][isFoil] === null
      ? ""
      : allPricesBuffer[index].langs[langID][conditionID][isFoil];

  const sendSmallBatchToAPI = () => {
    const batch = [];
    const allPricesCopy = [...allPricesBuffer];
    //HERE IS THE BATCH BRO (THE SMALL)
    for (const objectToParse in allPricesCopy[index].langs[langID]) {
      console.log(allPricesCopy[index].langs[langID][objectToParse]);
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
    //send the batch HERE
    try {
      priceUpdateAPI
        .batchPriceUpdate(batch)
        .then(data => registerSmallBatchIntoContext(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const registerSmallBatchIntoContext = data => {
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

      console.log(
        idCardShopPrice,
        price,
        shop,
        idcard,
        languageID,
        conditionID,
        isFoil,
        index
      );

      console.log(
        contextCopy[index].langs[languageID][conditionID][
          isFoil + "idCardShopPrice"
        ]
      );

      contextCopy[index].langs[languageID][conditionID][
        isFoil + "idCardShopPrice"
      ] = idCardShopPrice;
    }
    console.log("copie", contextCopy);
    setAllPricesBuffer(contextCopy);
  };

  //This functions allows to update price on a card.
  // If Mint field is updated in BaseLang, we update all fields of all language in the same set, for non foil.
  // If mint is updated for non baselang, we update all the conditions only in this lang for non foil or foil
  // If another field is updated, we update just the field
  // Each time we update, we must wait for server response to add the new ID to our context, to be able to modify content.
  const handlechange = (event, conditionID, langID, isFoil, index, cardID) => {
    //Checking the input is a number
    if (!isNaN(parseInt(event.target.value))) {
      console.log(
        parseInt(event.target.value),
        conditionID,
        langID,
        isFoil,
        index,
        cardID
      );

      const newPrice = parseInt(event.target.value);

      if (
        conditionID === 1 &&
        isFoil === 0 &&
        langID === authenticationInfos.shop.shopData.baseLang.id
      ) {
        console.log(
          "Updating everything in this variation index but foil cards"
        );
        //AIM - update all languages and condition in the current set
        //1. Copy context
        const contextCopy = [...allPricesBuffer];
        //2. Update baselang
        var j = 1;
        for (const conditions in contextCopy[index].langs[
          authenticationInfos.shop.shopData.baseLang.id
        ]) {
          if (j === 1) {
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil] = newPrice;
          } else {
            contextCopy[index].langs[
              authenticationInfos.shop.shopData.baseLang.id
            ][conditions][isFoil] =
              //If we want to make prices more stable integer, implement function here
              (newPrice *
                authenticationInfos.shop.shopData.PercentPerConditions[j - 1]
                  .percent) /
              100;
          }
          j++;
        }

        //3. Loop on everything, skip baselang
        for (const language in contextCopy[index]) {
          if (language.id === authenticationInfos.shop.shopData.baseLang.id) {
            //skip
            console.log("skip");
          } else {
            //update the lang that is not baseLang
            // var k = 1;
            // for (const conditions in contextCopy[index].langs[
            //   authenticationInfos.shop.shopData.baseLang.id
            // ]) {
            //   if (k === 1) {
            //     contextCopy[index].langs[
            //       authenticationInfos.shop.shopData.baseLang.id
            //     ][conditions][isFoil] = newPrice;
            //   } else {
            //     contextCopy[index].langs[
            //       authenticationInfos.shop.shopData.baseLang.id
            //     ][conditions][isFoil] =
            //       //If we want to make prices more stable integer, implement function here
            //       (newPrice *
            //         authenticationInfos.shop.shopData.PercentPerConditions[
            //           k - 1
            //         ].percent) /
            //       100;
            //   }
            //   j++;
            // }
          }
          console.log(language);
        }
        //4. Set context
        //5. Build the batch object
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
            } else {
              allPricesCopy[index].langs[langID][i][isFoil] =
                //If we want to make prices more stable integer, implement function here
                (newPrice *
                  authenticationInfos.shop.shopData.PercentPerConditions[i - 1]
                    .percent) /
                100;
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
            } else {
              allPricesCopy[index].langs[langID][i][isFoil] =
                //If we want to make prices more stable integer, implement function here
                (newPrice *
                  authenticationInfos.shop.shopData.PercentPerConditionFoils[
                    i - 1
                  ].percent) /
                100;
            }
            i++;
          }

          setAllPricesBuffer(allPricesCopy);

          sendSmallBatchToAPI();
        }
      } else {
        const allPricesCopy = [...allPricesBuffer];
        //PUT
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
          //POST

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
      //TODO : toast to tell to put a number
      console.log("type a number please");
    }
  };

  useEffect(() => {
    // console.log(allPricesBuffer);
  });

  return (
    <p>
      <input
        key={parseInt(cardID + "" + conditionID + "" + langID + "" + isFoil)}
        type="text"
        value={priceDisplayed}
        onChange={event => {
          handlechange(event, conditionID, langID, isFoil, index, cardID);
        }}
      />
    </p>
  );
};

export default ShopConditionPriceUpdate;
