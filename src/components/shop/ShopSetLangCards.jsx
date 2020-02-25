import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";

const ShopSetLangCards = ({ variation }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  //TODO : pass this in env variable
  const gradingArea = "isEU";

  return (
    <>
      <div className="one-set">
        {variation.name} {variation.edition.name}
      </div>{" "}
    </>
  );
};

export default ShopSetLangCards;
