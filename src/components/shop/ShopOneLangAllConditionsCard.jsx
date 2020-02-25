import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";

const ShopOneLangAllConditionsCard = ({ oneLang, index }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //TODO : pass this in env variable
  const gradingArea = "nameEU";

  return (
    <div>
      {oneLang.language_id.name}
      <div>
        {conditions.map(condition => {
          return <p>{condition["gradingArea"]}h</p>;
        })}
      </div>
    </div>
  );
};

export default ShopOneLangAllConditionsCard;
