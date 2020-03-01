import React, { useState, useContext } from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";
import axios from "axios";
import ShopSetLangCards from "../../components/shop/ShopSetLangCards";
import priceUpdateContext from "../../context/priceUpdateContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";

const ShopAdminOneCard = ({ match }) => {
  const { name } = match.params;

  //STATE - All the possibilities
  const [allPossibleVariations, setAllPossibleVariations] = useState([]);

  //Context - building the memoization of all condition/lang possibilities
  const { allPrices, setAllPrices } = useContext(priceUpdateContext);

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const nameURLDecoded = decodeURI(name);

  console.log(conditions);

  //HERE create a function that get the input from API and create the context for step 1
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
          // console.log(lang);
          completeContext[i].langs[lang][conditionDefinition[k].id] = {};
          // console.log(completeContext[i].langs[lang]);
        }
      }
      console.log(completeContext);
    }
  }

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className="container">
        <h1>{name}</h1>
        {/* {allPossibleVariations.map(variation => {
          return <ShopSetLangCards variation={variation} key={variation.id} />;
        })} */}
      </div>
    </>
  );
};

export default ShopAdminOneCard;
