import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";
import cardsAPI from "../../services/cardsAPI";
import priceUpdateContext from "../../context/priceBufferContext";

const ShopSetLangCards = ({ variation }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //Context - building the memoization of all condition/lang possibilities
  const { allPrices, setAllPrices } = useContext(priceUpdateContext);

  //TODO : pass this in env variable
  const gradingArea = "isEU";

  //TODO : pass this variable in session + localstorage (its given in resp to POST login)
  const baseLang = 3;

  console.log(lang, conditions);

  return (
    <>
      <div className="one-set">
        <h2>{variation.edition.name}</h2>
        {/* All these operations are made to : integrate English in the lang array, and then putting the BaseLang on top by filtering arrays */}
        {[
          {
            name: cardsAPI.name,
            language_id: { id: 9, name: "English", shortname: "EN" }
          }
        ]
          .concat(variation.foreignData)
          .filter(currentLang => currentLang.language_id.id === baseLang)
          .concat(
            [
              {
                name: cardsAPI.name,
                language_id: { id: 9, name: "English", shortname: "EN" }
              }
            ].filter(currentLang => currentLang.language_id.id !== baseLang)
          )
          .concat(
            variation.foreignData.filter(
              currentLang => currentLang.language_id.id !== baseLang
            )
          )

          .map((oneLang, index) => {
            return (
              <>
                <h3>{oneLang.language_id.name}</h3>
                <ShopOneLangAllConditionsCard
                  oneLang={oneLang}
                  index={index}
                  key={oneLang.language_id.id}
                  isFoil={false}
                />
                <p>FOIL</p>
                <ShopOneLangAllConditionsCard
                  oneLang={oneLang}
                  index={index}
                  key={oneLang.language_id.id * 43}
                  isFoil={true}
                />
              </>
            );
          })}
      </div>{" "}
    </>
  );
};

export default ShopSetLangCards;
