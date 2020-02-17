import React from "react";

const CardLineShopStuck = ({ card }) => {
  return (
    <>
      <tr>
        <td>{card.name}</td>
        <td>{card.set}</td>
        <td>/</td>
        <td>{card.lang}</td>
        <td>{card.condition}</td>
        <td>{card.isFoil}</td>
        <td>{card.quantity}</td>
        <td>{card.price}</td>
        <td>{card.quantity * card.price}</td>
      </tr>
    </>
  );
};

export default CardLineShopStuck;
