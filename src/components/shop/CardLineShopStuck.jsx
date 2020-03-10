import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";

const CardLineShopStuck = ({ card }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  console.log(conditions);
  return (
    <>
      <tr>
        <td>{card.name}</td>
        <td>{card.set}</td>
        <td>/</td>
        <td>{lang.filter(lang => lang.id === card.lang)[0].shortname}</td>
        <td>
          {
            conditions.filter(condition => condition.id == card.condition)[0]
              .shortname
          }
        </td>
        <td>{card.isFoil == true ? "Yes" : "No"}</td>
        <td>{card.quantity}</td>
        <td>{card.price}</td>
        <td>{card.quantity * card.price}</td>
      </tr>
    </>
  );
};

export default CardLineShopStuck;
