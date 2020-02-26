import React, { useState } from "react";
import { useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";
import axios from "axios";
import ShopSetLangCards from "../../components/shop/ShopSetLangCards";

const ShopAdminOneCard = ({ match }) => {
  const { name } = match.params;

  //STATE - All the possibilities
  const [allPossibleVariations, setAllPossibleVariations] = useState([]);

  const nameURLDecoded = decodeURI(name);

  useEffect(() => {
    //Cancel subscriptions preparation
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    cardsAPI
      .getByName(nameURLDecoded, {
        cancelToken: source.token
      })
      .then(data => {
        console.log(data.data["hydra:member"]);
        return data;
      })
      .then(data => setAllPossibleVariations(data.data["hydra:member"]));

    return () => source.cancel("");
  }, []);

  return (
    <>
      <div className="container">
        <h1>{name}</h1>
        {allPossibleVariations.map(variation => {
          return <ShopSetLangCards variation={variation} key={variation.id} />;
        })}
      </div>
    </>
  );
};

export default ShopAdminOneCard;