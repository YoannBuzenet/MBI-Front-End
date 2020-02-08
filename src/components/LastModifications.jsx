import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import CardWithThumbnail from "./CardWithThumbnail";

const LastModifications = ({ handleAddSellingBasket }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  return (
    <>
      <div className="last-modification">
        <h2>Les dernières modifications</h2>
        <div className="all-cards">
          <CardWithThumbnail
            picture="https://placehold.it/100x175"
            handleAddSellingBasket={handleAddSellingBasket}
            card={{
              name: "Foret de la Yavimaya",
              set: "Invasion",
              price: 2,
              condition: "NM",
              lang: "EN",
              isFoil: "No",
              uuid: "9215-ddfsdf-9898-dsfde",
              currency: "euros",
              quantity: 1,
              scryfallid: "d3c99f65-2355-444b-b49a-c6b916f268b1"
            }}
          />
          <CardWithThumbnail
            picture="https://placehold.it/100x175"
            handleAddSellingBasket={handleAddSellingBasket}
            card={{
              name: "Kavru Languefeu",
              set: "Planeshift",
              price: 2,
              condition: "EXC",
              lang: "EN",
              isFoil: "No",
              uuid: "9215-ddfsdf-9898-dsfd",
              currency: "euros",
              quantity: 1,
              scryfallid: "d3c99f65-2355-444b-b49a-c6b916f268b1"
            }}
          />
          <CardWithThumbnail
            picture="https://placehold.it/100x175"
            handleAddSellingBasket={handleAddSellingBasket}
            card={{
              name: "Cape de tatou",
              set: "Invasion",
              price: 2,
              condition: "PL",
              lang: "EN",
              isFoil: "No",
              uuid: "9215-ddfsdf-9898-dsfdi",
              currency: "euros",
              quantity: 1,
              scryfallid: "d3c99f65-2355-444b-b49a-c6b916f268b1"
            }}
          />
          <CardWithThumbnail
            picture="https://placehold.it/100x175"
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
