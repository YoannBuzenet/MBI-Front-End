import React, { useState } from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";

const ShopAdminOneCard = ({ match }) => {
  const { name } = match.params;

  //STATE - All the possibilities
  const [allPossibleVariations, setAllPossibleVariations] = useState([]);

  const nameURLDecoded = decodeURI(name);

  useEffect(() => {
    cardsAPI
      .getByName(nameURLDecoded)
      .then(data => {
        console.log(data.data["hydra:member"]);
        return data;
      })
      .then(data => setAllPossibleVariations(data.data["hydra:member"]));

    //Cancel subscriptions in return
  }, []);

  return (
    <>
      <div className="container">
        <h1>{name}</h1>
        {allPossibleVariations.map(variation => {
          return (
            <div key={variation.id} className="one-set">
              {variation.name} {variation.edition.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopAdminOneCard;
