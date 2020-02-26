import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";
import cardsAPI from "../../services/cardsAPI";

const ShopSetLangCards = ({ variation }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //TODO : pass this in env variable
  const gradingArea = "isEU";

  console.log(lang, conditions);

  return (
    <>
      <div className="one-set">
        <h2>{variation.edition.name}</h2>
        {variation.foreignData
          .concat([
            {
              name: cardsAPI.name,
              language_id: { id: 9, name: "English", shortname: "EN" }
            }
          ])
          .map((oneLang, index) => {
            return (
              <ShopOneLangAllConditionsCard
                oneLang={oneLang}
                index={index}
                key={oneLang.language_id.id}
              />
            );
          })}
      </div>{" "}
    </>
  );
};

export default ShopSetLangCards;
