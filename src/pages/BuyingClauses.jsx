import React from "react";
import { useEffect, useState } from "react";
import shopAPI from "../services/shopAPI";

const BuyingClauses = () => {
  const [buyingClauses, setBuyingClauses] = useState("");

  useEffect(() => {
    shopAPI
      .getBuyingClauses()
      .then((data) => setBuyingClauses(data.legalClausesBuying));
  }, []);

  return (
    <>
      <h2>Buying Clauses</h2>
      <p>{buyingClauses}</p>
    </>
  );
};

export default BuyingClauses;
