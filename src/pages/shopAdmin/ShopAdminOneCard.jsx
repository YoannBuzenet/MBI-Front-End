import React, { useState, useContext } from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";
import axios from "axios";
import ShopSetLangCards from "../../components/shop/ShopSetLangCards";
import priceBufferContext from "../../context/priceBufferContext";
import priceDisplayContext from "../../context/priceDisplayContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";

const ShopAdminOneCard = ({ match }) => {
  const { name } = match.params;

  //STATE - All the possibilities
  const [allPossibleVariations, setAllPossibleVariations] = useState([]);

  //Context - building the precise memoization of all condition/lang possibilities
  const { allPricesDisplay, setAllPricesDisplay } = useContext(
    priceDisplayContext
  );

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const nameURLDecoded = decodeURI(name);

  console.log(conditions);

  //HERE create a function that get the input from API and create the context for step 1
  //Order for the context : Lang / Condition / isFoil / Price
  function buildCompletePriceContext(
    cardList,
    langDefinition,
    conditionDefinition
  ) {
    const completeContext = [...cardList];
    console.log(completeContext);

    for (let i = 0; i < completeContext.length; i++) {
      const allLang = [
        {
          name: completeContext[i].name,
          language_id: { id: 9, name: "English", shortname: "EN" }
        }
      ].concat(completeContext[i].foreignData);

      completeContext[i].langs = {};

      for (let j = 0; j < allLang.length; j++) {
        completeContext[i].langs[allLang[j].language_id.id] = null;
      }

      for (const lang in completeContext[i].langs) {
        completeContext[i].langs[lang] = {};
        for (let k = 0; k < conditionDefinition.length; k++) {
          completeContext[i].langs[lang][conditionDefinition[k].id] = {};
        }
      }

      for (const lang in completeContext[i].langs) {
        for (const condition in completeContext[i].langs[lang]) {
          completeContext[i].langs[lang][condition] = {};
          completeContext[i].langs[lang][condition][0] = null;
          completeContext[i].langs[lang][condition][1] = null;
        }
      }

      //Parser les prix de la carte et les attribuer au contexte
      for (let l = 0; l < completeContext.length; l++) {
        for (let m = 0; m < completeContext[l].cardShopPrices.length; m++) {
          const isFoil = completeContext[l].cardShopPrices[m].isFoil ? 1 : 0;
          const condition = parseInt(
            completeContext[l].cardShopPrices[m].cardCondition.substr(17)
          );
          const language = completeContext[l].cardShopPrices[m].language.id;
          const price = completeContext[l].cardShopPrices[m].price;

          completeContext[l]["langs"][language][condition][isFoil] = price;
        }
      }
      console.log(completeContext);
      setAllPricesBuffer(completeContext);
    }
  }

  useEffect(() => {
    //Updating Buffer if empty
    if (
      allPricesBuffer.length == 0 &&
      lang.length === 11 &&
      conditions.length === 7
    ) {
      //Cancel subscriptions preparation
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      cardsAPI
        .getByName(nameURLDecoded, {
          cancelToken: source.token
        })
        .then(data => {
          console.log(data.data["hydra:member"]);
          return data;
        })
        .then(data =>
          buildCompletePriceContext(data.data["hydra:member"], lang, conditions)
        );

      return () => source.cancel("");
    }
  }, [lang, conditions]);

  //Updating the display context when buffer context is set
  // useEffect(() => {
  //   if (allPricesBuffer.length !== 0) {
  //     console.log("update display context");
  //   }
  // }, [allPricesBuffer]);

  return (
    <>
      <div className="container">
        <h1>{name}</h1>
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
