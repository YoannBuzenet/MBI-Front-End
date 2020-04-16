import React from "react";
import { useEffect, useState } from "react";
import shopAPI from "../services/shopAPI";
import { FormattedMessage } from "react-intl";

const BuyingClauses = () => {
  const [buyingClauses, setBuyingClauses] = useState("");

  useEffect(() => {
    shopAPI
      .getBuyingClauses()
      .then((data) => setBuyingClauses(data.legalClausesBuying));
  }, []);

  return (
    <>
      <h2>
        <FormattedMessage
          id="app.BuyingClauses.title"
          defaultMessage={`Buying clauses`}
        />
      </h2>
      <p>{buyingClauses}</p>
    </>
  );
};

export default BuyingClauses;
