import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";
import cardsAPI from "../../services/cardsAPI";
import priceBufferContext from "../../context/priceBufferContext";
import config from "../../services/config";

const ShopSetLangCards = ({ variation, index }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //Context - building the memoization of all condition/lang possibilities
  const { allPricesBuffer, setAllPricesBuffer } = useContext(
    priceBufferContext
  );

  const Fragment = React.Fragment;

  return (
    <>
      <div className="one-set">
        <h2>{allPricesBuffer[index].edition.name}</h2>
        {/* All these operations are made to : integrate English in the lang array, and then putting the BaseLang on top by filtering arrays */}
        {[
          {
            name: variation.name,
            language_id: { id: 9, name: "English", shortname: "EN" },
          },
        ]
          .concat(variation.foreignData)
          .filter(
            (currentLang) => currentLang.language_id.id === config.baseLang
          )
          .concat(
            [
              {
                name: variation.name,
                language_id: { id: 9, name: "English", shortname: "EN" },
              },
            ].filter(
              (currentLang) => currentLang.language_id.id !== config.baseLang
            )
          )
          .concat(
            variation.foreignData.filter(
              (currentLang) => currentLang.language_id.id !== config.baseLang
            )
          )

          .map((oneLang) => {
            return (
              <Fragment key={oneLang.language_id.id}>
                <h3>{oneLang.language_id.name}</h3>
                <ShopOneLangAllConditionsCard
                  oneLang={oneLang}
                  index={index}
                  variation={variation}
                />
              </Fragment>
            );
          })}
      </div>{" "}
    </>
  );
};

export default ShopSetLangCards;
