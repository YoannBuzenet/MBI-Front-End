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
  }, []);

  return (
    <>
      {lastModificationList.map((element, index) => console.log(element))}
      <div className="last-modification">
        <h2>Les dernières modifications</h2>
        <div className="all-cards">
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/d/3/d3c99f65-2355-444b-b49a-c6b916f268b1.jpg"
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
            picture="https://img.scryfall.com/cards/small/front/a/7/a7af8350-9a51-437c-a55e-19f3e07acfa9.jpg"
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
              scryfallid: "a7af8350-9a51-437c-a55e-19f3e07acfa9"
            }}
          />
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/7/d/7d9e0a23-d2a8-40a6-9076-ed6fb539141b.jpg"
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
              scryfallid: "7d9e0a23-d2a8-40a6-9076-ed6fb539141b"
            }}
          />
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/a/e/aee01e9c-0445-4228-a73a-3e5744844ed3.jpg"
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
              scryfallid: "aee01e9c-0445-4228-a73a-3e5744844ed3"
            }}
          />
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/f/b/fb50813c-72df-49e7-bac5-e6e247649241.jpg"
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
              scryfallid: "fb50813c-72df-49e7-bac5-e6e247649241"
            }}
          />
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/6/7/6774c646-76d4-4991-a7f3-b753ef200ce5.jpg"
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
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/0/2/02902fcc-eefc-4e81-aafd-59fa203a71d7.jpg"
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
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/0/3/03e0147e-841c-4593-83ce-001bf03885f2.jpg"
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
          <CardWithThumbnail
            picture="https://img.scryfall.com/cards/small/front/f/f/ff37b863-f8c4-4584-8cc2-ac0e096e583f.jpg"
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
