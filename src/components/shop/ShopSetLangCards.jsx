import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";
import cardsAPI from "../../services/cardsAPI";

const ShopSetLangCards = ({ variation }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //TODO : pass this in env variable
  const gradingArea = "isEU";

  //TODO : pass this variable in session + localstorage (its given in resp to POST login)
  const baseLang = 3;

  console.log(lang, conditions);

  return (
    <>
      <div className="one-set">
        <h2>{variation.edition.name}</h2>
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
                <ShopOneLangAllConditionsCard
                  oneLang={oneLang}
                  index={index}
                  key={oneLang.language_id.id}
                />
                <p>Ici les foils</p>
              </>
            );
          })}
      </div>{" "}
    </>
  );
};

export default ShopSetLangCards;
