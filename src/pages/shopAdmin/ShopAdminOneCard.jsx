import React, { useState, useContext } from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";
import axios from "axios";
import ShopSetLangCards from "../../components/shop/ShopSetLangCards";
import priceBufferContext from "../../context/priceBufferContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import errorHandlingAPI from "../../services/errorHandlingAPI";
import TableLoader from "../../components/loaders/TableLoader";
import SetListLoader from "../../components/loaders/SetListLoader";
import { isMobile } from "react-device-detect";
import CardShopPriceAPI from "../../services/CardShopPriceAPI";

const ShopAdminOneCard = ({ match }) => {
  //STATE - current card name
  const [currentName, setCurrentName] = useState(match.params.name);

  //STATE - current Card Name decoded
  const [currentNameDecoded, setCurrentNameDecoded] = useState(
    decodeURI(currentName)
  );

  //STATE - Loading
  const [isLoading, setIsLoading] = useState(false);

  //STATE - Ask API for each set of the card
  const [canAskEachSet, setCanAskEachSet] = useState(false);

  //Context - preparing the DISPLAY context format with data
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);
  // console.log(allPricesBuffer);
  useEffect(() => {
    setCurrentName(match.params.name);
    // console.log("rerender CARD");
  }, [match.params.name]);

  useEffect(() => {
    setCurrentNameDecoded(currentName);
  }, [currentName]);

  useEffect(() => {
    if (canAskEachSet) {
      makeAPIcallsAsync();
      setCanAskEachSet(false);
    }
  }, [allPricesBuffer, setAllPricesBuffer, canAskEachSet, setCanAskEachSet]);

  //Once Context has been built, we need to make all the API calls
  const makeAPIcallsAsync = async () => {
    const promises = allPricesBuffer.map((card) => {
      // console.log("calling");

      return CardShopPriceAPI.getAllCSPFromOneEdition(card.id);
    });

    const res = await Promise.all(promises);

    res.forEach((response, index) => parseCSPinResponse(response.data, index));
    setAllPricesBuffer([...allPricesBuffer]);
    setIsLoading(false);
  };

  const parseCSPinResponse = (response, index) => {
    //Parse each price and integrate in our big table
    for (let m = 0; m < response.length; m++) {
      const isFoil = response[m].isFoil ? 1 : 0;
      const isSigned = response[m].isSigned ? 1 : 0;
      const condition = parseInt(response[m].cardCondition.substr(17));

      const language = parseInt(response[m].language.substr(11));
      const price = response[m].price;
      const idCardShopPrice = response[m].id;

      allPricesBuffer[index]["langs"][language][condition][isFoil][
        isSigned
      ] = price;
      allPricesBuffer[index]["langs"][language][condition][isFoil][
        isSigned + "idCardShopPrice"
      ] = idCardShopPrice;
    }
  };

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
    //We create an object for each set that will contains its info
    for (let i = 0; i < completeContext.length; i++) {
      const allLang = [
        {
          name: completeContext[i].name,
          language_id: { id: 9, name: "English", shortname: "EN" },
        },
      ].concat(completeContext[i].foreignData);

      completeContext[i].langs = {};

      //For each existing languages in Magic, create a lang in the context for this set
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
    }
    // console.log(completeContext);
    //Once all synchronous for-loops are done, we set the global table in context.
    setAllPricesBuffer(completeContext);
  }

  useEffect(() => {
    //Updating Buffer if empty OR if cardName changed AND if conditions are fully loaded
    if (
      (conditions.length > 0 && allPricesBuffer.length === 0) ||
      (allPricesBuffer[0] && allPricesBuffer[0].name !== currentName)
    ) {
      setIsLoading(true);
      //Cancel subscriptions preparation
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      cardsAPI
        .getByName(currentNameDecoded, {
          cancelToken: source.token,
        })
        .then((data) => {
          console.log(data);
          console.log(data.data["hydra:member"]);
          return data;
        })
        .then((data) =>
          buildCompletePriceContext(data.data["hydra:member"], lang, conditions)
        )
        .then(() => setCanAskEachSet(true))
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
        {isLoading && !isMobile && <TableLoader />}
        {isLoading && isMobile && (
          <>
            <SetListLoader />
            <SetListLoader />
          </>
        )}
        {!isLoading &&
          allPricesBuffer.map((variation, index) => {
            if (variation.edition.isonlineonly === 0) {
              return (
                <ShopSetLangCards
                  card={variation}
                  key={variation.id}
                  index={index}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default ShopAdminOneCard;
