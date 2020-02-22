import React from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";

const ShopAdminOneCard = ({ match }) => {
  const { name } = match.params;

  const nameURLDecoded = decodeURI(name);
  console.log(nameURLDecoded);

  useEffect(() => {
    cardsAPI
      .getByName(nameURLDecoded)
      .then(data => console.log(data.data["hydra:member"]));
  });

  return (
    <>
      <h1>One Card setting</h1>
    </>
  );
};

export default ShopAdminOneCard;
