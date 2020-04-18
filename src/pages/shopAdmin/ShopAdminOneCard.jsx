import React, { useState, useContext } from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";
import axios from "axios";
import ShopSetLangCards from "../../components/shop/ShopSetLangCards";
import priceBufferContext from "../../context/priceBufferContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import errorHandlingAPI from "../../services/errorHandlingAPI";

const ShopAdminOneCard = ({ match }) => {
  //STATE - current card name
  const [currentName, setCurrentName] = useState(match.params.name);

  //STATE - current Card Name decoded
  const [currentNameDecoded, setCurrentNameDecoded] = useState(
    decodeURI(currentName)
  );

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  useEffect(() => {
    setCurrentName(match.params.name);
    // console.log(allPricesBuffer);
    // console.log("rerender CARD");
  }, [match.params.name]);

  useEffect(() => {
    setCurrentNameDecoded(currentName);
  }, [currentName]);

  // console.log(allPricesBuffer);

  //HERE create a function that get the input from API and create the context
  //Order for the context : Lang / Condition / isFoil / Price
  function buildCompletePriceContext(
    cardList,
    langDefinition,
    conditionDefinition
  ) {
    const completeContext = [...cardList];
    // console.log(completeContext);

    //Parsing each set
    for (let i = 0; i < completeContext.length; i++) {
      const allLang = [
        {
          name: completeContext[i].name,
          language_id: { id: 9, name: "English", shortname: "EN" },
        },
      ].concat(completeContext[i].foreignData);

      completeContext[i].langs = {};

      //For each existing languages in Magic, create a lang in the context
      for (let j = 0; j < allLang.length; j++) {
        completeContext[i].langs[allLang[j].language_id.id] = null;
      }

      //In each lang in each set, create an empty object
      for (const lang in completeContext[i].langs) {
        completeContext[i].langs[lang] = {};

        //In each lang of each set, create all conditions and put an empty object in it
        for (let k = 0; k < conditionDefinition.length; k++) {
          completeContext[i].langs[lang][conditionDefinition[k].id] = {};
        }
      }
      //In each lang, we add all existing conditions
      for (const lang in completeContext[i].langs) {
        //In each condition, we add an empty object to prepare for Foil object
        for (const condition in completeContext[i].langs[lang]) {
          completeContext[i].langs[lang][condition] = {};
          //For each foil object, we add an object for isSigned
          for (let w = 0; w < 2; w++) {
            completeContext[i].langs[lang][condition][w] = {};
            completeContext[i].langs[lang][condition][w][0] = null;
            completeContext[i].langs[lang][condition][w][
              "0idCardShopPrice"
            ] = null;
            completeContext[i].langs[lang][condition][w]["0wasUpdated"] = null;
            completeContext[i].langs[lang][condition][w][1] = null;
            completeContext[i].langs[lang][condition][w][
              "1idCardShopPrice"
            ] = null;
            completeContext[i].langs[lang][condition][w]["1wasUpdated"] = null;
          }
        }
      }

      //Parse each price and integrate in our big table
      for (let m = 0; m < completeContext[i].cardShopPrices.length; m++) {
        const isFoil = completeContext[i].cardShopPrices[m].isFoil ? 1 : 0;
        const isSigned = completeContext[i].cardShopPrices[m].isSigned ? 1 : 0;
        const condition = parseInt(
          completeContext[i].cardShopPrices[m].cardCondition.substr(17)
        );
        // console.log(completeContext[l]);
        // console.log(completeContext[l].cardShopPrices[m]);
        // console.log(completeContext[l].cardShopPrices[m].language.id);
        const language = completeContext[i].cardShopPrices[m].language.id;
        const price = completeContext[i].cardShopPrices[m].price;
        const idCardShopPrice = completeContext[i].cardShopPrices[m].id;
        // console.log(language);
        // console.log(completeContext[l]);
        // console.log(completeContext[l]["langs"]);
        // console.log(completeContext[l]["langs"][language]);
        // console.log(completeContext[l]["langs"][language][condition]);
        // console.log(completeContext[l]["langs"][language][condition][isFoil]);

        completeContext[i]["langs"][language][condition][isFoil][
          isSigned
        ] = price;
        completeContext[i]["langs"][language][condition][isFoil][
          isSigned + "idCardShopPrice"
        ] = idCardShopPrice;
      }
    }
    console.log(completeContext);
    //Once all synchronous for-loops are done, we set the global table in context.
    setAllPricesBuffer(completeContext);
  }

  useEffect(() => {
    //Updating Buffer if empty OR if cardName changed AND if conditions are fully loaded
    if (
      (conditions.length > 0 && allPricesBuffer.length === 0) ||
      (allPricesBuffer[0] && allPricesBuffer[0].name !== currentName)
    ) {
      //Cancel subscriptions preparation
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      cardsAPI
        .getByName(currentNameDecoded, {
          cancelToken: source.token,
        })
        .then((data) => {
          console.log(data.data["hydra:member"]);
          return data;
        })
        .then((data) =>
          buildCompletePriceContext(data.data["hydra:member"], lang, conditions)
        )
        .catch((error) => errorHandlingAPI.check401Unauthorized(error));

      return () => source.cancel("");
    }
  }, [
    currentNameDecoded,
    conditions,
    allPricesBuffer,
    currentName,
    lang,
    buildCompletePriceContext,
  ]);

  return (
    <>
      <div className="container">
        <h1>{currentNameDecoded}</h1>
        {allPricesBuffer.map((variation, index) => {
          return (
            <ShopSetLangCards
              variation={variation}
              key={variation.id}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default ShopAdminOneCard;
