import React, { useContext, useEffect, useState } from "react";
import SellingBasketContext from "../context/sellingBasket";
import CardWithThumbnail from "./CardWithThumbnail";
import axios from "axios";

const LastModifications = ({ handleAddSellingBasket }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  const [lastModificationList, setLastModificationList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/lastcardsmodified?limit=10&shopid=1")
      .then(data => setLastModificationList(data.data));
    //ADD CANCEL EFFECT
  }, []);

  return (
    <>
      <div className="last-modification">
        <h2>Les dernières modifications</h2>
        <div className="all-cards">
          {lastModificationList.map((card, index) => (
            <CardWithThumbnail card={card} key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LastModifications;
