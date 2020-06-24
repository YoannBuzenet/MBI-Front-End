import React, { useContext } from "react";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import { isMobile } from "react-device-detect";
import priceUpdateAPI from "../../services/priceUpdateAPI";

const CardLineShopStuck = ({ card }) => {
  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  // console.log(card);

  return (
    <>
      <tr>
        <td>{card.name}</td>
        <td>{card.set}</td>
        <td>/</td>
        <td>{lang[card.lang] ? lang[card.lang - 1].shortname : null}</td>
        <td>
          {conditions[card.condition]
            ? conditions[card.condition - 1].shortname
            : null}
        </td>
        <td>{card.isFoil === true ? "Yes" : "No"}</td>
        <td>{card.isSigned === true ? "Yes" : "No"}</td>
        <td>{card.isAltered === true ? "Yes" : "No"}</td>
        <td>{card.quantity}</td>
        <td>{card.price}</td>
        <td>/</td>
        <td>/</td>
        <td>
          {priceUpdateAPI.smoothFloatKeepEntireComplete(
            card.quantity * card.price
          )}
        </td>
      </tr>
    </>
  );
};

export default CardLineShopStuck;
