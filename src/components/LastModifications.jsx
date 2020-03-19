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
            <CardWithThumbnail card={card} />
          ))}

          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/5/4/5410254f-cf9d-46c2-acea-07298ae65924.jpg"
            handleAddSellingBasket={handleAddSellingBasket}
            card={{
              name: "Apprenti Spinosophe",
              set: "Invasion",
              price: 2,
              condition: "NM",
              lang: "EN",
              isFoil: "Yes",
              uuid: "9215-ddfsdf-9898-dsfdn",
              currency: "euros",
              quantity: 1,
              scryfallid: "d3c99f65-2355-444b-b49a-c6b916f268b1"
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LastModifications;
