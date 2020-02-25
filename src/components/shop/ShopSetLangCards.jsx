import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";

const ShopSetLangCards = ({ variation }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //TODO : pass this in env variable
  const gradingArea = "isEU";

  console.log(lang, conditions);

  return (
    <>
      <div className="one-set">
        {variation.edition.name}
        {variation.foreignData.map((oneLang, index) => {
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
